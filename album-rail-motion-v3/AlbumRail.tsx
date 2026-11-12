"use client";

import {
  forwardRef, useCallback, useEffect, useImperativeHandle, useMemo,
  useRef, useState, type CSSProperties, type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from "react";
import {
  animate, motion, useMotionValue, useMotionValueEvent, useTransform,
  type MotionValue, type AnimationPlaybackControls,
} from "motion/react";
import "./AlbumRail.css";

export type Album = { src: string; alt: string; title?: string; subtitle?: string; href?: string; accent?: string };
export type AlbumRailHandle = { next(): void; previous(): void; goTo(index: number): void; play(): void; pause(): void; togglePlay(): void };
export type AlbumRailProps = {
  items: Album[]; startIndex?: number; visible?: number; size?: number; aspect?: number;
  spread?: number; stack?: number; fan?: number; turn?: number; depth?: number;
  radius?: number; dim?: number; shadow?: number; vinyl?: boolean;
  vinylColor?: string; accentColor?: string; autoAccent?: boolean; rpm?: number;
  autoplay?: boolean; interval?: number; paused?: boolean; pauseOnHover?: boolean;
  loop?: boolean; draggable?: boolean; wheel?: boolean; captions?: boolean;
  controls?: boolean; scrubber?: boolean; backgroundColor?: string; color?: string;
  ariaLabel?: string; className?: string; style?: CSSProperties;
  /** Spring tension; lower values feel more cinematic. */ stiffness?: number;
  /** Spring damping; higher values reduce overshoot. */ damping?: number;
  /** Higher mass makes navigation feel heavier. */ mass?: number;
  /** How strongly a release fling carries momentum. */ momentum?: number;
  onIndexChange?: (index: number) => void;
  onSelect?: (item: Album, index: number) => void;
  onPlayChange?: (index: number, playing: boolean) => void;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const mod = (n: number, c: number) => ((n % c) + c) % c;
const nearestCycle = (index: number, position: number, count: number) =>
  index + Math.round((position - index) / count) * count;

function sampleColor(src: string, callback: (value: string) => void) {
  const image = new Image();
  image.crossOrigin = "anonymous";
  image.onload = () => {
    try {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 24;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      if (!ctx) return;
      ctx.drawImage(image, 0, 0, 24, 24);
      const data = ctx.getImageData(0, 0, 24, 24).data;
      let r = 0, g = 0, b = 0, total = 0;
      for (let i = 0; i < data.length; i += 16) {
        const high = Math.max(data[i], data[i+1], data[i+2]);
        const low = Math.min(data[i], data[i+1], data[i+2]);
        const weight = data[i+3] / 255 * (0.15 + (high-low)/Math.max(1, high));
        r += data[i]*weight; g += data[i+1]*weight; b += data[i+2]*weight; total += weight;
      }
      if (total) callback(`rgb(${Math.round(r/total)}, ${Math.round(g/total)}, ${Math.round(b/total)})`);
    } catch { /* CORS-protected image; keep fallback accent */ }
  };
  image.src = src;
  return () => { image.onload = null; image.src = ""; };
}

type CardProps = {
  item: Album; index: number; virtual: number; position: MotionValue<number>;
  size: number; spread: number; stack: number; fan: number; turn: number;
  depth: number; dim: number; visible: number; vinyl: boolean;
  focused: boolean; playing: boolean; reduced: boolean; broken: boolean;
  onImageError(src: string): void; onClick(index: number): void;
};

function AlbumCard({
  item, index, virtual, position, size, spread, stack, fan, turn, depth,
  dim, visible, vinyl, focused, playing, reduced, broken, onImageError, onClick,
}: CardProps) {
  // The rail's floating-point position drives ALL transforms on the same animation frame.
  // No per-card CSS transitions or independent animations to drift out of sync.
  const offset = useTransform(() => virtual - position.get());
  const x = useTransform(() => {
    const d = offset.get();
    const a = Math.abs(d);
    const stride = size * spread;
    const displacement = a < 1 ? a : 1 + (a - 1) * stack;
    return Math.sign(d) * displacement * stride;
  });
  const y = useTransform(() => Math.min(4, Math.abs(offset.get())) * 5);
  const rotateY = useTransform(() => -Math.sign(offset.get()) * Math.min(1, Math.abs(offset.get())) * turn);
  const rotateZ = useTransform(() => -clamp(offset.get(), -4, 4) * fan);
  const scale = useTransform(() => Math.max(0.56, 1 - Math.abs(offset.get()) * depth * 0.21));
  const opacity = useTransform(() => {
    const d = Math.abs(offset.get());
    return clamp(visible + 0.55 - d, 0, 1);
  });
  const zIndex = useTransform(() => Math.round(1000 - Math.abs(offset.get()) * 100));
  const brightness = useTransform(() => `brightness(${clamp(1 - Math.abs(offset.get()) * dim, 0.34, 1)})`);

  return (
    <motion.div
      className={`album-rail__album ${focused ? "is-active" : ""} ${focused && playing ? "is-playing" : ""}`}
      style={{ x, y, rotateY, rotateZ, scale, opacity, zIndex, filter: brightness }}
      data-index={index}
    >
      {vinyl && (
        <motion.div
          className="album-rail__record"
          initial={false}
          animate={{ x: focused ? (playing ? "64%" : "25%") : "0%" }}
          transition={reduced ? { duration: 0 } : { type: "spring", stiffness: 185, damping: 26, mass: 0.9 }}
          aria-hidden="true"
        >
          <div className="album-rail__record-surface">
            {!broken && <img className="album-rail__record-label" src={item.src} alt="" draggable={false} />}
            <span className="album-rail__record-hole" />
          </div>
        </motion.div>
      )}
      <button
        className="album-rail__sleeve" type="button"
        aria-label={`${item.title ?? item.alt}${focused ? ", selected" : ", select album"}`}
        aria-current={focused ? "true" : undefined}
        tabIndex={Math.abs(virtual - position.get()) <= visible + 0.5 ? 0 : -1}
        onClick={() => onClick(index)}
      >
        {broken ? <span className="album-rail__image-fallback">{item.title ?? item.alt}</span> :
          <img src={item.src} alt={item.alt} draggable={false}
            loading={Math.abs(virtual - position.get()) <= 1.5 ? "eager" : "lazy"}
            onError={() => onImageError(item.src)} />}
        <span className="album-rail__sleeve-shine" />
      </button>
    </motion.div>
  );
}

const AlbumRail = forwardRef<AlbumRailHandle, AlbumRailProps>(function AlbumRail({
  items, startIndex = 0, visible = 3, size = 310, aspect = 1,
  spread = 0.58, stack = 0.72, fan = 4, turn = 24, depth = 0.52,
  radius = 10, dim = 0.14, shadow = 1, vinyl = true,
  vinylColor = "#141217", accentColor = "#5227ff", autoAccent = false,
  rpm = 33, autoplay = false, interval = 4, paused = false,
  pauseOnHover = true, loop = true, draggable = true, wheel = true,
  captions = true, controls = true, scrubber = true,
  backgroundColor = "transparent", color, ariaLabel = "Album gallery",
  className = "", style, stiffness = 175, damping = 27, mass = 1,
  momentum = 0.2, onIndexChange, onSelect, onPlayChange,
}, ref) {
  const count = items.length;
  const initial = clamp(Math.round(startIndex), 0, Math.max(0, count - 1));
  const position = useMotionValue(initial);
  const animation = useRef<AnimationPlaybackControls | null>(null);
  const intendedTarget = useRef(initial);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(900);
  const [activeVirtual, setActiveVirtual] = useState(initial);
  const activeVirtualRef = useRef(initial);
  const [dragging, setDragging] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const [reduced, setReduced] = useState(false);
  const [sampledAccent, setSampledAccent] = useState<string | null>(null);
  const [broken, setBroken] = useState<Record<string, boolean>>({});
  const drag = useRef<{ startX: number; startPosition: number; lastX: number; lastT: number; vx: number; moved: boolean } | null>(null);
  const scrubbingRef = useRef(false);
  const suppressClick = useRef(false);
  const ignoreWheelUntil = useRef(0);
  const latestCallbacks = useRef({ onIndexChange, onPlayChange });
  latestCallbacks.current = { onIndexChange, onPlayChange };

  const active = count ? mod(activeVirtual, count) : 0;
  const selected = items[active];
  const coverSize = Math.min(Math.max(120, size), Math.max(165, width * 0.57));
  const stride = Math.max(45, coverSize * Math.max(0.15, spread));

  const setPlay = useCallback((value: boolean) => {
    if (!vinyl || !count || playingRef.current === value) return;
    playingRef.current = value;
    setPlaying(value);
    latestCallbacks.current.onPlayChange?.(mod(Math.round(position.get()), count), value);
  }, [vinyl, count, position]);
  const togglePlay = useCallback(() => setPlay(!playingRef.current), [setPlay]);

  const goToPosition = useCallback((target: number, velocity = 0) => {
    if (!count) return;
    animation.current?.stop();
    const bounded = loop ? target : clamp(target, 0, count - 1);
    intendedTarget.current = bounded;
    if (reduced) { position.set(bounded); return; }
    animation.current = animate(position, bounded, {
      type: "spring", stiffness, damping, mass,
      velocity, restDelta: 0.001, restSpeed: 0.004,
    });
  }, [count, loop, reduced, position, stiffness, damping, mass]);

  const goTo = useCallback((index: number) => {
    if (!count) return;
    const selectedIndex = loop ? mod(Math.round(index), count) : clamp(Math.round(index), 0, count - 1);
    const target = loop ? nearestCycle(selectedIndex, position.get(), count) : selectedIndex;
    goToPosition(target);
  }, [count, loop, position, goToPosition]);

  const step = useCallback((direction: number) => {
    if (!count) return;
    // Use the current animation's intended stop, not the half-way rounded frame.
    const base = animation.current && animation.current.state === "running"
      ? intendedTarget.current : Math.round(position.get());
    goToPosition(base + direction);
  }, [count, position, goToPosition]);

  useImperativeHandle(ref, () => ({
    next: () => step(1), previous: () => step(-1), goTo,
    play: () => setPlay(true), pause: () => setPlay(false), togglePlay,
  }), [step, goTo, setPlay, togglePlay]);

  useMotionValueEvent(position, "change", (value) => {
    const rounded = loop ? Math.round(value) : clamp(Math.round(value), 0, Math.max(0, count - 1));
    if (rounded === activeVirtualRef.current) return;
    activeVirtualRef.current = rounded;
    setActiveVirtual(rounded);
    if (count) latestCallbacks.current.onIndexChange?.(mod(rounded, count));
    if (playingRef.current) setPlay(false);
  });

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduced(query.matches);
    onChange(); query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);
  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new ResizeObserver(entries => setWidth(entries[0].contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    animation.current?.stop();
    const bounded = count ? (loop ? mod(Math.round(position.get()), count) : clamp(Math.round(position.get()), 0, count - 1)) : 0;
    position.set(bounded);
    intendedTarget.current = bounded;
    activeVirtualRef.current = bounded;
    setActiveVirtual(bounded);
  }, [count, loop, position]);
  useEffect(() => {
    if (!autoAccent || !selected?.src || selected.accent) { setSampledAccent(null); return; }
    setSampledAccent(null);
    return sampleColor(selected.src, setSampledAccent);
  }, [autoAccent, selected?.src, selected?.accent]);
  useEffect(() => {
    if (!autoplay || paused || count < 2 || reduced || dragging || scrubbing || playing || (pauseOnHover && hovered)) return;
    const timer = window.setInterval(() => step(1), Math.max(.8, interval) * 1000);
    return () => window.clearInterval(timer);
  }, [autoplay, paused, count, reduced, dragging, scrubbing, playing, pauseOnHover, hovered, interval, step]);
  useEffect(() => () => animation.current?.stop(), []);

  // Use a non-passive wheel listener, only consuming wheel events when navigating.
  useEffect(() => {
    const node = stageRef.current;
    if (!node || !wheel || count < 2) return;
    const onWheel = (event: WheelEvent) => {
      if (drag.current || scrubbingRef.current) return;
      const delta = Math.abs(event.deltaX) > Math.abs(event.deltaY) ? event.deltaX : event.deltaY;
      if (Math.abs(delta) < 3) return;
      const dir = Math.sign(delta);
      if (!loop && ((activeVirtualRef.current <= 0 && dir < 0) || (activeVirtualRef.current >= count-1 && dir > 0))) return;
      event.preventDefault();
      if (performance.now() < ignoreWheelUntil.current) return;
      ignoreWheelUntil.current = performance.now() + 460;
      step(dir);
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => node.removeEventListener("wheel", onWheel);
  }, [wheel, count, loop, step]);

  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || count < 2 || (event.pointerType === "mouse" && event.button !== 0)) return;
    animation.current?.stop();
    intendedTarget.current = position.get();
    drag.current = { startX: event.clientX, startPosition: position.get(), lastX: event.clientX, lastT: event.timeStamp, vx: 0, moved: false };
    suppressClick.current = false;
    setDragging(true);
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    const current = drag.current;
    if (!current) return;
    const diff = event.clientX - current.startX;
    if (Math.abs(diff) > 5) current.moved = true;
    if (!current.moved) return;
    const dt = Math.max(1, event.timeStamp - current.lastT);
    current.vx = current.vx * 0.5 + (event.clientX - current.lastX) / dt * 0.5;
    current.lastX = event.clientX; current.lastT = event.timeStamp;
    const next = current.startPosition - diff / stride;
    const withResistance = loop ? next : next < 0 ? next * .18 : next > count - 1 ? (count-1) + (next-(count-1))*.18 : next;
    intendedTarget.current = withResistance;
    position.set(withResistance);
  };
  const endDrag = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const current = drag.current;
    if (!current) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
    if (current.moved) suppressClick.current = true;
    const recent = Math.max(0, event.timeStamp - current.lastT);
    const releaseVx = recent < 100 ? current.vx : 0;
    const velocityInAlbumsPerSecond = -(releaseVx * 1000) / stride;
    const predicted = cancelled ? position.get() : position.get() + velocityInAlbumsPerSecond * Math.max(0, momentum);
    const target = Math.round(predicted);
    goToPosition(target, cancelled ? 0 : velocityInAlbumsPerSecond);
  };

  const updateScrubber = (clientX: number) => {
    const el = scrubRef.current;
    if (!el || !count) return;
    const bounds = el.getBoundingClientRect();
    const t = clamp((clientX - bounds.left) / Math.max(1, bounds.width), 0, 1);
    const target = t * (count - 1);
    // Scrubbing tracks the pointer directly; spring only occurs on release.
    intendedTarget.current = target;
    position.set(target);
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, [role='slider']") && event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") { event.preventDefault(); step(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); step(-1); }
    if (event.key === "Home") { event.preventDefault(); goTo(0); }
    if (event.key === "End") { event.preventDefault(); goTo(count - 1); }
    if (event.key === "Enter") {
      event.preventDefault();
      onSelect?.(items[active], active);
      if (vinyl) togglePlay(); else if (items[active]?.href) window.location.assign(items[active].href!);
    }
    if (event.key === " " && vinyl) { event.preventDefault(); togglePlay(); }
  };

  const views = useMemo(() => {
    if (!count) return [];
    const radius = Math.min(count > 1 && loop ? count * 2 : count, Math.ceil(visible) + 2);
    // In looping mode, each virtual position gets its own card instance.
    // This avoids teleporting cards when the selection crosses the first/last index.
    const lower = loop ? activeVirtual - radius : Math.max(0, activeVirtual - radius);
    const upper = loop ? activeVirtual + radius : Math.min(count - 1, activeVirtual + radius);
    return Array.from({ length: upper - lower + 1 }, (_, i) => {
      const virtual = lower + i;
      return { virtual, index: mod(virtual, count), item: items[mod(virtual, count)] };
    });
  }, [items, count, loop, activeVirtual, visible]);

  const scrubProgress = useTransform(() => {
    if (count <= 1) return "50%";
    const normalized = loop ? mod(position.get(), count) : clamp(position.get(), 0, count - 1);
    return `${normalized / (count - 1) * 100}%`;
  });
  const rootStyle = {
    ...style,
    background: backgroundColor,
    ...(color ? { color } : {}),
    "--rail-size": `${coverSize}px`, "--rail-aspect": aspect,
    "--rail-radius": `${Math.max(0, radius)}px`, "--rail-shadow": shadow,
    "--rail-accent": selected?.accent || sampledAccent || accentColor,
    "--rail-vinyl": vinylColor, "--rail-spin-time": `${60 / Math.max(1, rpm)}s`,
  } as CSSProperties;

  if (!count) return null;
  return (
    <section className={`album-rail ${dragging ? "is-dragging" : ""} ${reduced ? "is-reduced-motion" : ""} ${className}`}
      style={rootStyle} role="region" aria-roledescription="carousel" aria-label={ariaLabel}
      tabIndex={0} onKeyDown={handleKeyDown}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div ref={stageRef} className="album-rail__stage"
        onPointerDown={beginDrag} onPointerMove={moveDrag}
        onPointerUp={e => endDrag(e)} onPointerCancel={e => endDrag(e, true)}
        onClickCapture={e => { if (suppressClick.current) { e.preventDefault(); e.stopPropagation(); suppressClick.current = false; } }}>
        {views.map(view => (
          <AlbumCard key={view.virtual} {...view} position={position} size={coverSize}
            spread={spread} stack={stack} fan={fan} turn={turn} depth={depth}
            dim={dim} visible={visible} vinyl={vinyl}
            focused={view.virtual === activeVirtual} playing={playing} reduced={reduced}
            broken={Boolean(broken[view.item.src])}
            onImageError={src => setBroken(v => ({ ...v, [src]: true }))}
            onClick={index => {
              if (index !== active) { goTo(index); return; }
              onSelect?.(items[index], index);
              if (vinyl) togglePlay(); else if (items[index].href) window.location.assign(items[index].href!);
            }} />
        ))}
      </div>
      {captions && (
        <div className="album-rail__caption-area" aria-live="polite" aria-atomic="true">
          <motion.div key={`caption-${activeVirtual}`} className="album-rail__caption"
            initial={reduced ? false : { opacity: 0, y: 17, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: reduced ? 0 : .43, ease: [.16, 1, .3, 1] }}>
            <h2>{selected.title ?? selected.alt}</h2>
            {selected.subtitle && <p>{selected.subtitle}</p>}
          </motion.div>
        </div>
      )}
      {controls && <div className="album-rail__controls">
        <button type="button" className="album-rail__arrow" aria-label="Previous album" onClick={() => step(-1)} disabled={!loop && active === 0}>←</button>
        {scrubber ? <div ref={scrubRef} className={`album-rail__scrubber ${scrubbing ? "is-scrubbing" : ""}`}
          role="slider" aria-label="Choose album" aria-valuemin={1} aria-valuemax={count}
          aria-valuenow={active+1} aria-valuetext={selected.title ?? selected.alt} tabIndex={0}
          onPointerDown={event => {
            if (event.pointerType === "mouse" && event.button !== 0) return;
            animation.current?.stop(); setScrubbing(true); scrubbingRef.current = true;
            event.currentTarget.setPointerCapture(event.pointerId); updateScrubber(event.clientX);
          }}
          onPointerMove={event => { if (event.currentTarget.hasPointerCapture(event.pointerId)) updateScrubber(event.clientX); }}
          onPointerUp={event => {
            if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
            scrubbingRef.current = false; setScrubbing(false); goToPosition(Math.round(position.get()));
          }}
          onPointerCancel={() => { scrubbingRef.current = false; setScrubbing(false); goToPosition(Math.round(position.get())); }}
          onKeyDown={event => {
            if (["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) { event.preventDefault(); event.stopPropagation(); }
            if (event.key === "ArrowLeft") step(-1);
            if (event.key === "ArrowRight") step(1);
            if (event.key === "Home") goTo(0);
            if (event.key === "End") goTo(count - 1);
          }}>
          <div className="album-rail__scrubber-line" />
          {items.map((item, index) => <span key={index} className="album-rail__scrubber-mark" style={{ left: `${count === 1 ? 50 : index/(count-1)*100}%` }} />)}
          <motion.span className="album-rail__scrubber-thumb" style={{ left: scrubProgress }} />
        </div> : <div className="album-rail__ticks" aria-label="Choose album">
          {items.map((item, i) => <button type="button" key={i} className={`album-rail__tick ${i===active ? "is-active" : ""}`}
            aria-label={`Go to ${item.title ?? `album ${i+1}`}`} aria-current={i===active ? "true" : undefined} onClick={() => goTo(i)} />)}
        </div>}
        {vinyl && <button type="button" className="album-rail__play" onClick={togglePlay}
          aria-label={playing ? "Stop vinyl rotation" : "Rotate vinyl"} aria-pressed={playing}>{playing ? "Ⅱ" : "▶"}</button>}
        <button type="button" className="album-rail__arrow" aria-label="Next album" onClick={() => step(1)} disabled={!loop && active === count-1}>→</button>
      </div>}
      <span className="album-rail__sr-only" aria-live="polite">Album {active+1} of {count}: {selected.title ?? selected.alt}</span>
    </section>
  );
});
export default AlbumRail;
