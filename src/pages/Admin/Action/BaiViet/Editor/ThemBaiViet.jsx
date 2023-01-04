import { useState, useEffect } from 'react'
import TextEditor from '../../../../../component/TextEditor/TextEditor'
import { Link, useParams, useLocation } from 'react-router-dom'
import './ThemBaiViet.scss'
import { BAIVIET_PATH } from '../../../../../dataPaths/dataPaths'
import {getDate} from '../../../../../utils/getDate';
import {
    addData,
    getFile,
    updateData,
    uploadFile,
    getDataById,
  } from "../../../../../firebase/firebase";
import Swal from "sweetalert2";
import Loader from '../../../../../component/Loader/Loader'

const ThemBaiViet = () => {
    const [data, setData] = useState({
        title: "",
        content: "",
        noibat: true,
        ngaytao: "",
        filename: "",
        fileRef: ""
      });
    
      const [loading, setLoading] = useState(false);
      const [isEdit, setEdit] = useState(false);
      const param = useParams();
      const location = useLocation();
      const path = location.pathname;
    
      useEffect(() => {
        if (param.baivietId && path.includes('/sua/')) {
          setLoading(true);
          setEdit(true);
          const res = async () => {
            let doc = await getDataById(BAIVIET_PATH, param.baivietId);
            setData({
              title: doc.title,
              content: doc.content,
              filename: doc.filename ? doc.filename : "",
              fileRef: doc.fileRef ? doc.fileRef : ''
            });
          };
          res();
          setLoading(false);
        }
      }, []);
    
    
      useEffect(() => {
        if (data.filename !== "" && data.fileRef === "") {
          let res = async () => {
            let url = await getFile(BAIVIET_PATH, data.filename);
            if (url) {
              let obj = { ...data };
              obj.fileRef = url;
              setData(obj);
            }
          };
          res();
        }
      }, [data]);
    
      const handleUploadFile = async (e) => {
        setLoading(true);
        try {
          let file = e.target.files[0];
          const res = await uploadFile(BAIVIET_PATH, file.name, file);
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

        let res = false;
        if (isEdit) {
          res = await updateData(param.baivietId, BAIVIET_PATH, obj);
        } else {
          res = await addData(BAIVIET_PATH, obj);
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
            window.location.href = `/quanly`;
          }, 2000);
        }
        setLoading(false);
      };
    
    if (loading) {
        return <div id='them-bai-viet-container'>
            <Loader />
        </div>
    }

    return (
        <div id='them-bai-viet-container'>
            <div className='them-bai-viet-main'>
                <h1>Thêm Bài Viết</h1>
                <form id='them-bai-viet-form'>
                    <div className='content-editor-container'>
                        <label htmlFor='baiviet-title' className={'form-label'}>Tiêu đề:</label>
                        <input name='title' id='title' value={data.title} onChange={handleInputChange}/>
                    </div>
                    <div className='content-editor-container'>
                        <label htmlFor='baiviet-img' className={'form-label'}>Hình Ảnh Sản Phẩm:</label>
                        <input type='file' name='baiviet-img' id='file' onChange={handleUploadFile}/>
                        { data.filename !== "" &&
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
                            ))
                            }
                    </div>
                    <div className='content-editor-container'>
                        <label className={'form-label'}>Nội dung:</label>
                        <TextEditor id='them-baiviet-editor' setContent={value => setData({...data, content: value})} content={data.content} />
                    </div>
                    <div className='content-editor-btn-container'>
                    <Link className='editor-btn cancel' to={'/quanly'}>Huỷ</Link>
                        <button className='editor-btn save' onClick={handleSubmit}>{!isEdit ? 'Thêm Bài Viết' : 'Cập Nhật'}</button>
                    </div>
                </form>

            </div>
        </div>
    )
}


export default ThemBaiViet;