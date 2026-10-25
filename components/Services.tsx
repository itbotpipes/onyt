/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Services() {
  return (
    <>
      <section id="services" style={{paddingTop:'0'}}>
        <div className="hd rv">
          <div>
            <h2>Four disciplines. One growth engine.</h2>
          </div>
          <div style={{display:'flex',flexDirection:'column',gap:'12px',alignItems:'flex-start'}}>
            <p>Use them together or on their own. Each is built to stand out and to perform.</p>
            <Link href="/services" className="btn g" style={{fontSize:'13px',padding:'8px 18px'}}>
              Explore all services ↗
            </Link>
          </div>
        </div>
        <div className="sv">
          <Link href="/services/performance-marketing" className="sc rv" style={{display:'flex',textDecoration:'none',color:'inherit'}}>
            <div>
              <small>01</small>
              <h3>Performance Marketing</h3>
              <p>Paid media and funnels tuned for revenue, not vanity metrics.</p>
            </div>
            <ul>
              <li>Meta &amp; Google Ads</li>
              <li>CRO &amp; Funnels</li>
              <li>Analytics &amp; Attribution</li>
            </ul>
          </Link>
          <Link href="/services/content-strategy-creation" className="sc rv" style={{display:'flex',textDecoration:'none',color:'inherit'}}>
            <div>
              <small>02</small>
              <h3>Branding &amp; Content</h3>
              <p>Identities and systems that make you instantly recognisable.</p>
            </div>
            <ul>
              <li>Logo &amp; Identity</li>
              <li>Brand Strategy</li>
              <li>Guidelines &amp; Collateral</li>
            </ul>
          </Link>
          <Link href="/services/website-development" className="sc rv" style={{display:'flex',textDecoration:'none',color:'inherit'}}>
            <div>
              <small>03</small>
              <h3>Website Development</h3>
              <p>Fast, immersive sites with motion that converts.</p>
            </div>
            <ul>
              <li>UI/UX Design</li>
              <li>Custom Development</li>
              <li>E-commerce &amp; CMS</li>
            </ul>
          </Link>
          <Link href="/services/custom-technology-development" className="sc rv" style={{display:'flex',textDecoration:'none',color:'inherit'}}>
            <div>
              <small>04</small>
              <h3>Application Development</h3>
              <p>Web and mobile products engineered to scale from day one.</p>
            </div>
            <ul>
              <li>iOS &amp; Android</li>
              <li>SaaS Platforms</li>
              <li>APIs &amp; Dashboards</li>
            </ul>
          </Link>
        </div>
      </section>
    </>
  );
}
