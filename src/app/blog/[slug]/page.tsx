import Link from "next/link";
import { getPostData } from "@/app/lib/articles";
import s from "./post-page.module.css";
import { PageProps } from "../../../../.next/types/app/page";
import { Home } from "lucide-react";
import "./codeblocks.css";

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  return (
    <section className={`container ${s.post_page}`}>
      <div className={s.home_link__container}>
        <Home size={20} />
        <Link href={"/blog"} className={s.home_link}>
          Go to Home Page
        </Link>
      </div>

      <article
        className={s.post_page__content}
        dangerouslySetInnerHTML={{ __html: postData.contentHtml }}
      />
    </section>
  );
}
