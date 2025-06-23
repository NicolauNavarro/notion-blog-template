import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className=" select-none fixed px-4 md:px-12 w-screen h-12 overflow-hidden top-0 left-0 flex items-center justify-between z-20 md:bg-transparent md:backdrop-blur-none md:border-none bg-gray/15 backdrop-blur-md border border-gray-100 ">
      <Link href="/">
        <p className="text-sm text-gray-600">Notion blog</p>
      </Link>
      <IoSearchOutline className="text-gray-600 text-xl font-extrabold cursor-pointer" />
    </nav>
  );
}
