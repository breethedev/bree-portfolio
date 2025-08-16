import Link from "next/link";
import { getPostData } from "@/app/lib/articles";
import s from "./post-page.module.css";
import { Home } from "lucide-react";

export default async function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <section className={`container ${s.post_page}`}>
      <div>
        <Link href={"/blog"} className={s.home_link}>
          Go to Home Page
          <Home size={20} />
        </Link>
      </div>

      <article
        className={s.post_page__content}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </section>
  );
}
