"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import "./CurrentProject.css";

export default function CurrentProject() {
  const projectRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("current-project__content--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (projectRef.current) {
      observer.observe(projectRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="current-project" className="current-project" ref={projectRef}>
      <div className="container current-project__container">
        <div className="current-project__content">
          <h2 className="current-project__title">Current Project</h2>

          <div className="current-project__card">
            <div className="current-project__image">
              <div className="current-project__image-placeholder">
                <span className="current-project__image-text">Project Image</span>
              </div>
            </div>

            <div className="current-project__details">
              <h3 className="current-project__project-title">Portfolio Website</h3>
              <p className="current-project__description">
                A modern, responsive portfolio website built with Next.js, TypeScript, and CSS
                Modules. This project showcases my expertise in frontend development, accessibility,
                and responsive design.
              </p>

              <div className="current-project__tech">
                <span className="current-project__tech-tag">Next.js</span>
                <span className="current-project__tech-tag">TypeScript</span>
                <span className="current-project__tech-tag">CSS Modules</span>
                <span className="current-project__tech-tag">Responsive Design</span>
              </div>

              <div className="current-project__actions">
                <Link href="/projects/the-melodi-project" className="btn btn--primary">
                  View Case Study
                </Link>
                <Link
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--secondary"
                >
                  View Code
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
