"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { getAllData, deleteItem } from "@/lib/firebase";
import { BAIVIET_PATH, SANPHAM_PATH } from "@/lib/dataPaths";
import Loader from "@/components/Loader";
import PrivateLayout from "@/components/PrivateLayout";
import Swal from "sweetalert2";

export default function QuanlyPage() {
  const [tab, setTab] = useState(SANPHAM_PATH);
  const [baiviets, setBaiviet] = useState([]);
  const [sanphams, setSanPham] = useState([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const [bvData, spData] = await Promise.all([
        getAllData(BAIVIET_PATH),
        getAllData(SANPHAM_PATH),
      ]);
      if (bvData.length) setBaiviet(bvData);
      if (spData.length) setSanPham(spData);
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleDelete = async (id, path) => {
    const confirm = await Swal.fire({
      title: "Bạn có chắc muốn xóa?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    });
    if (!confirm.isConfirmed) return;

    let res = await deleteItem(id, path);
    if (res) {
      Swal.fire({ position: "top-end", icon: "success", title: "Đã xóa!", showConfirmButton: false, timer: 2000 });
      if (path === SANPHAM_PATH) {
        setSanPham((prev) => prev.filter((i) => i.id !== id));
      } else {
        setBaiviet((prev) => prev.filter((i) => i.id !== id));
      }
    }
  };

  if (isLoading) {
    return <PrivateLayout><Loader /></PrivateLayout>;
  }

  const items = tab === SANPHAM_PATH ? sanphams : baiviets;
  const itemPath = tab === SANPHAM_PATH ? "sanpham" : "baiviet";

  return (
    <PrivateLayout>
      <div id="quanly-content-container">
        <div className="quanly-content-main">
          <div className="quanly-tab">
            <button
              className="quanly-tab-btn"
              style={tab === SANPHAM_PATH ? { backgroundColor: "teal", color: "white" } : {}}
              onClick={() => setTab(SANPHAM_PATH)}
            >
              Sản Phẩm
            </button>
            <button
              className="quanly-tab-btn"
              style={tab === BAIVIET_PATH ? { backgroundColor: "teal", color: "white" } : {}}
              onClick={() => setTab(BAIVIET_PATH)}
            >
              Bài Viết
            </button>
            <Link
              className="quanly-tab-btn them"
              style={{ float: "right", backgroundColor: "orangered", color: "white" }}
              href={`/${itemPath}/them`}
            >
              {tab === SANPHAM_PATH ? "Thêm Sản Phẩm" : "Thêm Bài Viết"}
            </Link>
          </div>
          <div className="content-list">
            <h1>{tab === SANPHAM_PATH ? "Sản Phẩm" : "Bài Viết"}</h1>
            {items.map((item) => (
              <div className="content-item" key={item.id}>
                <div className="item-title">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.fileRef} alt={item.title} className="item-img" />
                  <h3>{item.title}</h3>
                </div>
                <div className="item-action">
                  <button
                    className="item-action-btn del"
                    onClick={() => handleDelete(item.id, tab)}
                  >
                    Xoá
                  </button>
                  <div className="action-btn-separator"></div>
                  <Link className="item-action-btn edit" href={`/${itemPath}/sua/${item.id}`}>
                    Chỉnh Sửa
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
}
