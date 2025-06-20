import { queryPosts } from "@/actions/posts";
import Link from "next/link";

export default async function Home() {
  const response = await queryPosts();
  console.log(response);
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

      <Link
        href="/"
        className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3 rounded-xl p-4 hover:bg-gray-100 transition-colors box-content relative"
      >
        <p className="text-sm text-gray-600 absolute right-4 top-4 h-4 flex items-center">
          5 Jun 2025
        </p>
        <h2 className="text-2xl font-medium">The process</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          nesciunt consectetur aspernatur natus sunt magnam eos, eum blanditiis
          maxime dolor ipsa voluptatem quia explicabo architecto error, esse
          cupiditate?
        </p>
      </Link>

      <Link
        href="/"
        className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3 rounded-xl p-4 hover:bg-gray-100 transition-colors box-content relative"
      >
        <p className="text-sm text-gray-600 absolute right-4 top-4 h-4 flex items-center">
          30 Apr 2025
        </p>
        <h2 className="text-2xl font-medium">Why AI is taking over all jobs</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          nesciunt consectetur aspernatur natus sunt magnam eos, eum blanditiis
          maxime dolor ipsa voluptatem quia explicabo architecto error, esse
          cupiditate?
        </p>
      </Link>

      <Link
        href="/"
        className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3 rounded-xl p-4 hover:bg-gray-100 transition-colors box-content relative"
      >
        <p className="text-sm text-gray-600 absolute right-4 top-4 h-4 flex items-center">
          19 Apr 2025
        </p>
        <h2 className="text-2xl font-medium">Discipline is key</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          nesciunt consectetur aspernatur natus sunt magnam eos, eum blanditiis
          maxime dolor ipsa voluptatem quia explicabo architecto error, esse
          cupiditate?
        </p>
      </Link>

      <Link
        href="/"
        className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3 rounded-xl p-4 hover:bg-gray-100 transition-colors box-content relative"
      >
        <p className="text-sm text-gray-600 absolute right-4 top-4 h-4 flex items-center">
          7 Feb 2025
        </p>
        <h2 className="text-2xl font-medium pr-28">
          The untold story about vaccines and covid 19 reatons for communism
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          nesciunt consectetur aspernatur natus sunt magnam eos, eum blanditiis
          maxime dolor ipsa voluptatem quia explicabo architecto error, esse
          cupiditate?
        </p>
      </Link>

      <Link
        href="/"
        className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3 rounded-xl p-4 hover:bg-gray-100 transition-colors box-content relative"
      >
        <p className="text-sm text-gray-600 absolute right-4 top-4 h-4 flex items-center">
          28 Jan 2025
        </p>
        <h2 className="text-2xl font-medium pr-28">
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Animiadipisicing.
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Animi
          nesciunt consectetur aspernatur natus sunt magnam eos, eum blanditiis
          maxime dolor ipsa voluptatem quia explicabo architecto error, esse
          cupiditate?
        </p>
      </Link>
    </>
  );
}
