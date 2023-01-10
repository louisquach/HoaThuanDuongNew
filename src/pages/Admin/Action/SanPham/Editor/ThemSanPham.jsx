import { useState, useEffect } from 'react'
import TextEditor from '../../../../../component/TextEditor/TextEditor'
import { Link, useLocation, useParams } from 'react-router-dom'
import './ThemSanPham.scss'
import { SANPHAM_PATH } from '../../../../../dataPaths/dataPaths'
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
import { Checkbox } from 'semantic-ui-react'

const ThemSanPham = () => {
      const [data, setData] = useState({
        title: "",
        content: "",
        noibat: true,
        ngaytao: "",
        filename: "",
        fileRef: "",
        isThuoc: true
      });
    
      const [loading, setLoading] = useState(false);
      const [isEdit, setEdit] = useState(false);
      const param = useParams();
      const location = useLocation();
      const path = location.pathname;
    
      useEffect(() => {
        if (param.sanphamId && path.includes('/sua/')) {
          setLoading(true);
          setEdit(true);
          const res = async () => {
            let doc = await getDataById(SANPHAM_PATH, param.sanphamId);
            setData({
              title: doc.title,
              content: doc.content,
              filename: doc.filename ? doc.filename : "",
              fileRef: doc.fileRef ? doc.fileRef : '',
              isThuoc: doc.isThuoc !== undefined ? doc.isThuoc : true 
            });
          };
          res();
          setLoading(false);
        }
      }, [path, param]);
    
    
      useEffect(() => {
        if (data.filename !== "" && data.fileRef === "") {
          let res = async () => {
            let url = await getFile(SANPHAM_PATH, data.filename);
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
          const res = await uploadFile(SANPHAM_PATH, file.name, file);
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
    
      const handleCheckboxChange = (e, target) => {
        setData({
          ...data,
          isThuoc: target.checked
        })
      }

      const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        let obj = data;
        let date = getDate();
        obj.ngaytao = date;

        let res = false;
        if (isEdit) {
          res = await updateData(param.sanphamId, SANPHAM_PATH, obj);
        } else {
          res = await addData(SANPHAM_PATH, obj);
        }
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Thêm sản phẩm thành công!",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            window.location.href = `/san-pham`;
          }, 2000);
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Không thể cập nhật sản phẩm, vui lòng thử lại!",
            showConfirmButton: false,
            timer: 2000,
          });
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
                <h1>{isEdit ? "Cập Nhật Sản Phẩm" : "Thêm Sản Phẩm"}</h1>
                <form id='them-bai-viet-form'>
                    <div className='content-editor-container'>
                        <label htmlFor='sanpham-title' className={'form-label'}>Tên Sản Phẩm:</label>
                        <input name='title' id='title' value={data.title} onChange={handleInputChange}/>
                    </div>
                    <div className='content-editor-container'>
                      <Checkbox label="Thực phẩm chức năng?" checked={data.isThuoc} onChange={handleCheckboxChange} style={{fontWeight: 'bold', fontSize: '1.1rem'}}/>
                    </div>

                    <div className='content-editor-container'>
                        <label htmlFor='sanpham-img' className={'form-label'}>Hình Ảnh Sản Phẩm:</label>
                        <input type='file' name='img' id='file' onChange={handleUploadFile}/>
                        { data.filename !== "" &&
                            (data.fileRef !== "" && (
                                <div style={{ display: "flex", alignItems: "center", marginTop: '5px' }}>
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
                        <TextEditor id setContent={value => setData({...data, content: value})} content={data.content} />
                    </div>
                    <div className='content-editor-btn-container'>
                        <Link className='editor-btn cancel' to={'/quanly'}>Huỷ</Link>
                        <button className='editor-btn save' onClick={handleSubmit}>{!isEdit ? 'Thêm Sản Phẩm' : 'Cập Nhật'}</button>
                    </div>
                </form>

            </div>
        </div>
    )
}


export default ThemSanPham;