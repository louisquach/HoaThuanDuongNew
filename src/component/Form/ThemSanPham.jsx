import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Checkbox, Form } from "semantic-ui-react";
import Loader from "../Loader/Loader";
import {
  addData,
  getFile,
  updateData,
  uploadFile,
} from "../../firebase/firebase";
import { getDate } from "../../utils/getDate";
import "./ThemSanPham.scss";
import Swal from "sweetalert2";

const SanPhamForm = (props) => {
  const { isEdit, sanphamID, content } = props;
  const [data, setData] = useState({
    title: "",
    congdung: "",
    giaban: "",
    giakhuyenmai: "",
    noibat: true,
    ngaytao: "",
    filename: "",
    fileRef: "",
    thanhphan: "",
    isThuoc: true
  });
  const [loading, setLoading] = useState(false);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    if (isEdit && sanphamID && content) {
      setLoading(true);
      setData({
        title: content.title,
        congdung: content.congdung,
        giaban: content.giaban,
        giakhuyenmai: content.giakhuyenmai,
        filename: content.filename ? content.filename : "",
      });
      setLoading(false);
    }
  }, [isEdit, sanphamID, content]);

  useEffect(() => {
    if (data.filename !== "" || data.fileRef === "") {
      let res = async () => {
        let url = await getFile("sanpham", data.filename);
        if (url) {
          let obj = { ...data };
          obj.fileRef = url;
          setFileUrl(url);
          setData(obj);
        }
      };
      res();
    }
  }, [data.filename]);

  if (loading) {
    return <section id='sanpham-page'>
        <Loader />
    </section>
}
  const handleUploadFile = async (e) => {
    setLoading(true);
    try {
      let file = e.target.files[0];
      const res = await uploadFile("sanpham", file.name, file);
      if (res.success) {
        let obj = data;
        obj.filename = res.name;
        obj.fileRef = res.path;
        setData(obj);
        setFileUrl(res.path);
      }
    } catch (e) {
      console.log(e.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const name = e.currentTarget.id;
    const value = e.currentTarget.value;
    setData({
      ...data,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    let obj = data;
    let date = getDate();
    obj.ngaytao = date;
    let res = false;
    if (isEdit) {
      res = await updateData(sanphamID, "sanpham", obj);
    } else {
      res = await addData("sanpham", obj);
    }
    if (res) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Lưu thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.href = "/sanpham/thuc-pham-chuc-nang";
      }, 2000);
    }
    setLoading(false);
  };

  const handleCheckboxChange = (e, data) => {
    console.log(data, "check");
  }
  return (
    <div className="san-pham-noi-bat" style={{ margin: "15rem 0 0" }}>
      <Form id={"themsanpham_form"}>
        <h1>{isEdit ? "THAY ĐỔI NỘI DUNG SẢN PHẨM" : "THÊM SẢN PHẨM MỚI"}</h1>
        <Form.Field>
          <Form.Input
            className={"themsanpham_input"}
            fluid
            id={"title"}
            label={"Tên Sản Phẩm"}
            value={data.title}
            placeholder={"Tên sản phẩm"}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
          <Form.Input
            className={"themsanpham_input"}
            fluid
            type="file"
            id={"file"}
            onChange={handleUploadFile}
            label={"Tên Sản Phẩm"}
            placeholder={data.filename ? data.filename : "Tên sản phẩm"}
          />
          {data.filename !== "" ||
            (fileUrl !== "" && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <img src={fileUrl} height={50} alt={`${data.filename}`} />
                <span
                  style={{
                    marginLeft: "5px",
                    fontSize: ".8em",
                    color: "black",
                  }}
                >
                  {data.filename}
                </span>
              </div>
            ))}
        </Form.Field>
        <Form.Field>
          <Form.Input
            className={"themsanpham_input"}
            fluid
            id={"thanhphan"}
            label={"Thành Phần"}
            value={data.thanhphan}
            placeholder={"Thành phần"}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Group widths={"equal"}>
          <Form.Input
            id={"giaban"}
            value={data.giaban}
            label={"Giá Bán Lẻ "}
            placeholder={"Giá bán lẻ"}
            style={{ width: "50%" }}
            onChange={handleInputChange}
          />
          <Form.Input
            id={"giakhuyenmai"}
            value={data.giakhuyenmai}
            label={"Giá Khuyến Mãi"}
            placeholder={"Giá khuyến mãi"}
            style={{ width: "50%" }}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Field>
          <Form.TextArea
            id={"congdung"}
            value={data.congdung}
            label={"Công Dụng"}
            placeholder={"Công dụng"}
            rows={10}
            onChange={handleInputChange}
          />
        </Form.Field>
        <Form.Field>
            <Checkbox label="Thực phẩm chức năng" checked={data.isThuoc} onChange={handleCheckboxChange} />
        </Form.Field>
        <Form.Group style={{ display: "flex", justifyContent: "flex-end" }}>
          <Link to={"/sanpham"}>
            <Form.Button id={"themsanpham_submit_btn"}>Quay Lại</Form.Button>
          </Link>
          <Form.Button id={"themsanpham_submit_btn"} onClick={handleSubmit}>
            {isEdit ? "Thay Đổi" : "Thêm Sản Phẩm"}
          </Form.Button>
        </Form.Group>
      </Form>
    </div>
  );
};

export default SanPhamForm;
