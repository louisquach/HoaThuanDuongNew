import { SITE_NAME, SITE_URL, PHONE, EMAIL } from "@/lib/constants";

export default function JsonLd({ data }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: `Nhà Thuốc Đông Y ${SITE_NAME}`,
    description:
      "Nhà thuốc đông y - Y học cổ truyền - Phòng Chẩn trị y học cổ truyền Hoà Thuận Đường. Chuyên chẩn đoán điều trị và bốc thuốc đông y gia truyền.",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      streetAddress: "70 K2 Ấp Tân Phong",
      addressLocality: "Long Khánh",
      addressRegion: "Đồng Nai",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: "10.89386",
      longitude: "107.22517",
    },
    image: `${SITE_URL}/images/hoa-thuan-duong-logo.png`,
    priceRange: "$$",
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
      opens: "07:00",
      closes: "21:00",
    },
    sameAs: ["https://facebook.com/hoathuanduong"],
  };

  return <JsonLd data={data} />;
}

export function ProductJsonLd({ product }) {
  if (!product) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    image: product.fileRef,
    description: product.content
      ? product.content.replace(/<[^>]*>/g, "").slice(0, 200)
      : "",
    brand: {
      "@type": "Brand",
      name: SITE_NAME,
    },
    manufacturer: {
      "@type": "Organization",
      name: `Đông Y ${SITE_NAME}`,
    },
  };

  return <JsonLd data={data} />;
}

export function ArticleJsonLd({ article }) {
  if (!article) return null;
  const data = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    image: article.fileRef,
    datePublished: article.ngaytao,
    author: {
      "@type": "Organization",
      name: `Đông Y ${SITE_NAME}`,
    },
    publisher: {
      "@type": "Organization",
      name: `Đông Y ${SITE_NAME}`,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/hoa-thuan-duong-logo.png`,
      },
    },
    description: article.content
      ? article.content.replace(/<[^>]*>/g, "").slice(0, 200)
      : "",
  };

  return <JsonLd data={data} />;
}
