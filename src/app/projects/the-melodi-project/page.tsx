"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import "./page.css";

export default function MelodiProjectPage() {
  const sectionsRef = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("section--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) {
        observer.observe(section);
      }
    });

    return () => observer.disconnect();
  }, []);

  const addSectionRef = (el: HTMLElement | null, index: number) => {
    sectionsRef.current[index] = el;
  };

  return (
    <main id="main-content" className="melodi-case-study">
      {/* Hero Section */}
      <section ref={(el) => addSectionRef(el, 0)} className="case-study__hero">
        <div className="container">
          <div className="hero__content">
            <div className="hero__text">
              <div className="hero__title-container">
                <h1 className="hero__title">
                  The Melodi Project
                  <span className="hero__subtitle">Support Your Sound.</span>
                </h1>
                <p className="project-badge">Case Study</p>
              </div>

              <div className="hero__subtitle-container">
                <p className="hero__tagline">
                  Integrating e-commerce directly into music streaming platforms to empower artists.
                </p>
              </div>
            </div>

            <div className="hero__visual">
              <div className="mockup-container">
                <Image
                  src="/images/PRODUCT_DETAILS.png"
                  alt="Melodi Project"
                  fill
                  className="mockup-image"
                />
              </div>
            </div>
            <div className="hero__stats">
              <div className="stat">
                <span className="stat__label">Tech Stack</span>
                <span className="stat__value">Next.js, MedusaJS, Supabase</span>
              </div>
              <div className="stat">
                <span className="stat__label">Target</span>
                <span className="stat__value">Music Artists & Fans</span>
              </div>
              <div className="stat">
                <span className="stat__label">My Role</span>
                <span className="stat__value">UX/UI Design, Frontend</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Opportunity */}
      <section ref={(el) => addSectionRef(el, 1)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">The Problem & Opportunity</h2>

          <div className="problem-content">
            <div className="problem__main">
              <h3>Problem Statement</h3>
              <p>
                The current music streaming ecosystem leaves artists struggling with minimal revenue
                from streams while fans have limited ways to support their favorite musicians beyond
                passive listening. The disconnect between streaming and purchasing creates missed
                opportunities for both artists and fans.
              </p>
            </div>

            <div className="problem__opportunity">
              <h3>Opportunity</h3>
              <p>
                By integrating e-commerce directly into streaming platforms, we can create seamless
                pathways for fans to purchase merchandise, tickets, and exclusive content while
                artists gain new revenue streams and deeper fan connections.
              </p>
            </div>
          </div>

          <div className="callout-box">
            <div className="callout__content">
              <h4>Artists earn less than $0.005 per stream.</h4>
              <p>We can change that.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Goals */}
      <section ref={(el) => addSectionRef(el, 2)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">Vision & Goals</h2>

          <div className="vision-content">
            <div className="vision__statement">
              <h3>Vision Statement</h3>
              <p className="vision__text">
                Make music streaming profitable for artists through integrated e-commerce, creating
                a sustainable ecosystem where creativity thrives and fans can meaningfully support
                the music they love.
              </p>
            </div>

            <div className="goals__list">
              <h3>Core Goals</h3>
              <ul>
                <li>Let artists sell merch and tickets directly in streaming apps</li>
                <li>Reduce reliance on third-party platforms</li>
                <li>Improve fan engagement via exclusive content</li>
                <li>Create transparent revenue sharing models</li>
                <li>Build community-driven artist-fan relationships</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* My Role & Responsibilities */}
      <section ref={(el) => addSectionRef(el, 3)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">My Role & Responsibilities</h2>

          <div className="role-content">
            <div className="role__contributions">
              <h3>My Contributions</h3>
              <ul>
                <li>UX/UI Design & User Research</li>
                <li>Frontend Architecture & Component Library</li>
                <li>MedusaJS E-commerce Integration</li>
                <li>Market Research & Competitive Analysis</li>
                <li>Prototyping & User Testing</li>
                <li>Technical Architecture Planning</li>
              </ul>
            </div>

            <div className="role__collaboration">
              <h3>Collaboration</h3>
              <p>
                Working closely with marketing strategists, design peers, and engineering teams to
                ensure the solution meets both user needs and technical requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Research & Insights */}
      <section ref={(el) => addSectionRef(el, 4)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">Research & Insights</h2>

          <div className="research-content">
            <div className="research__overview">
              <p>
                Through extensive market research, artist interviews, and competitive analysis,
                I&apos;ve identified key pain points and opportunities in the current music
                ecosystem.
              </p>
            </div>

            <div className="research__personas">
              <h3>Artist Personas</h3>
              <div className="personas-grid">
                <div className="persona">
                  <h4>Sarah - Independent Artist</h4>
                  <p>
                    &ldquo;I make $200/month from streaming but spend $500 on marketing. I need
                    direct fan support.&rdquo;
                  </p>
                </div>
                <div className="persona">
                  <h4>Marcus - Established Musician</h4>
                  <p>
                    &ldquo;My fans want exclusive content and merch, but I lose 30% to third-party
                    platforms.&rdquo;
                  </p>
                </div>
              </div>
            </div>

            <div className="research__quote">
              <blockquote>
                &ldquo;Fans are willing to pay 5-10x more for direct artist support than what they
                generate through streaming alone.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* The Process */}
      <section ref={(el) => addSectionRef(el, 5)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">The Process</h2>

          <div className="process-stages">
            <div className="stage">
              <h3>1. Discovery & Ideation</h3>
              <div className="stage__content">
                <div className="stage__visual">
                  <div className="process-placeholder">
                    <span>Brainstorm Sketches</span>
                    <span>Early Notes</span>
                    <span>Whiteboard Sessions</span>
                  </div>
                </div>
                <p>
                  Started with extensive research into current music streaming pain points, followed
                  by brainstorming sessions to identify innovative solutions.
                </p>
              </div>
            </div>

            <div className="stage">
              <h3>2. Wireframing</h3>
              <div className="stage__content">
                <div className="stage__visual">
                  <div className="process-placeholder">
                    <span>Low-Fidelity Layouts</span>
                    <span>User Flow Maps</span>
                    <span>Information Architecture</span>
                  </div>
                </div>
                <p>
                  Created wireframes focusing on seamless integration between streaming and
                  purchasing experiences.
                </p>
              </div>
            </div>

            <div className="stage">
              <h3>3. High-Fidelity Designs</h3>
              <div className="stage__content">
                <div className="stage__visual">
                  <div className="process-placeholder">
                    <span>Figma Screens</span>
                    <span>Component Library</span>
                    <span>Design System</span>
                  </div>
                </div>
                <p>
                  Developed polished UI designs with consistent design language and accessibility
                  considerations.
                </p>
              </div>
            </div>

            <div className="stage">
              <h3>4. Architecture Decisions</h3>
              <div className="stage__content">
                <div className="stage__visual">
                  <div className="process-placeholder">
                    <span>Next.js Frontend</span>
                    <span>MedusaJS E-commerce</span>
                    <span>Supabase Backend</span>
                  </div>
                </div>
                <p>
                  Chose Next.js for performance and SEO, MedusaJS for robust e-commerce
                  functionality, and Supabase for scalable backend services.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section ref={(el) => addSectionRef(el, 6)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">Key Features (WIP Previews)</h2>

          <div className="features-grid">
            <div className="feature">
              <div className="feature__visual">
                <div className="feature-placeholder">
                  <span>Artist Storefronts</span>
                  <div className="feature-status">Currently Designing</div>
                </div>
              </div>
              <div className="feature__content">
                <h3>Artist Storefronts</h3>
                <p>
                  Customizable storefronts that integrate seamlessly with streaming profiles,
                  allowing artists to showcase merchandise, tickets, and exclusive content.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature__visual">
                <div className="feature-placeholder">
                  <span>Integrated Checkout</span>
                  <div className="feature-status">Prototype Only</div>
                </div>
              </div>
              <div className="feature__content">
                <h3>Integrated Checkout</h3>
                <p>
                  One-click purchasing that maintains the streaming experience while providing
                  secure, fast checkout for fans.
                </p>
              </div>
            </div>

            <div className="feature">
              <div className="feature__visual">
                <div className="feature-placeholder">
                  <span>Ticketing & Experiences</span>
                  <div className="feature-status">Feature Under Development</div>
                </div>
              </div>
              <div className="feature__content">
                <h3>Ticketing & Experiences</h3>
                <p>
                  Direct ticket sales for concerts and exclusive fan experiences, eliminating
                  scalping and ensuring fair pricing.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Challenges & Solutions */}
      <section ref={(el) => addSectionRef(el, 7)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">Challenges & Solutions</h2>

          <div className="challenges-grid">
            <div className="challenge">
              <h3>Challenge: Seamless Integration</h3>
              <p>
                Creating a purchasing experience that feels native to streaming platforms without
                disrupting the listening experience.
              </p>
              <div className="solution">
                <h4>Solution</h4>
                <p>
                  Designed contextual purchase prompts that appear at natural break points (end of
                  songs, between albums) and can be dismissed without friction.
                </p>
              </div>
            </div>

            <div className="challenge">
              <h3>Challenge: Payment Processing</h3>
              <p>
                Handling multiple payment methods, currencies, and regional requirements while
                maintaining security and compliance.
              </p>
              <div className="solution">
                <h4>Solution</h4>
                <p>
                  Leveraging MedusaJS&apos;s robust payment infrastructure and implementing Stripe
                  Connect for multi-party transactions.
                </p>
              </div>
            </div>

            <div className="challenge">
              <h3>Challenge: Artist Onboarding</h3>
              <p>
                Making it easy for artists of all technical levels to set up their storefronts and
                manage inventory.
              </p>
              <div className="solution">
                <h4>Solution</h4>
                <p>
                  Creating intuitive setup wizards with templates, bulk import tools, and automated
                  inventory management.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Next Steps / Roadmap */}
      <section ref={(el) => addSectionRef(el, 8)} className="case-study__section">
        <div className="container">
          <h2 className="section__title">Next Steps / Roadmap</h2>

          <div className="roadmap-content">
            <div className="roadmap__visual">
              <div className="roadmap-timeline">
                <div className="timeline-item">
                  <div className="timeline__phase">MVP</div>
                  <div className="timeline__description">Core e-commerce functionality</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline__phase">Artist Beta</div>
                  <div className="timeline__description">Limited artist testing</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline__phase">Public Launch</div>
                  <div className="timeline__description">Full platform release</div>
                </div>
                <div className="timeline-item">
                  <div className="timeline__phase">Iteration</div>
                  <div className="timeline__description">Data analysis & improvements</div>
                </div>
              </div>
            </div>

            <div className="roadmap__integrations">
              <h3>Planned Integrations</h3>
              <ul>
                <li>Spotify API for seamless streaming integration</li>
                <li>Merch analytics and inventory management</li>
                <li>Anti-scalper ticketing systems</li>
                <li>Fan engagement and community tools</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing & Call to Action */}
      <section
        ref={(el) => addSectionRef(el, 9)}
        className="case-study__section case-study__closing"
      >
        <div className="container">
          <div className="closing-content">
            <h2>Supporting Artists, One Stream at a Time</h2>
            <p>
              The Melodi Project represents a fundamental shift in how artists and fans interact in
              the digital music space. By bridging the gap between streaming and commerce,
              we&apos;re creating opportunities for sustainable artist careers and meaningful fan
              connections.
            </p>

            <div className="closing__cta">
              <p>
                If you&apos;re a music streaming company or artist interested in this vision,
                let&apos;s connect and explore how we can revolutionize the industry together.
              </p>
              <div className="cta__buttons">
                <a href="/contact" className="btn btn--primary btn--large">
                  Get In Touch
                </a>
                <a
                  href="https://linkedin.com/in/breeana-payton"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary btn--large"
                >
                  Connect on LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
