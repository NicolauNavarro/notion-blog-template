"use server";

import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });

const databaseId = process.env.NOTION_DATABASE_ID || "";

const isoNow = new Date().toISOString(); // always UTC

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
        direction: "ascending",
      },
    ],
  });

  const posts = response.results.map((post) => ({
    title: post.properties.Title.title[0]?.plain_text || "",
    tags: post.properties.Tags.multi_select.map((tag) => tag.name),
    date: post.properties.Date.date?.start || "",
    slug: post.properties.Slug.rich_text[0]?.plain_text || "",
    excerpt: post.properties.Excerpt.rich_text[0]?.plain_text || "",
    published: post.properties.Published.checkbox,
    coverImage:
      post.properties["Cover Image"].files[0]?.file?.url ||
      post.properties["Cover Image"].files[0]?.external?.url,
  }));

  return posts;
}
