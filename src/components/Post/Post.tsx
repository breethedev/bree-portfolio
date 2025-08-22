import { BlogPost } from "@/types";
import s from "./Post.module.css";
import Link from "next/link";

export const Post = ({ category, title, date, url }: BlogPost) => {
  return (
    <Link href={url}>
      <div className={s.post}>
        <div className={s.post__title}>{title}</div>
        <p className={s.post__category}>{category}</p>
        <p className={s.post__date}>{date}</p>
      </div>
    </Link>
  );
};
