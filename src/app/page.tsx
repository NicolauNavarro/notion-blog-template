export const dynamic = "force-dynamic";

import { queryPosts } from "@/actions/posts";
import Link from "next/link";

export default async function Home() {
  const posts = await queryPosts();
  return (
    <>
      <main className="overflow-hidden flex flex-col justify-center w-1/3 border-b-2 border-gray-200 pb-8">
        <p className="text-gray-600">Nicolau Navarro Arroyo</p>
        <h1 className="text-4xl leading-loose font-semibold">
          My Notion Blog Template
        </h1>
        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
          dolorum, consequuntur harum amet dolorem eum veniam provident ipsam
          praesentium tempore reprehenderit minima eligendi placeat mollitia
          saepe quia iste in.
        </p>
      </main>

      {posts.map((post) => (
        <Link
          key={post.slug}
          href={`/${post.slug}`}
          className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3 rounded-xl p-4 hover:bg-gray-100 transition-colors box-content relative"
        >
          <p className="text-sm text-gray-600 absolute right-4 top-4 h-4 flex items-center">
            {post.date}
          </p>
          <h2 className="text-2xl font-medium pr-28">{post.title}</h2>
          <p>{post.excerpt}</p>
        </Link>
      ))}
    </>
  );
}
