import s from "./blog.module.css";

export default function Blog() {
  return (
    <div className={s.blog}>
      <div className={s.blog_content}>
        <h1>The Things I Kinda Know</h1>

        <h3>A blog for a Sr. Frontend Engineers</h3>
      </div>
    </div>
  );
}
