import { SITE_URL } from "@/lib/constants";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/quanly/", "/sanpham/them", "/sanpham/sua/", "/baiviet/them", "/baiviet/sua/", "/_admin"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
