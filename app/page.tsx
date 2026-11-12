export default function HomePage() {
  return (
    <div id="top">
        {/* Hero Section */}
        <section className="wrap hero">
          <div>
            <div className="eyebrow">
              <span className="dot" /> IT Tech Fest · Jadavpur University
            </div>
            <h1>
              <span>THINK.</span>
              <span className="glitch">BUILD.</span>
              <span>BREAK.</span>
            </h1>
            <p className="hero-copy">
              One challenge. A hundred directions. Bring your sharpest ideas, find
              your people, and turn a bold concept into something real at{" "}
              <b>KERNEL 1.0</b> — the hackathon of the Department of Information
              Technology’s Tech Fest at Jadavpur University.
            </p>
            <div className="hero-actions">
              <a className="btn" href="#register">
                Enter the arena <span>↗</span>
              </a>
              <a className="text-link" href="#about">
                Discover KERNEL ↓
              </a>
            </div>
            <div className="hero-meta">
              <div className="meta">
                <b>01.0</b>
                <span>Edition</span>
              </div>
              <div className="meta">
                <b>Dept. of IT, JU</b>
                <span>Hosted by</span>
              </div>
              <div className="meta">
                <b>Code / Game / Ship</b>
                <span>The mission</span>
              </div>
            </div>
          </div>
          <div className="art-wrap">
            <div className="orbit" />
            <div className="art-frame">
              <img
                src="/images/kernel-logo.png"
                alt="KERNEL logo — code brackets and a game controller inside a red orbit"
              />
            </div>
            <div className="side-label">IT TECH FEST — KERNEL 1.0</div>
          </div>
          <div className="scroll-cue">Scroll to explore</div>
        </section>

        {/* Marquee Ticker */}
        <div className="ticker">
          <div className="ticker-inner">
            <span>JADAVPUR UNIVERSITY</span>
            <b>✳</b>
            <span>IT TECH FEST</span>
            <b>✳</b>
            <span>&lt;/&gt; CODE THE UNEXPECTED</span>
            <b>✳</b>
            <span>GAME ON</span>
            <b>✳</b>
            <span>IDEAS INTO IMPACT</span>
            <b>✳</b>
            <span>KERNEL 1.0</span>
            <b>✳</b>
            <span>JADAVPUR UNIVERSITY</span>
            <b>✳</b>
            <span>IT TECH FEST</span>
            <b>✳</b>
            <span>&lt;/&gt; CODE THE UNEXPECTED</span>
            <b>✳</b>
            <span>GAME ON</span>
            <b>✳</b>
            <span>IDEAS INTO IMPACT</span>
            <b>✳</b>
            <span>KERNEL 1.0</span>
            <b>✳</b>
          </div>
        </div>

        {/* Host Section */}
        <section className="wrap host" id="host">
          <div className="host-card">
            <img
              className="host-seal"
              src="/images/ju-seal.png"
              alt="Jadavpur University seal"
            />
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="kicker">
                {"// Presented by the Department of Information Technology"}
              </div>
              <h2>
                The IT Tech Fest,
                <br />
                Jadavpur University.
              </h2>
              <p>
                KERNEL 1.0 is the hackathon at the heart of our department’s tech
                fest — built by IT students for every curious maker on campus. Code,
                play, break things, and ship something worth showing.
              </p>
              <div className="chips">
                <span className="chip">JADAVPUR UNIVERSITY</span>
                <span className="chip p">DEPT. OF INFORMATION TECHNOLOGY</span>
                <span className="chip r">KERNEL 1.0</span>
              </div>
            </div>
            <img
              className="host-logo"
              src="/images/kernel-logo.png"
              alt="KERNEL logo"
            />
          </div>
        </section>

        {/* About Section */}
        <section className="wrap" id="about">
          <div className="section-head">
            <div>
              <div className="kicker">{"// 01 — What is KERNEL?"}</div>
              <h2>
                Not another
                <br />
                ordinary weekend.
              </h2>
            </div>
            <p>
              KERNEL is a space for curious minds to collaborate, experiment, and
              solve problems through technology. Come with a team, leave with a
              prototype — and a story worth telling at the Jadavpur University IT
              Tech Fest.
            </p>
          </div>
          <div className="about-grid">
            <article className="about-card feature">
              <span className="card-index">[ THE CHALLENGE ]</span>
              <span className="corner">01</span>
              <h3>Start with a problem.</h3>
              <p>
                Find a real-world friction point. Question the obvious. Design a
                solution that people would actually want to use.
              </p>
            </article>
            <article className="about-card">
              <span className="card-index">[ THE EXPERIENCE ]</span>
              <span className="corner">02</span>
              <h3>Make it happen.</h3>
              <p>
                Collaborate with fellow builders, learn from mentors, test your
                assumptions, and turn your idea into a working demo.
              </p>
            </article>
          </div>
        </section>

        {/* Tracks Section */}
        <section className="wrap" id="tracks">
          <div className="section-head">
            <div>
              <div className="kicker">{"// 02 — Choose your direction"}</div>
              <h2>
                Pick a problem.
                <br />
                Own the solution.
              </h2>
            </div>
            <p>
              Use these as suggested focus areas. Teams can bring their own
              problem statement and build across disciplines.
            </p>
          </div>
          <div className="tracks">
            <article className="track">
              <div className="num">TRACK_01</div>
              <div className="symbol">⌘</div>
              <h3>AI / Machine Learning</h3>
              <p>
                Build smarter systems, useful copilots, predictive tools, and
                responsible AI experiences.
              </p>
            </article>
            <article className="track">
              <div className="num">TRACK_02</div>
              <div className="symbol">⌁</div>
              <h3>Web / App Development</h3>
              <p>
                Create products and platforms that make everyday workflows simpler
                and better.
              </p>
            </article>
            <article className="track">
              <div className="num">TRACK_03</div>
              <div className="symbol">◈</div>
              <h3>Open Innovation</h3>
              <p>
                Games, hardware, sustainability, security, civic tech — surprise us
                with a problem worth solving.
              </p>
            </article>
          </div>
        </section>

        {/* Flow Section */}
        <section className="wrap" id="flow">
          <div className="section-head">
            <div>
              <div className="kicker">{"// 03 — How it works"}</div>
              <h2>
                From blank page
                <br />
                to big reveal.
              </h2>
            </div>
            <p>
              A simple path from registration to the final demo. Replace the sample
              stages with your confirmed event schedule.
            </p>
          </div>
          <div className="steps">
            <div className="step">
              <div className="step-no">PHASE_01</div>
              <h3>Register &amp; team up</h3>
              <p>
                Sign up, find collaborators, and choose a challenge that gets you
                thinking.
              </p>
            </div>
            <div className="step">
              <div className="step-no">PHASE_02</div>
              <h3>Ideate &amp; build</h3>
              <p>
                Plan your approach, prototype the core experience, and ask mentors
                for feedback.
              </p>
            </div>
            <div className="step">
              <div className="step-no">PHASE_03</div>
              <h3>Demo &amp; present</h3>
              <p>
                Show the problem, your solution, what works, and what makes your
                idea different.
              </p>
            </div>
            <div className="step">
              <div className="step-no">PHASE_04</div>
              <h3>Celebrate &amp; connect</h3>
              <p>
                Meet the community, learn from other teams, and take your next step
                forward.
              </p>
            </div>
          </div>
        </section>

        {/* Prizes Section */}
        <section className="wrap" id="prizes">
          <div className="section-head">
            <div>
              <div className="kicker">{"// 04 — The good stuff"}</div>
              <h2>
                Build for impact.
                <br />
                Get recognised.
              </h2>
            </div>
            <p>
              Showcase your craft, get feedback from experienced reviewers, and earn
              recognition for work that stands out.
            </p>
          </div>
          <div className="prize-panel">
            <div className="prize-main">
              <div className="kicker">[ TOP TEAM ]</div>
              <strong>
                THE
                <br />
                WINNERS.
              </strong>
              <p>Prize details to be announced</p>
            </div>
            <div className="prize-side">
              <div className="prize-small">
                <h3>Best Innovation</h3>
                <span>AWARD_02</span>
              </div>
              <div className="prize-small">
                <h3>Best Design</h3>
                <span>AWARD_03</span>
              </div>
              <div className="prize-small">
                <h3>People&apos;s Choice</h3>
                <span>AWARD_04</span>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="wrap" id="faq">
          <div className="faq">
            <div>
              <div className="kicker">{"// 05 — Questions?"}</div>
              <h2
                style={{
                  fontSize: "clamp(40px, 5vw, 62px)",
                  letterSpacing: "-0.07em",
                  lineHeight: 0.95,
                  margin: "14px 0",
                }}
              >
                Before you
                <br />
                hit submit.
              </h2>
              <p
                style={{
                  color: "var(--muted)",
                  fontSize: "14px",
                  lineHeight: 1.7,
                }}
              >
                A few quick answers. Add your official rules and eligibility
                details before publishing.
              </p>
            </div>
            <div className="faq-list">
              <details open>
                <summary>Who can participate?</summary>
                <p>
                  Replace this with your confirmed eligibility criteria — for
                  example, whether the event is open to all JU departments, years,
                  and outside colleges.
                </p>
              </details>
              <details>
                <summary>Can I participate solo?</summary>
                <p>
                  Add your team-size rules here, including whether solo
                  registrations are allowed and how team formation works.
                </p>
              </details>
              <details>
                <summary>What should I bring?</summary>
                <p>
                  Your laptop, charger, student ID if required, and a willingness
                  to experiment. Publish any additional venue or equipment
                  instructions here.
                </p>
              </details>
              <details>
                <summary>Do I need a finished idea to register?</summary>
                <p>
                  No. You can arrive with a rough direction and refine it with
                  your team. Confirm this against the final event rules.
                </p>
              </details>
            </div>
          </div>
        </section>

        {/* Final CTA Section */}
        <section className="wrap" id="register">
          <div className="final-cta">
            <img
              className="cta-logo"
              src="/images/kernel-logo.png"
              alt="KERNEL logo"
            />
            <div className="kicker">[ YOUR NEXT COMMIT STARTS HERE ]</div>
            <h2>
              MAKE THE
              <br />
              <span className="glitch">FIRST MOVE.</span>
            </h2>
            <p>
              Got an idea that refuses to leave your head? Give it a place to
              become real. Join KERNEL 1.0 at the Jadavpur University IT Tech
              Fest.
            </p>
            <a
              className="btn"
              href="mailto:YOUR-REGISTRATION-EMAIL@example.com?subject=KERNEL%201.0%20Registration"
            >
              Register your interest ↗
            </a>
          </div>
        </section>
    </div>
  );
}
