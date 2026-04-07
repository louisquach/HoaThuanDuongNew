"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { getDataByPage } from "@/lib/firebase";
import { toTitleCase } from "@/lib/toTitleCase";

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";

export default function SanPhamSection() {
  const [sanphams, setSanPham] = useState([]);

  useEffect(() => {
    const getSanpham = async () => {
      let response = await getDataByPage("sanpham", 16, "date");
      if (response.data) {
        setSanPham(response.data);
      }
    };
    getSanpham();
  }, []);

  return (
    <section id="trangchu-sanpham">
      <div className="sanpham-container">
        {sanphams.map((item, i) => (
          <Link
            className="sanpham-card"
            key={`${i}-${item.title}`}
            href={`/san-pham/${item.id}`}
          >
            <div className="sanpham-card-img">
              <Image
                src={item.fileRef}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 50vw, 25vw"
                style={{ objectFit: "contain" }}
                loading="lazy"
                placeholder="blur"
                blurDataURL={BLUR_PLACEHOLDER}
              />
              {item.noibat && <span className="sanpham-badge">Hot</span>}
            </div>
            <div className="sanpham-card-overlay">
              <span>Xem chi tiết</span>
            </div>
            <h4>{toTitleCase(item.title)}</h4>
          </Link>
        ))}
      </div>
      <div id="xemsp-d">
        <Link href="/san-pham/thuoc" id="xemsp-btn">
          Xem Tất Cả
        </Link>
      </div>
    </section>
  );
}
