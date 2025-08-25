import fs from "fs";
import path from "path";
import matter from "gray-matter";
import remarkParse from "remark-parse";
import { unified } from "unified";
import rehypeHighlight from "rehype-highlight";
import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";

import type { BlogPost } from "../../types";
import moment from "moment";
import rehypeStringify from "rehype-stringify";

const articlesDirectory = path.join(process.cwd(), "src/articles");

export function getSortedPostsData(): BlogPost[] {
  const fileNames = fs.readdirSync(articlesDirectory);

  const allPostsData: BlogPost[] = fileNames.map((fileName) => {
    const id = fileName.replace(/\.md$/, "");

    const fullPath = path.join(articlesDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    const matterResult = matter(fileContents);
    return {
      id,
      title: matterResult.data.title,
      category: matterResult.data.category,
      date: matterResult.data.date,
      url: `/blog/${matterResult.data.slug || id}`,
    };
  });

  return allPostsData.sort((a, b) => {
    const format = "DD-MM-YYYY";
    const dataA = moment(a.date, format);
    const dataB = moment(b.date, format);

    if (dataA.isBefore(dataB)) {
      return -1;
    } else if (dataA.isAfter(dataB)) {
      return 1;
    } else {
      return 0;
    }
  });
}

export const getCategorizedPosts = (): Record<string, BlogPost[]> => {
  const sortedPosts = getSortedPostsData();
  const categorizedPosts: Record<string, BlogPost[]> = {};

  sortedPosts.forEach((post) => {
    if (!categorizedPosts[post.category]) {
      categorizedPosts[post.category] = [];
    }
    categorizedPosts[post.category].push(post);
  });
  return categorizedPosts;
};

export const getPostData = async (id: string): Promise<{ contentHtml: string; post: BlogPost }> => {
  const fullPath = path.join(articlesDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);
  const post: BlogPost = {
    id,
    title: matterResult.data.title,
    category: matterResult.data.category,
    date: moment(matterResult.data.date, "DD-MM-YYYY").format("MMMM DD YYYY"),
    url: `/blog/${id}`,
  };

  const processedContent = await unified()
    .use(remarkParse)
    .use(remarkRehype, {
      allowDangerousHtml: true,
    })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  return {
    contentHtml,
    post,
  };
};
