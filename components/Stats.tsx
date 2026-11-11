/* eslint-disable @next/next/no-img-element */
export default function Stats() {
  return (
    <section className="stats-sec" aria-label="Studio Performance Metrics">
      <div className="nm rv in on">
        <div>
          <h3 data-n="4.2" data-s="x">4.2x</h3>
          <p>Average ROAS lift</p>
        </div>
        <div>
          <h3 data-n="120" data-s="+">120+</h3>
          <p>Brands launched</p>
        </div>
        <div>
          <h3 data-n="35" data-s="Cr+">35Cr+</h3>
          <p>Ad spend managed</p>
        </div>
        <div>
          <h3 data-n="98" data-s="%">98%</h3>
          <p>Client retention</p>
        </div>
      </div>
    </section>
  );
}
