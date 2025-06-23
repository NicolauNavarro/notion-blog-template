"use server";
import {
  PageObjectResponse,
  BlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.NOTION_DATABASE_ID || "";

const isoNow = new Date().toISOString();

function isFullPageObject(obj: unknown): obj is PageObjectResponse {
  return typeof obj === "object" && obj !== null && "properties" in obj;
}

export async function queryPosts() {
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      and: [
        {
          property: "Published",
          checkbox: {
            equals: true,
          },
        },
        {
          property: "Date",
          date: {
            on_or_before: isoNow,
          },
        },
      ],
    },
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
  });

  const fullPages = response.results.filter(isFullPageObject);
  await updateMissingSlugs(fullPages);

  const posts = fullPages.map((post) => {
    const titleProperty = post.properties.Title;
    const tagsProperty = post.properties.Tags;
    const dateProperty = post.properties.Date;
    const slugProperty = post.properties.Slug;
    const excerptProperty = post.properties.Excerpt;
    const publishedProperty = post.properties.Published;
    const coverImageProperty = post.properties["Cover Image"];

    const id = post.id;

    const title =
      titleProperty.type === "title"
        ? titleProperty.title[0]?.plain_text || ""
        : "";

    const tags =
      tagsProperty.type === "multi_select"
        ? tagsProperty.multi_select.map((tag) => ({
            name: tag.name,
            color: tag.color,
          }))
        : [];

    const date =
      dateProperty.type === "date"
        ? formatDate(dateProperty.date?.start || "")
        : "";

    const slug =
      slugProperty.type === "rich_text"
        ? slugProperty.rich_text[0]?.plain_text ||
          title.toLowerCase().replace(/\s+/g, "-")
        : "";

    const excerpt =
      excerptProperty.type === "rich_text"
        ? excerptProperty.rich_text[0]?.plain_text || ""
        : "";

    const published =
      publishedProperty.type === "checkbox"
        ? publishedProperty.checkbox
        : false;

    const coverImage =
      coverImageProperty.type === "files" && coverImageProperty.files.length > 0
        ? coverImageProperty.files[0].type === "file"
          ? coverImageProperty.files[0].file.url
          : coverImageProperty.files[0].type === "external"
          ? coverImageProperty.files[0].external.url
          : ""
        : "";

    return {
      id,
      title,
      tags,
      date,
      slug,
      excerpt,
      published,
      coverImage,
    };
  });

  return posts;
}

function formatDate(date: string) {
  const newDate = new Date(date);
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[newDate.getMonth()];
  return `${day} ${month} ${year}`;
}

async function updateMissingSlugs(pages: PageObjectResponse[]) {
  for (const page of pages) {
    const slugProperty = page.properties.Slug;
    const titleProperty = page.properties.Title;

    const hasSlug =
      slugProperty.type === "rich_text" &&
      slugProperty.rich_text.length > 0 &&
      !!slugProperty.rich_text[0].plain_text;

    const title =
      titleProperty.type === "title"
        ? titleProperty.title[0]?.plain_text || ""
        : "";

    if (!hasSlug && title) {
      const generatedSlug = title.toLowerCase().replace(/\s+/g, "-");

      await notion.pages.update({
        page_id: page.id,
        properties: {
          Slug: {
            rich_text: [
              {
                type: "text",
                text: {
                  content: generatedSlug,
                },
              },
            ],
          },
        },
      });
    }
  }
}

export async function getPageContent(postId: string) {
  if (!postId) return null;

  const response = await notion.blocks.children.list({
    block_id: postId,
  });

  const blocks = response.results
    .map((block) => {
      if (!("type" in block)) return null;

      const id = block.id;
      const type = block.type;
      let content = "";

      switch (type) {
        case "paragraph": {
          const b = block as Extract<
            BlockObjectResponse,
            { type: "paragraph" }
          >;
          content = b.paragraph.rich_text.map((t) => t.plain_text).join("");
          break;
        }
        case "heading_1": {
          const b = block as Extract<
            BlockObjectResponse,
            { type: "heading_1" }
          >;
          content = b.heading_1.rich_text.map((t) => t.plain_text).join("");
          break;
        }
        case "heading_2": {
          const b = block as Extract<
            BlockObjectResponse,
            { type: "heading_2" }
          >;
          content = b.heading_2.rich_text.map((t) => t.plain_text).join("");
          break;
        }
        case "heading_3": {
          const b = block as Extract<
            BlockObjectResponse,
            { type: "heading_3" }
          >;
          content = b.heading_3.rich_text.map((t) => t.plain_text).join("");
          break;
        }
        case "bulleted_list_item": {
          const b = block as Extract<
            BlockObjectResponse,
            { type: "bulleted_list_item" }
          >;
          content = b.bulleted_list_item.rich_text
            .map((t) => t.plain_text)
            .join("");
          break;
        }
        case "numbered_list_item": {
          const b = block as Extract<
            BlockObjectResponse,
            { type: "numbered_list_item" }
          >;
          content = b.numbered_list_item.rich_text
            .map((t) => t.plain_text)
            .join("");
          break;
        }
        case "code": {
          const b = block as Extract<BlockObjectResponse, { type: "code" }>;
          content = b.code.rich_text.map((t) => t.plain_text).join("");
          break;
        }
        case "image": {
          const b = block as Extract<BlockObjectResponse, { type: "image" }>;
          content =
            b.image.type === "file"
              ? b.image.file.url
              : b.image.type === "external"
              ? b.image.external.url
              : "";
          break;
        }
        default:
          content = "";
      }

      return {
        id,
        type: type.charAt(0).toUpperCase() + type.slice(1),
        content,
      };
    })
    .filter(Boolean) as { id: string; type: string; content: string }[];

  return groupBlocksIntoSections(blocks);
}

function groupBlocksIntoSections(
  blocks: {
    id: string;
    type: string;
    content: string;
  }[]
) {
  const sections: {
    id: string;
    type: string;
    content: string;
  }[][] = [];

  let current: {
    id: string;
    type: string;
    content: string;
  }[] = [];

  for (const block of blocks) {
    if (block.type.toLowerCase() === "divider") {
      if (current.length > 0) {
        sections.push(current);
        current = [];
      }
    } else {
      current.push(block);
    }
  }

  if (current.length > 0) {
    sections.push(current);
  }

  return sections;
}

export async function getPostBySlug(slug: string) {
  const posts = await queryPosts();
  const post = posts.find((post) => post.slug === slug);
  return post;
}
