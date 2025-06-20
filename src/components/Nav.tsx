import { IoSearchOutline } from "react-icons/io5";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className=" select-none fixed px-12 w-screen h-12 overflow-hidden top-0 left-0 flex items-center justify-between">
      <Link href="/">
        <p className="text-sm text-gray-600">Notion blog</p>
      </Link>
      <IoSearchOutline className="text-gray-600 text-xl font-extrabold cursor-pointer"/>
    </nav>

  );
}
