import React from 'react';
import { createRoot } from 'react-dom/client';
import AlbumRail from './AlbumRail';
const albums = [
  { src: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=700&q=85', alt: 'Live concert', title: 'Electric Nights', subtitle: 'The Echoes' },
  { src: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=700&q=85', alt: 'Concert performance', title: 'Midnight Frequencies', subtitle: 'Nova City' },
  { src: 'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=700&q=85', alt: 'Music event', title: 'Golden Hour', subtitle: 'Sunset Drive' },
  { src: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=700&q=85', alt: 'DJ set', title: 'After Dark', subtitle: 'Ocean Avenue' },
  { src: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=700&q=85', alt: 'Music festival', title: 'Light Years', subtitle: 'The Signals' },
];
function Demo() { return <main style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', background: '#f6f5f2', color: '#17161b', fontFamily: 'system-ui,sans-serif' }}>
  <div style={{ width: '100%', maxWidth: 1320 }}><div style={{ textAlign: 'center', paddingTop: 45, fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase' }}>Album Rail · Motion v3</div>
    <AlbumRail items={albums} autoplay={false} autoAccent={false} /></div></main> }
createRoot(document.getElementById('root')!).render(<React.StrictMode><Demo /></React.StrictMode>);
