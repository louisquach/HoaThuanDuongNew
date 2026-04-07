"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getAllData } from "@/lib/firebase";
import { BAIVIET_PATH } from "@/lib/dataPaths";
import Separator from "@/components/Separator";
import Loader from "@/components/Loader";
import { toTitleCase } from "@/lib/toTitleCase";

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";

function stripHtml(html) {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim();
}

function getExcerpt(content, maxLen = 120) {
  const text = stripHtml(content);
  if (text.length <= maxLen) return text;
  return text.slice(0, maxLen).trimEnd() + "…";
}

export default function BaiVietPage() {
  const [baivietsKhac, setBaiviet] = useState([]);
  const [baimoi, setBaimoi] = useState(undefined);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      let data = await getAllData(BAIVIET_PATH);
      if (data.length) {
        setBaimoi(data[0]);
        let others = data.filter((baiviet) => baiviet.id !== data[0].id);
        setBaiviet(others);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div id="baiviet-page-container">
        <Loader />
      </div>
    );
  }

  if (!baimoi) {
    return (
      <>
        <Separator title="Tin Tức - Bài Viết" />
        <div id="baiviet-page-container">
          <h1 style={{ textAlign: "center", margin: "5rem auto" }}>Chưa có bài viết mới</h1>
        </div>
      </>
    );
  }

  return (
    <>
      <Separator title="Tin Tức - Bài Viết" />
      <div id="baiviet-page-container">
        <Link href={`/tintuc-baiviet/${baimoi.id}`} className="baiviet-hero">
          <Image
            src={baimoi.fileRef}
            alt={baimoi.title}
            fill
            sizes="100vw"
            style={{ objectFit: "cover" }}
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
          <div className="baiviet-hero-overlay">
            <span className="baiviet-hero-badge">Bài viết mới nhất</span>
            <h1 className="baiviet-hero-title">{toTitleCase(baimoi.title)}</h1>
            <time className="baiviet-hero-date">{baimoi.ngaytao}</time>
            {baimoi.content && (
              <p className="baiviet-hero-excerpt">{getExcerpt(baimoi.content)}</p>
            )}
            <span className="baiviet-hero-cta">Đọc tiếp →</span>
          </div>
        </Link>

        <div className="baiviet-grid">
          {baivietsKhac.map((baiviet, i) => {
            if (!baiviet) return null;
            return (
              <Link
                href={`/tintuc-baiviet/${baiviet.id}`}
                className="baiviet-card"
                key={`${baiviet.title}-${i}`}
              >
                <div className="baiviet-card-img">
                  {baiviet.fileRef && baiviet.fileRef.length > 0 && (
                    <Image
                      src={baiviet.fileRef}
                      alt={baiviet.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      style={{ objectFit: "cover" }}
                      loading="lazy"
                      placeholder="blur"
                      blurDataURL={BLUR_PLACEHOLDER}
                    />
                  )}
                </div>
                <div className="baiviet-card-content">
                  <h2 className="baiviet-card-title">{toTitleCase(baiviet.title)}</h2>
                  <time className="baiviet-card-date">{baiviet.ngaytao}</time>
                  {baiviet.content && (
                    <p className="baiviet-card-excerpt">{getExcerpt(baiviet.content)}</p>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
