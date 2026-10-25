/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';

export default function Cta() {
  return (
    <section className="ctx" id="contact">
      <div className="ctx-wrap">
        <div className="cx">
          <div className="rv">
            <div className="ey">Let’s work together</div>
            <h2>Have a brand or product to grow? Let’s talk.</h2>
            <div className="av">
              <i></i>Now booking projects for Q1 2027
            </div>
          </div>
          <a className="spin rv" href="mailto:hello@onyt.com" aria-label="Email ONYT">
            <svg viewBox="0 0 200 200">
              <defs>
                <path id="cp" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <text>
                <textPath href="#cp" textLength="488" lengthAdjust="spacing">
                  Let’s talk ✦ Let’s talk ✦ Let’s talk ✦ Let’s talk ✦ Let’s talk ✦{' '}
                </textPath>
              </text>
            </svg>
            <b>↗</b>
          </a>
        </div>

        <div className="cr rv">
          <a className="cl2" href="mailto:hello@onyt.com">
            <small>Start a project</small>
            <b>hello@onyt.com</b>
            <i>↗</i>
          </a>
          <a className="cl2" href="tel:+910000000000">
            <small>Call us</small>
            <b>+91 00000 00000</b>
            <i>↗</i>
          </a>
          <a className="cl2" href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <small>Follow us</small>
            <b>Instagram</b>
            <i>↗</i>
          </a>
        </div>

        <div className="fm rv">
          <small>Or tell us what you need</small>
          <div className="fm-body">
            <form className="cf2" id="cf">
              <div className="cc" id="cc">
                <button type="button">Performance</button>
                <button type="button">Branding</button>
                <button type="button">Website</button>
                <button type="button">App</button>
              </div>
              <div className="pf">
                <input id="f2" type="email" placeholder="Your email address" required />
                <button className="btn">Send ↗</button>
              </div>
              <p className="ok" id="ok"></p>
            </form>
            <div className="fm-alt">
              <Link href="/contact" className="btn g" style={{ fontSize: '12px', padding: '6px 16px' }}>
                Open full project inquiry form ↗
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
