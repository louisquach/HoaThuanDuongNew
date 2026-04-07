"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getAllData } from "@/lib/firebase";
import { BAIVIET_PATH } from "@/lib/dataPaths";
import { ArticleJsonLd } from "@/components/JsonLd";
import Loader from "@/components/Loader";
import DOMPurify from "dompurify";
import { toTitleCase } from "@/lib/toTitleCase";

export default function BaivietSinglePage() {
  const params = useParams();
  const [baiviet, setBaiviet] = useState(undefined);
  const [baivietTuongtu, setBaivietTuongTu] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (params.baivietId) {
      const fetchData = async () => {
        let data = await getAllData(BAIVIET_PATH);
        if (data.length) {
          let found = data.find((item) => item.id === params.baivietId);
          setBaiviet(found);
          let others = data.filter((item) => item.id !== params.baivietId);
          setBaivietTuongTu(others);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [params.baivietId]);

  useEffect(() => {
    if (baiviet?.title) {
      document.title = `${baiviet.title} | Hoà Thuận Đường`;
    }
  }, [baiviet]);

  if (isLoading) {
    return <Loader />;
  }

  const sanitizedContent = baiviet ? DOMPurify.sanitize(baiviet.content) : "";

  return (
    <div id="baiviet-single-container">
      {baiviet ? (
        <>
          <ArticleJsonLd article={baiviet} />
          <article>
            <div className="baiviet-single-head">
              <h1>{toTitleCase(baiviet.title)}</h1>
              <span>
                <em>{baiviet.ngaytao}</em>
              </span>
            </div>
            <div className="baiviet-single-content">
              <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
            </div>
          </article>
        </>
      ) : (
        <div style={{ textAlign: "center", padding: "5rem" }}>
          <h1>Không tìm thấy bài viết</h1>
        </div>
      )}
      {baivietTuongtu.length > 0 && (
        <div className="baiviet-khac">
          <h3 style={{ gridColumn: "1 / -1" }}>Bài viết khác</h3>
          {baivietTuongtu.map((item, i) => (
            <Link href={`/tintuc-baiviet/${item.id}`} key={`${item.title}-${i}`}>
              <div className="baiviet-khac-container">
                <div
                  className="baiviet-khac-img"
                  style={{ backgroundImage: `url("${item.fileRef}")` }}
                  role="img"
                  aria-label={item.title}
                ></div>
                <div className="baiviet-khac-content">
                  <h3 className="baiviet-khac-title">{toTitleCase(item.title)}</h3>
                  <span>{item.ngaytao}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
