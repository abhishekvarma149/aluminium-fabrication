const FOOTER_LINKS = {
  Studio: [
    { label: 'About Us',     href: '#about'    },
    { label: 'Our Process',  href: '#design'   },
    { label: 'Showcase',     href: '#showcase' },
    { label: 'Awards',       href: '#'         },
  ],
  Services: [
    { label: 'Interior Design', href: '#' },
    { label: 'Architecture',    href: '#' },
    { label: 'Landscape',       href: '#' },
    { label: 'Bespoke Joinery', href: '#' },
  ],
  Connect: [
    { label: 'Instagram',  href: '#' },
    { label: 'Pinterest',  href: '#' },
    { label: 'LinkedIn',   href: '#' },
    { label: 'Contact',    href: '#contact' },
  ],
};

export default function Footer() {
  return (
    <footer id="contact" className="footer" role="contentinfo">
      <div className="footer-top">
        {/* Brand */}
        <div className="footer-brand">
          <h3>Alumi<span>nium</span></h3>
          <p>
            A studio dedicated to the art of extraordinary living.
            Creating spaces that endure, inspire, and elevate.
          </p>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([col, links]) => (
          <div key={col} className="footer-col">
            <h4>{col}</h4>
            <ul role="list">
              {links.map((l) => (
                <li key={l.label}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="footer-bottom">
        <span>© {new Date().getFullYear()} Aluminium Studio. All rights reserved.</span>
        <span>Privacy Policy · Terms of Service</span>
      </div>
    </footer>
  );
}
