import * as React from 'react';
import {useState, useEffect} from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import Loader from '../../component/Loader/Loader';
import Separator from '../../component/Separator/Separator';
import { getAllData } from '../../firebase/firebase';
import './SanPhamPage.style.scss';

const SANPHAM_PATH = 'sanpham';

const SanPhamPage = () => {
    const [sanphams, setSanPham] = useState([]);
    const [isLoading, setLoading] = useState(true);
    
    const location = useLocation();
    const navigate = useNavigate();
    const path = location.pathname;

    useEffect(() => {
        const res = async () => {
            const data = await getAllData(SANPHAM_PATH);
            const thuoc = [];
            const tpcn = [];
            if (data.length) {
                data.map( item => {
                    if (item.isThuoc !== undefined && item.isThuoc) {
                        thuoc.push(item)
                    } else {
                        tpcn.push(item)
                    }
                });
                if (path === '/san-pham') {
                    setSanPham(data);
                }
                else if (path === '/san-pham/thuoc') {
                    setSanPham(thuoc);
                } else if (path === '/san-pham/thuc-pham-chuc-nang') {
                    setSanPham(tpcn);
                }
            }
        };
        res();
        setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => clearTimeout(() => setLoading(false));
    }, [path]);

    if (isLoading) {
        return <section id='sanpham-page'>
            <Loader />
        </section>
    }

    return (
        <section id={'sanpham-page'}> 
        <div id='sanpham-container-menu'>
            <div className='sanpham-menu-container'>
                <div className='sanpham-menu-item' onClick={ () => navigate('/san-pham/thuoc')}>
                    Thuốc Lưu Hành Nội Bộ
                </div>
                <div  className='sanpham-menu-item' onClick={ () => navigate('/san-pham/thuc-pham-chuc-nang')}>
                    Thực Phẩm Chức Năng
                </div>
            </div>
        </div>
        <Separator title={'Sản Phẩm'}/>
            <div className={'sanpham-container'}>
                {
                    sanphams.map( (item, i) => {
                        return (
                            <Link className={'sanpham-card'} key={`${i + item.title}`} to={`/san-pham/${item.id}`}>
                                <img src={item.fileRef} alt={item.title} className={'sanpham-card-img'} />
                                <h4>{item.title}</h4>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    )
}

export default SanPhamPage;