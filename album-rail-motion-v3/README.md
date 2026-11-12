# Album Rail v3 — continuous Motion-powered animations

Independent component inspired by the *interaction concept* of album-cover rails, not React Bits Pro source.

## Install into an existing Next.js or React project

```bash
npm install motion
```

Copy `AlbumRail.tsx` and `AlbumRail.css` into your `components` folder. Both files must stay adjacent, or adjust the CSS import path. Import `AlbumRail` in a client component/page and provide an `items` array with valid album cover image URLs. `example-page.tsx` contains sample usage (add your own cover images under `/public/albums`).

## What's different from v2

- **One shared Motion value:** all cards translate, rotate, scale, fade and dim in sync each frame.
- **Physical spring snapping:** no separate CSS card transition timers.
- **Continuous drag:** pointer movement updates the rail immediately; releasing projects pointer velocity and springs to a card.
- **Seamless visual wrap:** uses virtual positions for repeated item instances, avoiding the old half-array wrapping jump.
- **Animated scrubber** follows rail motion and supports continuous drag.
- **Focused caption** rises and unblurs on each selection.
- **Vinyl slide** uses a separate, deliberate spring; spin rate uses `rpm`.
- **Reduced motion** removes spring travel and vinyl spin.

## Tuning the card transitions

```tsx
<AlbumRail
  items={albums}
  autoplay={false}
  loop
  stiffness={175} // lower = slower / more cinematic
  damping={27}   // higher = less overshoot
  mass={1}       // higher = heavier
  momentum={0.2} // release momentum (seconds projected)
  spread={0.58}
  stack={0.72}
  fan={4}
  turn={24}
  depth={0.52}
/>
```

Try `stiffness={130} damping={26} mass={1.1}` for a slower fluid transition, or `stiffness={255} damping={31} mass={0.85}` for a snappier one.

## Notes

- All v2 public props and imperative ref methods are preserved; v3 adds `stiffness`, `damping`, `mass`, `momentum`.
- Album covers should be valid image URLs. `autoAccent` requires same-origin or CORS-enabled image hosts.
- Wheel navigation consumes scroll while pointer is over the rail unless at an unlooped end; set `wheel={false}` on long pages if desired.
- Vinyl's rotation is decorative; audio playback is not included.
- The gallery doesn't use the original proprietary React Bits Pro implementation.
