import React, { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { Form } from "semantic-ui-react";
import {
  addData,
  getFile,
  updateData,
  uploadFile,
  getDataById,
} from "../../firebase/firebase";
import { getDate } from "../../utils/getDate";
import "./ThemBaiViet.scss";
import Swal from "sweetalert2";

const BaiVietForm = () => {
  const [data, setData] = useState({
    title: "",
    content: "",
    noibat: true,
    ngaytao: "",
    filename: "",
    fileRef: "",
    category: ''
  });

  const [loading, setLoading] = useState(false);
  const [isEdit, setEdit] = useState(false);
  const param = useParams();
  const location = useLocation();
  const path = location.pathname;

  useEffect(() => {
    if (param.baivietId && param.category && path.includes('/edit/')) {
      setLoading(true);
      setEdit(true);
      const res = async () => {
        let doc = await getDataById(param.category, param.baivietId);
        setData({
          title: doc.title,
          content: doc.content,
          filename: doc.filename ? doc.filename : "",
          fileRef: doc.fileRef ? doc.fileRef : '',
          category: param.category
        });
      };
      res();
      setLoading(false);
    }
  }, []);


  useEffect(() => {
    if (data.filename !== "" && data.fileRef === "") {
      let res = async () => {
        let url = await getFile(param.category, data.filename);
        if (url) {
          let obj = { ...data };
          obj.fileRef = url;
          setData(obj);
        }
      };
      res();
    }
  }, [data, param]);

  const handleUploadFile = async (e) => {
    setLoading(true);
    try {
      let file = e.target.files[0];
      const res = await uploadFile(param.category, file.name, file);
      if (res.success) {
        let obj = data;
        obj.filename = res.name;
        obj.fileRef = res.path;
        setData(obj);
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
    if (obj.category === '') {
      obj.category = param.category
    }
    let res = false;
    if (isEdit) {
      res = await updateData(param.baivietId, param.category, obj);
    } else {
      res = await addData(path, obj);
    }
    if (res) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Thêm bài viết thành công!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        window.location.href = `/${param.category}`;
      }, 2000);
    }
    setLoading(false);
  };

  return (
    <>
      <div className="san-pham-noi-bat" style={{ margin: "5rem 0 0" }}>
        <Form id={"themsanpham_form"}>
          <h1>{isEdit ? "CẬP NHẬT BÀI VIẾT" : "THÊM BÀI VIẾT MỚI"}</h1>
          <Form.Field>
            <Form.Input
              className={"themsanpham_input"}
              fluid
              id={"title"}
              label={"Tiêu Đề Bài Viết"}
              value={data.title}
              placeholder={"Tiêu đề bài viết"}
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
              label={"Hình Ảnh"}
            />
            {data.filename !== "" &&
              (data.fileRef !== "" && (
                <div style={{ display: "flex", alignItems: "center" }}>
                  <img src={data.fileRef} height={50} alt={`${data.filename}`} />
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
            <Form.TextArea
              id={"content"}
              value={data.content}
              label={"Nội Dung Bài Viết"}
              placeholder={"Nội dung bài viết"}
              rows={30}
              onChange={handleInputChange}
            />
          </Form.Field>
          <Form.Group style={{ display: "flex", justifyContent: "flex-end" }}>
            <Link to={`/${param.category}`}>
              <Form.Button id={"themsanpham_submit_btn"}>Quay Lại</Form.Button>
            </Link>
            <Form.Button id={"themsanpham_submit_btn"} onClick={handleSubmit}>
              {isEdit ? "Lưu Thay Đổi" : "Thêm Bài Viết"}
            </Form.Button>
          </Form.Group>
        </Form>
      </div>
    </>
  );
};

export default BaiVietForm;
