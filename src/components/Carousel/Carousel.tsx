"use client";

import s from "./Carousel.module.css";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export interface CarouselProps {
  items: React.ReactNode[];
  itemsPerPage?: number;
}

export function Carousel({ items, itemsPerPage = 3 }: CarouselProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (carouselRef.current) {
      const offset = currentPage * (100 / totalPages);
      carouselRef.current.style.transform = `translateX(-${offset}%)`;
    }
  }, [currentPage, totalPages]);

  const handleNext = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const handlePrev = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  return (
    <div className={s.carousel}>
      <button
        className={`${s.carousel__button} ${s.carousel__left_button}`}
        onClick={handlePrev}
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      <div className={s.carousel__viewport} ref={carouselRef}>
        {items.map((item, index) => (
          <div key={index} className={s.carousel__item} style={{ width: `${100 / itemsPerPage}%` }}>
            {item}
          </div>
        ))}
      </div>
      <button
        className={`${s.carousel__button} ${s.carousel__right_button}`}
        onClick={handleNext}
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
}
