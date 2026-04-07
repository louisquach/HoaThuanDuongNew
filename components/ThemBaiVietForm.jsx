"use client";

import { useState, useEffect } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { addData, getFile, updateData, uploadFile, getDataById } from "@/lib/firebase";
import { BAIVIET_PATH } from "@/lib/dataPaths";
import { getDate } from "@/lib/getDate";
import TextEditor from "@/components/TextEditor";
import Loader from "@/components/Loader";
import PrivateLayout from "@/components/PrivateLayout";
import Swal from "sweetalert2";

export default function ThemBaiVietPage() {
  const [data, setData] = useState({
    title: "",
    content: "",
    noibat: true,
    ngaytao: "",
    filename: "",
    fileRef: "",
  });
  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const params = useParams();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (params.baivietId && pathname.includes("/sua/")) {
      setLoading(true);
      setEdit(true);
      const fetchData = async () => {
        let doc = await getDataById(BAIVIET_PATH, params.baivietId);
        setData({
          title: doc.title,
          content: doc.content,
          noibat: doc.noibat || true,
          ngaytao: doc.ngaytao || "",
          filename: doc.filename || "",
          fileRef: doc.fileRef || "",
        });
        setLoading(false);
      };
      fetchData();
    }
  }, [params.baivietId, pathname]);

  useEffect(() => {
    if (data.filename !== "" && data.fileRef === "") {
      const fetchUrl = async () => {
        let url = await getFile(BAIVIET_PATH, data.filename);
        if (url) {
          setData((prev) => ({ ...prev, fileRef: url }));
        }
      };
      fetchUrl();
    }
  }, [data.filename, data.fileRef]);

  const handleUploadFile = async (e) => {
    setLoading(true);
    try {
      let file = e.target.files[0];
      const res = await uploadFile(BAIVIET_PATH, file.name, file);
      if (res.success) {
        setData((prev) => ({ ...prev, filename: res.name, fileRef: res.path }));
      }
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let obj = { ...data, ngaytao: getDate() };

    let res = false;
    if (isEdit) {
      res = await updateData(params.baivietId, BAIVIET_PATH, obj);
    } else {
      res = await addData(BAIVIET_PATH, obj);
    }
    if (res) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: isEdit ? "Cập nhật thành công!" : "Thêm bài viết thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => router.push("/quanly"), 2000);
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <PrivateLayout>
        <div id="them-bai-viet-container">
          <Loader />
        </div>
      </PrivateLayout>
    );
  }

  return (
    <PrivateLayout>
      <div id="them-bai-viet-container">
        <div className="them-bai-viet-main">
          <h1>{isEdit ? "Cập Nhật Bài Viết" : "Thêm Bài Viết"}</h1>
          <form id="them-bai-viet-form">
            <div className="content-editor-container">
              <label htmlFor="title" className="form-label">Tiêu đề:</label>
              <input name="title" id="title" value={data.title} onChange={handleInputChange} />
            </div>
            <div className="content-editor-container">
              <label htmlFor="file" className="form-label">Hình Ảnh:</label>
              <input type="file" name="baiviet-img" id="file" onChange={handleUploadFile} />
              {data.filename !== "" && data.fileRef !== "" && (
                <div style={{ display: "flex", alignItems: "center", marginTop: "5px" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={data.fileRef} height={50} alt={data.filename} />
                  <span style={{ marginLeft: "5px", fontSize: ".8em", color: "black" }}>
                    {data.filename}
                  </span>
                </div>
              )}
            </div>
            <div className="content-editor-container">
              <label className="form-label">Nội dung:</label>
              <TextEditor
                setContent={(value) => setData((prev) => ({ ...prev, content: value }))}
                content={data.content}
              />
            </div>
            <div className="content-editor-btn-container">
              <Link className="editor-btn cancel" href="/quanly">Huỷ</Link>
              <button className="editor-btn save" onClick={handleSubmit}>
                {isEdit ? "Cập Nhật" : "Thêm Bài Viết"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </PrivateLayout>
  );
}
