"use client";

import { useEffect, useRef } from "react";
import GameTabs from "@/components/GameTabs/GameTabs";
import MemoryGame from "@/components/MemoryGame/MemoryGame";
import BlackJack from "@/components/BlackJack/BlackJack";
import "./Hero.css";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("hero__content--visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleResumeDownload = () => {
    // This would typically link to an actual resume file
    // For now, we'll just scroll to the contact section
    const contactSection = document.getElementById("contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="hero" ref={heroRef}>
      <div className="hero__container">
        <div className="hero__content">
          <div className="hero__left">
            <h1 className="hero__title">
              <span className="hero__title-line">Senior Frontend</span>
              <span className="hero__title-line">Engineer</span>
            </h1>

            <p className="hero__subtitle">
              Crafting exceptional user experiences with React, TypeScript, and modern web
              technologies
            </p>

            <div className="hero__cta">
              <a href="#contact" className="btn btn--primary btn--large">
                Book A Call
              </a>
              <button onClick={handleResumeDownload} className="btn btn--secondary btn--large">
                See Resume
              </button>
            </div>
          </div>

          <div className="hero__right">
            <GameTabs
              tabs={[
                { label: "Memory", render: () => <MemoryGame /> },
                { label: "Blackjack", render: () => <BlackJack /> },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="hero__background">
        <div className="hero__background-grid"></div>
      </div>

      <div className="hero__scroll-indicator">
        <span className="hero__scroll-text">Explore my work</span>
        <div className="hero__scroll-arrow"></div>
      </div>
    </section>
  );
}
