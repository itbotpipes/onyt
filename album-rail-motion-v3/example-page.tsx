import AlbumRail, { type Album } from "./AlbumRail";

const albums: Album[] = [
  { src: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=85", alt: "Concert lights", title: "After Hours", subtitle: "Night Drive" },
  { src: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700&q=85", alt: "Singer on stage", title: "Electric Dreams", subtitle: "The Echoes" },
  { src: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=700&q=85", alt: "Music studio", title: "Analog Soul", subtitle: "Stereo Club" },
  { src: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&q=85", alt: "Live performance", title: "Golden Hour", subtitle: "Soft Static" },
  { src: "https://images.unsplash.com/photo-1506157786151-b8491531f063?w=700&q=85", alt: "Festival crowd", title: "Frequency", subtitle: "Low Tide" },
];

export default function Page() {
  return (
    <main style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#f6f4f0" }}>
      <AlbumRail items={albums} autoplay interval={4} vinyl visible={3} />
    </main>
  );
}
