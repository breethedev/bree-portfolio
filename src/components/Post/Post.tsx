import { BlogPost } from "@/types";
import s from "./Post.module.css";
import Link from "next/link";

export const Post = ({ category, title, date, url }: BlogPost) => {
  return (
    <div className={s.post}>
      <Link href={url}>{title}</Link>
      <p>{category}</p>
      <p>{date}</p>
    </div>
  );
};
