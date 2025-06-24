"use client";
import Link from "next/link";
import { useState, useMemo, useRef, useEffect } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  tags: { name: string; color: string }[];
  published: boolean;
  coverImage: string;
};

type SearchPostsProps = {
  posts: Post[];
  onClose: () => void;
};

export default function SearchPosts({ posts, onClose }: SearchPostsProps) {
  const [query, setQuery] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filtered = useMemo(() => {
    if (!query) return [];
    return posts.filter((post) =>
      post.title.toLowerCase().includes(query.toLowerCase())
    );
  }, [query, posts]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search posts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-4 py-2 rounded-lg border-none outline-none focus:ring-0"
      />
      <div className="w-full h-full overflow-y-scroll no-scrollbar">
        {filtered?.map((post) => (
          <Link
            href={post.slug}
            key={post.slug}
            className="w-full p-4 flex flex-col justify-center rounded-xl hover:bg-gray-100 transition-colors relative"
            onClick={onClose}
          >
            <p>{post.title}</p>
            <p className="text-sm text-gray-600">{post.excerpt}</p>
          </Link>
        ))}
        {query && filtered.length === 0 && (
          <div className="w-full p-8 flex items-center justify-center flex-col">
            <p className="text-lg text-gray-600">No results found</p>
          </div>
        )}
      </div>
    </>
  );
}
