export const dynamic = "force-dynamic";

import { getPageContent } from "@/actions/posts";

import Heading_1 from "@/components/blocks/Heading_1";
import Heading_2 from "@/components/blocks/Heading_2";
import Paragraph from "@/components/blocks/Paragraph";

const componentMap: Record<string, React.ElementType> = {
  Heading_1,
  Heading_2,
  Paragraph,
};

export default async function Example() {
  const groupedSections = await getPageContent("regeneracion-ajolotes");
  return (
    <>
      <main className="overflow-hidden flex flex-col justify-center w-1/3 border-b-2 border-gray-200 pb-8">
        <p className="text-gray-600">2 Jan 2025</p>
        <h1 className="text-4xl leading-loose font-semibold">
          My Notion Blog Template
        </h1>
        <div className="w-full flex items-center gap-4 flex-wrap">
          <div className="h-6 px-4 rounded-full bg-blue-100 flex items-center justify-center">
            <p className="text-sm leading-1">Next.js</p>
          </div>

          <div className="h-6 px-4 rounded-full bg-purple-100 flex items-center justify-center">
            <p className="text-sm leading-1">Astro</p>
          </div>

          {/* <div className="h-6 px-4 rounded-full bg-green-100 flex items-center justify-center">
            <p className="text-sm leading-1">Express</p>
          </div>

          <div className="h-6 px-4 rounded-full bg-orange-100 flex items-center justify-center">
            <p className="text-sm leading-1">Node.js</p>
          </div>

          <div className="h-6 px-4 rounded-full bg-red-100 flex items-center justify-center">
            <p className="text-sm leading-1">React native</p>
          </div>

          <div className="h-6 px-4 rounded-full bg-pink-100 flex items-center justify-center">
            <p className="text-sm leading-1">Next.js</p>
          </div>

          <div className="h-6 px-4 rounded-full bg-gray-200 flex items-center justify-center">
            <p className="text-sm leading-1">Frontend UX/UI</p>
          </div> */}
        </div>

        <p className="mt-4 text-gray-600">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ullam
          dolorum, consequuntur harum amet dolorem eum veniam provident ipsam
          praesentium tempore reprehenderit minima eligendi placeat mollitia
          saepe quia iste in.
        </p>
      </main>

      {groupedSections?.map((section, idx) => (
        <section
          key={idx}
          className=" overflow-hidden flex flex-col justify-center gap-4 w-1/3"
        >
          {section.map((block) => {
            const BlockComponent = componentMap[block.type];
            if (!BlockComponent) return null;

            return (
              <BlockComponent key={block.id}>{block.content}</BlockComponent>
            );
          })}
        </section>
      ))}

    </>
  );
}
