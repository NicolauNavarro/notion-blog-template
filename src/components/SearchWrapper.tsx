"use client";
import { useState, useRef, useEffect } from "react";
import SearchPosts from "./SearchPosts";
import { IoSearchOutline } from "react-icons/io5";

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

export default function SearchWrapper({ posts }: { posts: Post[] }) {
  const [open, setOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div>
      <IoSearchOutline
        onClick={() => setOpen(true)}
        className="text-gray-600 text-xl font-extrabold cursor-pointer"
      />

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center flex-col">
          <div
            ref={modalRef}
            className="bg-white p-4 rounded-xl shadow-xl max-w-3xl w-full h-[50vh] flex items-center flex-col overflow-hidden "
          >
            <SearchPosts posts={posts} onClose={() => setOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
