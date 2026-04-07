"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { getAllData } from "@/lib/firebase";
import Separator from "@/components/Separator";
import Loader from "@/components/Loader";
import { toTitleCase } from "@/lib/toTitleCase";

const SANPHAM_PATH = "sanpham";
const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";

export default function SanPhamPage() {
  const [sanphams, setSanPham] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const data = await getAllData(SANPHAM_PATH);
      const thuoc = [];
      const tpcn = [];
      if (data.length) {
        data.forEach((item) => {
          if (item.isThuoc !== undefined && item.isThuoc) {
            thuoc.push(item);
          } else {
            tpcn.push(item);
          }
        });
        if (pathname === "/san-pham") {
          setSanPham(data);
        } else if (pathname === "/san-pham/thuoc") {
          setSanPham(thuoc);
        } else if (pathname === "/san-pham/thuc-pham-chuc-nang") {
          setSanPham(tpcn);
        }
      }
      setLoading(false);
    };
    fetchData();
  }, [pathname]);

  if (isLoading) {
    return (
      <section id="sanpham-page">
        <Loader />
      </section>
    );
  }

  return (
    <section id="sanpham-page">
      <div id="sanpham-container-menu">
        <div className="sanpham-menu-container">
          <div className="sanpham-menu-item" onClick={() => router.push("/san-pham/thuoc")}>
            Thuốc Lưu Hành Nội Bộ
          </div>
          <div
            className="sanpham-menu-item"
            onClick={() => router.push("/san-pham/thuc-pham-chuc-nang")}
          >
            Thực Phẩm Chức Năng
          </div>
        </div>
      </div>
      <Separator title="Sản Phẩm" />
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
    </section>
  );
}
