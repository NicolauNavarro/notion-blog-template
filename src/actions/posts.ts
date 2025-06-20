"use server";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
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

  const posts = response.results.filter(isFullPageObject).map((post) => {
    const titleProperty = post.properties.Title;
    const tagsProperty = post.properties.Tags;
    const dateProperty = post.properties.Date;
    const slugProperty = post.properties.Slug;
    const excerptProperty = post.properties.Excerpt;
    const publishedProperty = post.properties.Published;
    const coverImageProperty = post.properties["Cover Image"];

    const title =
      titleProperty.type === "title"
        ? titleProperty.title[0]?.plain_text || ""
        : "";

    const tags =
      tagsProperty.type === "multi_select"
        ? tagsProperty.multi_select.map((tag) => tag.name)
        : [];

    const date =
      dateProperty.type === "date"
        ? formatDate(dateProperty.date?.start || "")
        : "";

    const slug =
      slugProperty.type === "rich_text"
        ? slugProperty.rich_text[0]?.plain_text || ""
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
