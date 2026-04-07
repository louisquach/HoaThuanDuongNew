import { SITE_URL } from "@/lib/constants";
import { getAllData } from "@/lib/firebase";

export default async function sitemap() {
  const baseUrl = SITE_URL;

  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/gioi-thieu`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/san-pham`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/san-pham/thuoc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/san-pham/thuc-pham-chuc-nang`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/tintuc-baiviet`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/lien-he`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic product pages
  let productPages = [];
  try {
    const products = await getAllData("sanpham");
    productPages = products.map((product) => ({
      url: `${baseUrl}/san-pham/${product.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    }));
  } catch (e) {
    console.error("Error fetching products for sitemap:", e);
  }

  // Dynamic article pages
  let articlePages = [];
  try {
    const articles = await getAllData("baiviet");
    articlePages = articles.map((article) => ({
      url: `${baseUrl}/tintuc-baiviet/${article.id}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));
  } catch (e) {
    console.error("Error fetching articles for sitemap:", e);
  }

  return [...staticPages, ...productPages, ...articlePages];
}
