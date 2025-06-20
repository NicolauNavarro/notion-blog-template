
# notion-blog-template

A clean, fully functional **Next.js blog starter** powered by **Notion API**.
Publish posts by adding them in your Notion workspace—no backend needed.

---

## Features

* Fetch and render blog posts directly from a Notion database
* Dynamic routing with friendly URLs based on post slugs
* Responsive, mobile-friendly design using Tailwind CSS
* Basic SEO with meta tags
* Easy setup with environment variables
* Ready to deploy on Vercel with a single click
* Supports draft/publish workflow with scheduled release dates

---

## Demo

\[Live demo link – add yours after deploying]

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/NicolauNavarro/notion-blog-template.git
cd notion-blog-template
```

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Setup Notion integration

* Create a Notion integration and share your blog database with it
* Copy the **integration token** and **database ID**

### 4. Configure environment variables

Create a `.env.local` file in the root:

```env
NOTION_TOKEN=your_notion_integration_token
NOTION_DATABASE_ID=your_database_id
```

### 5. Run development server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to see your blog.

---

## Deployment

Deploy instantly on Vercel using the button below:

[![Deploy on Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/notion-blog-template)

---

## How to publish posts

1. Add a new row to your Notion database  
2. Fill in **Title**, **Slug**, **Date**, and check **Published** when ready  
3. Your post will appear on the blog homepage after refreshing

---

## Notion Database Template

To get started quickly, **duplicate this Notion database template** for your blog posts:

[📋 Duplicate Notion Blog Database Template](https://www.notion.so/your-notion-template-link)

This template includes all required fields like **Title**, **Slug**, **Published**, **Date**, **Tags**, and **Excerpt** already set up.

---

## License

MIT © Your Name

---

## Want help?

Open an issue or DM me on Twitter \[@yourhandle].

---

---

