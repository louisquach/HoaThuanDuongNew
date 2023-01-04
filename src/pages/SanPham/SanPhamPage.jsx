import * as React from 'react';
import {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import Loader from '../../component/Loader/Loader';
import Separator from '../../component/Separator/Separator';
import { getAllData } from '../../firebase/firebase';
import './SanPhamPage.style.scss';

const SANPHAM_PATH = 'sanpham';

const SanPhamPage = () => {
    const [sanphams, setSanPham] = useState([]);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        const res = async () => {
            let data = await getAllData(SANPHAM_PATH);
            if (data.length) {
                setSanPham(data);
            }
        };
        res();
        setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => clearTimeout(() => setLoading(false));
    }, []);

    if (isLoading) {
        return <section id='sanpham-page'>
            <Loader />
        </section>
    }

    return (
        <section id={'sanpham-page'}> 
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