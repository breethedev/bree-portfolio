import s from "./blog.module.css";
import { getSortedPostsData } from "../lib/articles";
import { Post } from "@/components/Post/Post";

export default function Blog() {
  const posts = getSortedPostsData();

  return (
    <section className={`${s.blog} container`}>
      <div className={s.blog__header}>
        <h1>The Things I Kinda Know</h1>

        <h3>A Blog for a Sr. Frontend Engineers</h3>
      </div>

      <div className={s.posts_container}>
        {posts.map((post) => (
          <Post key={post.id} {...post} />
        ))}
      </div>
    </section>
  );
}
