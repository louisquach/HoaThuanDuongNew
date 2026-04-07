"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getAllData } from "@/lib/firebase";
import { SANPHAM_PATH } from "@/lib/dataPaths";
import { ProductJsonLd } from "@/components/JsonLd";
import Loader from "@/components/Loader";
import DOMPurify from "dompurify";
import { toTitleCase } from "@/lib/toTitleCase";

const BLUR_PLACEHOLDER = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PC9zdmc+";

export default function SanphamSinglePage() {
  const params = useParams();
  const [sanpham, setSanpham] = useState(undefined);
  const [sanphamTuongtu, setSanPhamTuongTu] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (params.sanphamId) {
      const fetchData = async () => {
        let data = await getAllData(SANPHAM_PATH);
        if (data.length) {
          let findSp = data.find((item) => item.id === params.sanphamId);
          setSanpham(findSp);
          let others = data.filter((item) => item.id !== params.sanphamId);
          setSanPhamTuongTu(others);
        }
        setLoading(false);
      };
      fetchData();
    }
  }, [params.sanphamId]);

  useEffect(() => {
    if (sanpham?.title) {
      document.title = `${sanpham.title} | Hoà Thuận Đường`;
    }
  }, [sanpham]);

  if (isLoading) {
    return <Loader />;
  }

  if (!sanpham) {
    return (
      <div id="sanpham-single-container">
        <div className="sanpham-single-title">
          <h1 className="sanpham-title">Không Tìm Thấy Sản Phẩm</h1>
        </div>
      </div>
    );
  }

  const sanitizedContent = DOMPurify.sanitize(sanpham.content);

  return (
    <div id="sanpham-single-container">
      <ProductJsonLd product={sanpham} />
      <div className="sanpham-single-title">
        <h1 className="sanpham-title">{toTitleCase(sanpham.title)}</h1>
      </div>
      <div id="sanpham-single-content">
        <div>
          <Image
            src={sanpham.fileRef}
            alt={sanpham.title}
            className="hinh-san-pham"
            width={500}
            height={500}
            style={{ width: "100%", height: "auto" }}
            priority
            placeholder="blur"
            blurDataURL={BLUR_PLACEHOLDER}
          />
        </div>
        <div className="sp-content-main">
          <h3 className="sp-mota">Mô Tả Sản Phẩm</h3>
          <div dangerouslySetInnerHTML={{ __html: sanitizedContent }}></div>
        </div>
      </div>
      <div id="sanpham-tuongtu-container">
        <h3 className="sp-tuongtu">Sản Phẩm Tương Tự</h3>
        <div id="sp-tuongtu-sp">
          {sanphamTuongtu.map((item, i) => (
            <div className="sp-img-container" key={`${i}-${item.title}`}>
              <Link href={`/san-pham/${item.id}`} className="sp-img-ctn">
                <Image
                  src={item.fileRef}
                  alt={item.title}
                  className="sp-tt"
                  width={200}
                  height={200}
                  style={{ objectFit: "contain" }}
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_PLACEHOLDER}
                />
              </Link>
              <div className="sp-tuongtu-title">
                <h5>{toTitleCase(item.title)}</h5>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
