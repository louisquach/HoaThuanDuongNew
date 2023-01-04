import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllData, deleteItem } from '../../../firebase/firebase';
import { BAIVIET_PATH, SANPHAM_PATH } from '../../../dataPaths/dataPaths';
import './QuanlyPage.style.scss'
import Loader from '../../../component/Loader/Loader';
import Swal from "sweetalert2";


const QuanlyPage = () => {
    const [tab, setTab] = useState(SANPHAM_PATH);
    const [baiviets, setBaiviet] = useState([]);
    const [sanphams, setSanPham] = useState([]);
    const [isLoading, setLoading] = useState(true);
  
    useEffect(() => {
      const response = async () => {
        let baiviets = await getAllData(BAIVIET_PATH);
        if (baiviets.length) {
            setBaiviet(baiviets);
        }
        let sanphams = await getAllData(SANPHAM_PATH);
        if (sanphams.length) {
            setSanPham(sanphams);
        }
      };
      response();
      setLoading(false);
    }, []);

    if (isLoading) {
        return <div id='quanly-content-container'>
            <Loader />
        </div>
    }

    const baivietNodes = [];
    const sanphamNodes = [];

    const handleDelete = async (id, path) => {
        let res = await deleteItem(id, path)
        if (res) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đã xóa!",
            showConfirmButton: false,
            timer: 2000,
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        }
    }
    baiviets.map( item => {
        baivietNodes.push(
            <div className='content-item' key={item.id}>
                <div className='item-title'>
                    <img src={item.fileRef} alt={item.title} key={item.title} className={'item-img'}/>
                    <h3>{item.title}</h3>
                </div>
                <div className='item-action'>
                    <button 
                        className='item-action-btn del'
                        onClick={() => handleDelete(item.id, BAIVIET_PATH)}
                    >
                        Xoá
                    </button>
                    <div className='action-btn-separator'></div>
                    <Link className='item-action-btn edit' to={tab === SANPHAM_PATH ? `/sanpham/sua/${item.id}` : `/baiviet/sua/${item.id}`}>Chỉnh Sửa</Link>
                </div>
            </div>
        )
    })

    sanphams.map( item => {
        sanphamNodes.push(
            <div className='content-item' key={item.id}>
                <div className='item-title'>
                    <img src={item.fileRef} alt={item.title} key={item.title} className={'item-img'}/>
                    <h3>{item.title}</h3>
                </div>
                <div className='item-action'>
                    <button 
                        className='item-action-btn del'
                        onClick={() => handleDelete(item.id, SANPHAM_PATH)}
                    >
                        Xoá
                    </button>
                    <div className='action-btn-separator'></div>
                    <Link className='item-action-btn edit' to={tab === SANPHAM_PATH ? `/sanpham/sua/${item.id}` : `/baiviet/sua/${item.id}`}>Chỉnh Sửa</Link>
                </div>
            </div>
        )
    })

    return (
        <div id={'quanly-content-container'}>
            <div className='quanly-content-main'>
                <div className='quanly-tab'>
                    <button className='quanly-tab-btn' style={ tab === SANPHAM_PATH ? {backgroundColor: 'teal', color: 'white'} : {}} onClick={() => setTab(SANPHAM_PATH)}>Sản Phẩm</button>
                    <button className='quanly-tab-btn' style={ tab === BAIVIET_PATH ? {backgroundColor: 'teal', color: 'white'} : {}} onClick={() => setTab(BAIVIET_PATH)}>Bài Viết</button>
                    <Link className='quanly-tab-btn them' style={{float: 'right', backgroundColor: 'orangered', color: 'white'}} to={tab === SANPHAM_PATH ? `/sanpham/them` : `/baiviet/them`}>
                        {tab === SANPHAM_PATH ? 'Thêm Sản Phẩm' : 'Thêm Bài Viết'}
                    </Link>
                </div>
                <div className='content-list'>
                    <h1>{tab === SANPHAM_PATH ? 'Sản Phẩm' : 'Bài Viết'}</h1>
                    {
                        tab === SANPHAM_PATH ? sanphamNodes : baivietNodes
                    }
                </div>

            </div>
            
        </div>
    )
}


export default QuanlyPage;