import s from "./Card.module.css";
import Link from "next/link";

export interface CardProps {
  title: string;
  description: string;
  linkUrl: string;
}

export const Card = ({ title, description, linkUrl }: CardProps) => {
  return (
    <Link href={linkUrl} className={s.card} target="_blank" rel="noopener noreferrer">
      <div className={s.card__content}>
        <h3 className={s.card__title}>{title}</h3>
        <p className={s.card__description}>{description}</p>
      </div>
    </Link>
  );
};
