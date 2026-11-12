'use client';

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
} from 'react';
import Link from 'next/link';
import {
  animate,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
  type MotionValue,
  type AnimationPlaybackControls,
} from 'motion/react';
import './AlbumRail.css';

export type Album = {
  src: string;
  alt: string;
  title?: string;
  subtitle?: string;
  href?: string;
  accent?: string;
  tags?: string[];
  number?: string;
};

export type AlbumRailHandle = {
  next(): void;
  previous(): void;
  goTo(index: number): void;
};

export type AlbumRailProps = {
  items: Album[];
  startIndex?: number;
  visible?: number;
  size?: number;
  aspect?: number;
  accentColor?: string;
  loop?: boolean;
  draggable?: boolean;
  captions?: boolean;
  controls?: boolean;
  scrubber?: boolean;
  backgroundColor?: string;
  color?: string;
  ariaLabel?: string;
  className?: string;
  style?: CSSProperties;
  stiffness?: number;
  damping?: number;
  mass?: number;
  momentum?: number;
  /** When supplied, external continuous MotionValue drives the 3D rail */
  externalPosition?: MotionValue<number>;
  onIndexChange?: (index: number) => void;
  onSelect?: (item: Album, index: number) => void;
  onGoTo?: (index: number) => void;
};

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
const mod = (n: number, c: number) => ((n % c) + c) % c;

type CardProps = {
  item: Album;
  index: number;
  virtual: number;
  position: MotionValue<number>;
  size: number;
  visible: number;
  focused: boolean;
  broken: boolean;
  onImageError(src: string): void;
  onClick(index: number): void;
};

function AlbumCard({
  item,
  index,
  virtual,
  position,
  size,
  visible,
  focused,
  broken,
  onImageError,
  onClick,
}: CardProps) {
  const offset = useTransform(() => virtual - position.get());

  // 1. X DISPLACEMENT: Active card is exactly at x = 0 with generous clear space
  const x = useTransform(() => {
    const d = offset.get();
    const absD = Math.abs(d);
    if (absD < 0.001) return 0;

    // Center zone separation: active card has full breathing room
    const centerGap = size * 0.95;
    const stackStride = size * 0.40;

    const displacement =
      absD <= 1 ? absD * centerGap : centerGap + (absD - 1) * stackStride;

    return Math.sign(d) * displacement;
  });

  // 2. Z DEPTH (translateZ): Active card pops forward (+35px), side cards push back deep (-140px to -240px)
  const z = useTransform(() => {
    const absD = Math.abs(offset.get());
    if (absD <= 1) {
      return 35 - absD * 175; // drops from +35 down to -140
    }
    return -140 - (absD - 1) * 65; // continues receding into distance
  });

  // 3. 3D ROTATION Y: Center is flat (0deg), right cards angle left (-46deg), left cards angle right (+46deg)
  const rotateY = useTransform(() => {
    const d = offset.get();
    const maxAngle = 46;
    const clampedD = clamp(d, -1, 1);
    return -clampedD * maxAngle;
  });

  // 4. SCALE: Active card is 1.08, side cards gracefully scale down
  const scale = useTransform(() => {
    const absD = Math.abs(offset.get());
    if (absD <= 1) {
      return 1.08 - absD * 0.24; // 1.08 down to 0.84
    }
    return Math.max(0.68, 0.84 - (absD - 1) * 0.08);
  });

  // 5. LIGHTING / BRIGHTNESS: Center card is 100% bright, side cards shade down for dramatic 3D realism
  const brightness = useTransform(() => {
    const absD = Math.abs(offset.get());
    if (absD <= 1) {
      return `brightness(${1 - absD * 0.45})`; // 1 down to 0.55
    }
    const b = Math.max(0.28, 0.55 - (absD - 1) * 0.12);
    return `brightness(${b})`;
  });

  // 6. OPACITY: Clean fade-out for distant cards
  const opacity = useTransform(() => {
    const absD = Math.abs(offset.get());
    return clamp(visible + 0.6 - absD, 0, 1);
  });

  // 7. Z-INDEX: Center card always stacks cleanly on top
  const zIndex = useTransform(() => {
    const absD = Math.abs(offset.get());
    return Math.round(100 - absD * 10);
  });

  return (
    <motion.div
      className={`album-rail__album ${focused ? 'is-active' : ''}`}
      style={{
        x,
        z,
        rotateY,
        scale,
        opacity,
        zIndex,
        filter: brightness,
      }}
      data-index={index}
    >
      <button
        className="album-rail__sleeve"
        type="button"
        aria-label={`${item.title ?? item.alt}${focused ? ', selected' : ', select industry'}`}
        aria-current={focused ? 'true' : undefined}
        tabIndex={Math.abs(virtual - position.get()) <= visible + 0.5 ? 0 : -1}
        onClick={() => onClick(index)}
      >
        {broken ? (
          <span className="album-rail__image-fallback">{item.title ?? item.alt}</span>
        ) : (
          <img
            src={item.src}
            alt={item.alt}
            draggable={false}
            loading={Math.abs(virtual - position.get()) <= 1.5 ? 'eager' : 'lazy'}
            onError={() => onImageError(item.src)}
          />
        )}
        {item.number && <span className="album-rail__sleeve-badge">{item.number}</span>}
        <span className="album-rail__sleeve-shine" />
      </button>
    </motion.div>
  );
}

const AlbumRail = forwardRef<AlbumRailHandle, AlbumRailProps>(function AlbumRail(
  {
    items,
    startIndex = 0,
    visible = 2.5,
    size = 280,
    aspect = 1,
    accentColor = '#ff4d00',
    loop = true,
    draggable = true,
    captions = true,
    controls = false,
    scrubber = false,
    backgroundColor = 'transparent',
    color,
    ariaLabel = 'Industry sector gallery',
    className = '',
    style,
    stiffness = 190,
    damping = 28,
    mass = 0.8,
    momentum = 0.2,
    externalPosition,
    onIndexChange,
    onSelect,
    onGoTo,
  },
  ref
) {
  const count = items.length;
  const initial = clamp(Math.round(startIndex), 0, Math.max(0, count - 1));

  // Internal motion value fallback if no externalPosition is supplied
  const internalPosition = useMotionValue(initial);
  const position = externalPosition || internalPosition;

  const animation = useRef<AnimationPlaybackControls | null>(null);
  const intendedTarget = useRef(initial);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrubRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(850);
  const [activeVirtual, setActiveVirtual] = useState(initial);
  const activeVirtualRef = useRef(initial);
  const [dragging, setDragging] = useState(false);
  const [scrubbing, setScrubbing] = useState(false);
  const [broken, setBroken] = useState<Record<string, boolean>>({});

  const drag = useRef<{
    startX: number;
    startPosition: number;
    lastX: number;
    lastT: number;
    vx: number;
    moved: boolean;
  } | null>(null);

  const scrubbingRef = useRef(false);
  const suppressClick = useRef(false);
  const latestCallbacks = useRef({ onIndexChange, onGoTo });
  latestCallbacks.current = { onIndexChange, onGoTo };

  const active = count ? mod(activeVirtual, count) : 0;
  const selected = items[active] || items[0];
  const coverSize = Math.min(Math.max(180, size), Math.max(220, width * 0.42));
  const stride = Math.max(70, coverSize * 0.95);

  const goToPosition = useCallback(
    (target: number, velocity = 0) => {
      if (!count) return;
      const bounded = loop ? target : clamp(target, 0, count - 1);
      intendedTarget.current = bounded;

      if (latestCallbacks.current.onGoTo) {
        latestCallbacks.current.onGoTo(bounded);
        return;
      }

      animation.current?.stop();
      animation.current = animate(position, bounded, {
        type: 'spring',
        stiffness,
        damping,
        mass,
        velocity,
        restDelta: 0.001,
        restSpeed: 0.004,
      });
    },
    [count, position, stiffness, damping, mass]
  );

  const goTo = useCallback(
    (index: number) => {
      if (!count) return;
      const target = clamp(Math.round(index), 0, count - 1);
      goToPosition(target);
    },
    [count, goToPosition]
  );

  const step = useCallback(
    (direction: number) => {
      if (!count) return;
      const base = Math.round(position.get());
      goToPosition(base + direction);
    },
    [count, position, goToPosition]
  );

  useImperativeHandle(
    ref,
    () => ({
      next: () => step(1),
      previous: () => step(-1),
      goTo,
    }),
    [step, goTo]
  );

  // Sync active virtual index smoothly with continuous position
  useMotionValueEvent(position, 'change', (value) => {
    const rounded = clamp(Math.round(value), 0, Math.max(0, count - 1));
    if (rounded !== activeVirtualRef.current) {
      activeVirtualRef.current = rounded;
      setActiveVirtual(rounded);
      latestCallbacks.current.onIndexChange?.(rounded);
    }
  });

  useEffect(() => {
    const node = stageRef.current;
    if (!node) return;
    const observer = new ResizeObserver((entries) => setWidth(entries[0].contentRect.width));
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => () => animation.current?.stop(), []);

  // Pointer drag handling
  const beginDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!draggable || count < 2 || (event.pointerType === 'mouse' && event.button !== 0)) return;
    animation.current?.stop();
    intendedTarget.current = position.get();
    drag.current = {
      startX: event.clientX,
      startPosition: position.get(),
      lastX: event.clientX,
      lastT: event.timeStamp,
      vx: 0,
      moved: false,
    };
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
    current.vx = current.vx * 0.5 + ((event.clientX - current.lastX) / dt) * 0.5;
    current.lastX = event.clientX;
    current.lastT = event.timeStamp;

    const next = current.startPosition - diff / stride;
    const withResistance = loop
      ? next
      : next < 0
      ? next * 0.2
      : next > count - 1
      ? count - 1 + (next - (count - 1)) * 0.2
      : next;

    intendedTarget.current = withResistance;
    position.set(withResistance);
  };

  const endDrag = (event: ReactPointerEvent<HTMLDivElement>, cancelled = false) => {
    const current = drag.current;
    if (!current) return;
    drag.current = null;
    setDragging(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
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
    intendedTarget.current = target;
    position.set(target);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("button, [role='slider']") && event.target !== event.currentTarget)
      return;
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      step(1);
    }
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      step(-1);
    }
    if (event.key === 'Home') {
      event.preventDefault();
      goTo(0);
    }
    if (event.key === 'End') {
      event.preventDefault();
      goTo(count - 1);
    }
  };

  const views = useMemo(() => {
    if (!count) return [];
    // When loop is true, create virtual instances on both left and right so center card is ALWAYS flanked
    const radius = Math.min(count > 1 && loop ? count * 2 : count, Math.ceil(visible) + 2);
    const lower = loop ? activeVirtual - radius : Math.max(0, activeVirtual - radius);
    const upper = loop ? activeVirtual + radius : Math.min(count - 1, activeVirtual + radius);

    return Array.from({ length: upper - lower + 1 }, (_, i) => {
      const virtual = lower + i;
      const index = mod(virtual, count);
      return {
        virtual,
        index,
        item: items[index],
      };
    });
  }, [items, count, loop, activeVirtual, visible]);

  const scrubProgress = useTransform(() => {
    if (count <= 1) return '50%';
    const normalized = clamp(position.get(), 0, count - 1);
    return `${(normalized / (count - 1)) * 100}%`;
  });

  const rootStyle = {
    ...style,
    background: backgroundColor,
    ...(color ? { color } : {}),
    '--rail-size': `${coverSize}px`,
    '--rail-aspect': aspect,
    '--rail-accent': selected?.accent || accentColor,
  } as CSSProperties;

  if (!count) return null;

  return (
    <section
      className={`album-rail ${dragging ? 'is-dragging' : ''} ${className}`}
      style={rootStyle}
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* 3D STAGE */}
      <div
        ref={stageRef}
        className="album-rail__stage"
        onPointerDown={beginDrag}
        onPointerMove={moveDrag}
        onPointerUp={(e) => endDrag(e)}
        onPointerCancel={(e) => endDrag(e, true)}
        onClickCapture={(e) => {
          if (suppressClick.current) {
            e.preventDefault();
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
      >
        {views.map((view) => (
          <AlbumCard
            key={view.virtual}
            {...view}
            position={position}
            size={coverSize}
            visible={visible}
            focused={view.virtual === activeVirtual}
            broken={Boolean(broken[view.item.src])}
            onImageError={(src) => setBroken((v) => ({ ...v, [src]: true }))}
            onClick={(index) => {
              if (index !== active) {
                goTo(index);
                return;
              }
              onSelect?.(items[index], index);
            }}
          />
        ))}
      </div>

      {/* CAPTIONS: FOCUSED SECTOR DETAILS */}
      {captions && (
        <div className="album-rail__caption-area" aria-live="polite" aria-atomic="true">
          <motion.div
            key={`caption-${activeVirtual}`}
            className="album-rail__caption"
            initial={{ opacity: 0, y: 10, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
          >
            <h3>{selected.title ?? selected.alt}</h3>
            {selected.subtitle && <p>{selected.subtitle}</p>}

            {/* Industry Tags */}
            {selected.tags && (
              <div className="album-rail__tags">
                {selected.tags.map((tag) => (
                  <span key={tag} className="album-rail__tag">
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Direct Link to Industry detail page */}
            {selected.href && (
              <Link href={selected.href} className="album-rail__cta">
                <span>Explore Sector</span>
                <span>&rarr;</span>
              </Link>
            )}
          </motion.div>
        </div>
      )}

      {/* CONTROLS: PREV, SCRUBBER, NEXT */}
      {controls && (
        <div className="album-rail__controls">
          <button
            type="button"
            className="album-rail__arrow"
            aria-label="Previous industry"
            onClick={() => step(-1)}
            disabled={active === 0}
          >
            &larr;
          </button>

          {scrubber && (
            <div
              ref={scrubRef}
              className={`album-rail__scrubber ${scrubbing ? 'is-scrubbing' : ''}`}
              role="slider"
              aria-label="Choose industry"
              aria-valuemin={1}
              aria-valuemax={count}
              aria-valuenow={active + 1}
              aria-valuetext={selected.title ?? selected.alt}
              tabIndex={0}
              onPointerDown={(event) => {
                if (event.pointerType === 'mouse' && event.button !== 0) return;
                animation.current?.stop();
                setScrubbing(true);
                scrubbingRef.current = true;
                event.currentTarget.setPointerCapture(event.pointerId);
                updateScrubber(event.clientX);
              }}
              onPointerMove={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId)) updateScrubber(event.clientX);
              }}
              onPointerUp={(event) => {
                if (event.currentTarget.hasPointerCapture(event.pointerId))
                  event.currentTarget.releasePointerCapture(event.pointerId);
                scrubbingRef.current = false;
                setScrubbing(false);
                goToPosition(Math.round(position.get()));
              }}
              onPointerCancel={() => {
                scrubbingRef.current = false;
                setScrubbing(false);
                goToPosition(Math.round(position.get()));
              }}
              onKeyDown={(event) => {
                if (['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) {
                  event.preventDefault();
                  event.stopPropagation();
                }
                if (event.key === 'ArrowLeft') step(-1);
                if (event.key === 'ArrowRight') step(1);
                if (event.key === 'Home') goTo(0);
                if (event.key === 'End') goTo(count - 1);
              }}
            >
              <div className="album-rail__scrubber-line" />
              {items.map((_, index) => (
                <span
                  key={index}
                  className="album-rail__scrubber-mark"
                  style={{ left: `${count === 1 ? 50 : (index / (count - 1)) * 100}%` }}
                />
              ))}
              <motion.span className="album-rail__scrubber-thumb" style={{ left: scrubProgress }} />
            </div>
          )}

          <button
            type="button"
            className="album-rail__arrow"
            aria-label="Next industry"
            onClick={() => step(1)}
            disabled={active === count - 1}
          >
            &rarr;
          </button>
        </div>
      )}

      <span className="album-rail__sr-only" aria-live="polite">
        Industry {active + 1} of {count}: {selected.title ?? selected.alt}
      </span>
    </section>
  );
});

export default AlbumRail;
