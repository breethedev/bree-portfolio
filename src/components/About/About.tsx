"use client";

import { useEffect, useRef } from "react";
import "./About.css";

export default function About() {
  const aboutRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("about__content--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skills = [
    "React",
    "TypeScript",
    "CSS Modules",
    "Tailwind",
    "Frontend Architecture",
    "NodeJS",
    "Training",
  ];

  const additionalSkills = ["Figma", "Storybook", "Component Libraries"];

  return (
    <section id="about" className="about" ref={aboutRef}>
      <div className="container about__container">
        <div className="about__content">
          <h2 className="about__title">About Me</h2>

          <div className="about__grid">
            <div className="about__text">
              <p className="about__intro">
                I&apos;m a Senior Software Engineer with over 5 years of professional coding
                experience.
              </p>

              <p className="about__description">
                I specialize in building component libraries, bringing apps to full accessibility
                compliance, and training junior engineers to have consistent and high quality
                commits.
              </p>
            </div>

            <div className="about__skills">
              <h3 className="about__skills-title">Expert Experience</h3>
              <div className="about__skills-grid">
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className="about__skill-tag"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className="about__skills-title">Additional Experience</h3>
              <div className="about__skills-grid">
                {additionalSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className="about__skill-tag about__skill-tag--secondary"
                    style={{ animationDelay: `${(index + skills.length) * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="about__cta">
            <a href="#contact" className="btn btn--primary">
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
