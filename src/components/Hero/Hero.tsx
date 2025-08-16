"use client";

import { useEffect, useRef } from "react";
import GameTabs from "@/components/GameTabs/GameTabs";
import MemoryGame from "@/components/MemoryGame/MemoryGame";
import BlackJack from "@/components/BlackJack/BlackJack";
import s from "./Hero.module.css";
import { GAMES, HERO, SELF } from "@/constants";

export default function Hero() {
  const positions = SELF.position.split(" ");

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

  return (
    <section id="home" className={s["hero"]} ref={heroRef}>
      <div className={s["hero__container"]}>
        <div className={s["hero__content"]}>
          <div className={s["hero__left"]}>
            <h1 className={s["hero__title"]}>
              <span className={s["hero__title-line"]}>{`${positions[0]} ${positions[1]}`}</span>
              <span className={s["hero__title-line"]}>{positions[2]}</span>
            </h1>

            <p className={s["hero__subtitle"]}>{HERO.subtitle}</p>

            <div className={s["hero__cta"]}>
              <a href="#contact" className={`${s["btn"]} ${s["btn--primary"]} ${s["btn--large"]}`}>
                {HERO.cta_primary}
              </a>
              <a
                href={HERO.resume_link}
                download="resume.pdf"
                className={`${s["btn"]} ${s["btn--secondary"]} ${s["btn--large"]}`}
              >
                {HERO.cta_secondary}
              </a>
            </div>
          </div>

          <div className={s["hero__right"]}>
            <GameTabs
              tabs={[
                { label: GAMES.memory.title, render: () => <MemoryGame /> },
                { label: GAMES.blackjack.title, render: () => <BlackJack /> },
              ]}
            />
          </div>
        </div>
      </div>

      <div className={s["hero__background"]}>
        <div className={s["hero__background-grid"]}></div>
      </div>

      <div className={s["hero__scroll-indicator"]}>
        <span className={s["hero__scroll-text"]}>{HERO.see_my_work}</span>
        <div className={s["hero__scroll-arrow"]}></div>
      </div>
    </section>
  );
}
