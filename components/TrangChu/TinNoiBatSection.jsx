"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDataByPage } from "@/lib/firebase";
import Loader from "@/components/Loader";
import { toTitleCase } from "@/lib/toTitleCase";

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

export default function TinNoiBatSection() {
  const [baiviet, setBaiviet] = useState([]);

  useEffect(() => {
    const getBaiViet = async () => {
      const response = await getDataByPage("baiviet", 5, "date", "desc");
      if (response.data.length) {
        setBaiviet(response.data);
      }
    };
    getBaiViet();
  }, []);

  if (!baiviet.length) {
    return <Loader />;
  }

  const hero = baiviet[0];
  const sidebar = baiviet.slice(1);

  return (
    <section id="trangchu-tinnoibat">
      <div className="news-grid">
        <Link href={`/tintuc-baiviet/${hero.id}`} className="news-hero">
          <Image
            src={hero.fileRef}
            alt={hero.title}
            fill
            sizes="(max-width: 768px) 100vw, 60vw"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="news-hero-overlay">
            <span className="news-badge">Mới nhất</span>
            <h3 className="news-hero-title">{toTitleCase(hero.title)}</h3>
            <span className="news-hero-date">{hero.ngaytao}</span>
          </div>
        </Link>

        <div className="news-sidebar">
          {sidebar.map((item) => (
            <Link
              href={`/tintuc-baiviet/${item.id}`}
              className="news-sidebar-item"
              key={item.id}
            >
              <div className="news-sidebar-thumb">
                <Image
                  src={item.fileRef}
                  alt={item.title}
                  width={120}
                  height={80}
                  style={{ objectFit: "cover", width: "100%", height: "100%" }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </div>
              <div className="news-sidebar-info">
                <h4 className="news-sidebar-title">{toTitleCase(item.title)}</h4>
                <span className="news-sidebar-date">{item.ngaytao}</span>
              </div>
            </Link>
          ))}
          <Link href="/tintuc-baiviet" className="news-view-all">
            Xem tất cả bài viết →
          </Link>
        </div>
      </div>
    </section>
  );
}
