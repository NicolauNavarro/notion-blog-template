export const dynamic = "force-dynamic";

import { getPageContent, getPostBySlug } from "@/actions/posts";
import { notFound } from "next/navigation";

const componentMap: Record<string, React.FC<{ children: React.ReactNode }>> = {
  Heading_1: ({ children }) => (
    <h1 className="text-2xl font-medium">{children}</h1>
  ),
  Heading_2: ({ children }) => (
    <h2 className="text-xl font-medium">{children}</h2>
  ),
  Heading_3: ({ children }) => (
    <h3 className="text-lg font-medium">{children}</h3>
  ),
  Paragraph: ({ children }) => <p>{children}</p>,
  Code: ({ children }) => (
    <pre className="bg-gray-100 p-2 rounded text-sm">{children}</pre>
  ),
  Bulleted_list_item: ({ children }) => (
    <li className="list-disc ml-5">{children}</li>
  ),
  Numbered_list_item: ({ children }) => (
    <li className="list-decimal ml-5">{children}</li>
  ),
  Image: ({ children }) => (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={children as string}
      alt="Post image"
      className="my-4 rounded-lg"
    />
  ),
};

const tagColorMap: Record<string, string> = {
  gray: "bg-gray-200",
  brown: "bg-amber-100",
  orange: "bg-orange-100 ",
  yellow: "bg-yellow-100",
  green: "bg-green-100",
  blue: "bg-blue-100 ",
  purple: "bg-purple-100 ",
  pink: "bg-pink-100 ",
  red: "bg-red-100 ",
  default: "bg-neutral-300 ",
};

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const { params } = props;

  const post = await getPostBySlug(params.slug);
  if (!post) {
    notFound();
  }
  const groupedSections = await getPageContent(post.id);
  console.log(groupedSections);
  return (
    <>
      <main className="overflow-hidden flex flex-col justify-center w-1/3 border-b-2 border-gray-200 pb-8">
        <p className="text-gray-600">{post.date}</p>
        <h1 className="text-4xl font-semibold py-4">{post.title}</h1>
        <div className="w-full flex items-center gap-4 flex-wrap select-none">
          {post.tags.map((tag) => {
            const colorClass = tagColorMap[tag.color] || tagColorMap.default;

            return (
              <div
                className={`h-6 px-4 rounded-full ${colorClass} flex items-center justify-center`}
                key={tag.name}
              >
                <p className="text-sm leading-1">{tag.name}</p>
              </div>
            );
          })}
        </div>

        <p className="mt-4 text-gray-600">{post.excerpt}</p>
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
