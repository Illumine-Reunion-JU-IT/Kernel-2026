import Link from "next/link";

const navigation = [
  { label: "About", href: "#about" },
  { label: "Events", href: "#events" },
  { label: "Speakers", href: "#speakers" },
  { label: "Contact", href: "#contact" }
];

export default function HomePage() {
  return (
    <main>
      <div className="topline" />

      <header className="site-header">
        <div className="container nav-content">
          <Link href="/" className="brand" aria-label="KERNEL home">
            <span className="brand-mark">K</span>
            <span>
              KERNEL
              <small>1.0 · JADAVPUR UNIVERSITY</small>
            </span>
          </Link>

          <nav className="desktop-nav" aria-label="Main navigation">
            {navigation.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>

          <span className="nav-status">
            <span className="status-dot" />
            WEBSITE PREVIEW
          </span>
        </div>
      </header>

      <section className="hero container">
        <div className="hero-content">
          <p className="eyebrow">
            <span className="eyebrow-line" />
            DEPARTMENT OF INFORMATION TECHNOLOGY
          </p>

          <h1>
            THINK
            <br />
            <span>BEYOND</span>
            <br />
            THE <span className="outline-text">KERNEL.</span>
          </h1>

          <p className="hero-description">
            A technology-driven experience by Jadavpur University.
            Explore ideas, engineering, innovation and the future of
            computing.
          </p>

          <div className="hero-actions">
            <a href="#about" className="button button-primary">
              EXPLORE KERNEL <span aria-hidden="true">↗</span>
            </a>
            <span className="hero-caption">KERNEL 1.0 / 2026</span>
          </div>
        </div>

        <div className="hero-art" aria-hidden="true">
          <div className="orbit orbit-one" />
          <div className="orbit orbit-two" />
          <div className="orbit orbit-three" />
          <div className="core-symbol">K<span>.</span></div>
          <span className="art-label art-label-top">SYSTEM / 001</span>
          <span className="art-label art-label-bottom">
            ENGINEER THE UNKNOWN
          </span>
          <span className="art-cross cross-one">+</span>
          <span className="art-cross cross-two">+</span>
        </div>
      </section>

      <section className="information-strip">
        <div className="container strip-content">
          <span>JADAVPUR UNIVERSITY</span>
          <span>INFORMATION TECHNOLOGY</span>
          <span>KERNEL 1.0</span>
          <span>BUILD / CREATE / INNOVATE</span>
        </div>
      </section>

      <section id="about" className="intro-section container">
        <p className="section-index">01 / INTRODUCTION</p>
        <div>
          <h2>
            THE FUTURE IS
            <br />
            <span>BUILT BY THINKERS.</span>
          </h2>
          <p>
            KERNEL is a platform for technology, creativity and
            collaboration. More information about the event will be
            published here by the organisers.
          </p>
        </div>
      </section>

      <section id="events" className="preview-section container">
        <p className="section-index">02 / WHAT&apos;S AHEAD</p>
        <div className="preview-card">
          <span className="preview-number">K / 001</span>
          <h2>NEW IDEAS. NEW POSSIBILITIES.</h2>
          <p>
            Event schedules and activities will be announced by the
            organising team.
          </p>
          <span className="coming-soon">CONTENT COMING SOON ↗</span>
        </div>
      </section>

      <footer id="contact" className="site-footer">
        <div className="container footer-content">
          <Link href="/" className="footer-brand">KERNEL<span>.</span></Link>
          <p>
            Department of Information Technology
            <br />
            Jadavpur University
          </p>
          <span className="footer-note">KERNEL 1.0 · 2026</span>
        </div>
      </footer>
    </main>
  );
}
