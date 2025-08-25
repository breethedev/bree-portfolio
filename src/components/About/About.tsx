"use client";

import { useEffect, useRef } from "react";
import s from "./About.module.css";

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
    <section id="about" className={s["about"]} ref={aboutRef}>
      <div className={`container ${s["about__container"]}`}>
        <div className={s["about__content"]}>
          <h2 className={s["about__title"]}>About Me</h2>

          <div className={s["about__grid"]}>
            <div className={s["about__text"]}>
              <p className={s["about__intro"]}>
                I&apos;m a Senior Software Engineer with over 5 years of professional coding
                experience.
              </p>

              <p className={s["about__description"]}>
                I specialize in building component libraries, bringing apps to full accessibility
                compliance, and training junior engineers to have consistent and high quality
                commits.
              </p>
            </div>

            <div className={s["about__skills"]}>
              <h3 className={s["about__skills-title"]}>Expert Experience</h3>
              <div className={s["about__skills-grid"]}>
                {skills.map((skill, index) => (
                  <span
                    key={skill}
                    className={s["about__skill-tag"]}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <h3 className={s["about__skills-title"]}>Additional Experience</h3>
              <div className={s["about__skills-grid"]}>
                {additionalSkills.map((skill, index) => (
                  <span
                    key={skill}
                    className={`${s["about__skill-tag"]} ${s["about__skill-tag--secondary"]}`}
                    style={{ animationDelay: `${(index + skills.length) * 0.1}s` }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className={s["about__cta"]}>
            <a href="#contact" className={`${s["btn"]} ${s["btn--primary"]}`}>
              Let&apos;s Work Together
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
