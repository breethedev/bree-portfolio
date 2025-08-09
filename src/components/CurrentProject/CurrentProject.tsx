"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
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
                <Image
                  src="/images/the_melodi_project.png"
                  alt="Portfolio Website Screenshot"
                  fill
                  priority
                  loading="eager"
                  className="current-project__image"
                />
              </div>
            </div>

            <div className="current-project__details">
              <h3 className="current-project__project-title">the melodi project</h3>
              <p className="current-project__description">
                A case study for an in-progress monorepo building a javascript library for
                integrating ecommerce with music streaming apps. This project showcases a possible
                solution for increasing revenue for artists by allowing them to sell merchandise
                directly through their music streaming platforms.
              </p>

              <div className="current-project__tech">
                <span className="current-project__tech-tag">Next.js</span>
                <span className="current-project__tech-tag">TypeScript</span>
                <span className="current-project__tech-tag">CSS Modules</span>
                <span className="current-project__tech-tag">Responsive Design</span>
                <span className="current-project__tech-tag">NodeJs</span>
                <span className="current-project__tech-tag">
                  Full App Architecture & System Design
                </span>
              </div>

              <div className="current-project__actions">
                <Link href="/projects/the-melodi-project" className="btn btn--primary">
                  View Case Study
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
