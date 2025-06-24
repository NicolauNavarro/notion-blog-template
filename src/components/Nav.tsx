export const dynamic = "force-dynamic";

import { queryPosts } from "@/actions/posts";
import SearchWrapper from "./SearchWrapper";
import Link from "next/link";

export default async function Nav() {
  const posts = await queryPosts();

  return (
    <nav className=" select-none fixed px-4 md:px-12 w-screen h-12 overflow-hidden top-0 left-0 flex items-center justify-between z-20 md:bg-transparent md:backdrop-blur-none md:border-none bg-gray/15 backdrop-blur-md border border-gray-100 ">
      <Link href="/">
        <p className="text-sm text-gray-600">Notion blog</p>
      </Link>
      <SearchWrapper posts={posts} />
    </nav>
  );
}
