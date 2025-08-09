"use client";

import { useEffect, useRef } from "react";
import "./Experience.css";

export default function Experience() {
  const experienceRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("experience__content--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (experienceRef.current) {
      observer.observe(experienceRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const companies = [
    {
      name: "AutoZone",
      logo: "AZ",
      description:
        "Led frontend development initiatives, implemented modern React patterns, and improved user experience across multiple web applications.",
      duration: "2022 - Present",
      role: "Senior Frontend Engineer",
    },
    {
      name: "AT&T",
      logo: "AT&T",
      description:
        "Developed and maintained customer-facing web applications, collaborated with cross-functional teams, and mentored junior developers.",
      duration: "2020 - 2022",
      role: "Frontend Engineer",
    },
  ];

  return (
    <section id="experience" className="experience" ref={experienceRef}>
      <div className="container experience__container">
        <div className="experience__content">
          <h2 className="experience__title">Experience</h2>

          <div className="experience__grid">
            {companies.map((company, index) => (
              <div
                key={company.name}
                className="experience__card"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="experience__logo">
                  <span className="experience__logo-text">{company.logo}</span>
                </div>

                <div className="experience__details">
                  <h3 className="experience__company-name">{company.name}</h3>
                  <p className="experience__role">{company.role}</p>
                  <p className="experience__duration">{company.duration}</p>
                  <p className="experience__description">{company.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="experience__cta">
            <a href="#contact" className="btn btn--primary">
              Let&apos;s Connect
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
