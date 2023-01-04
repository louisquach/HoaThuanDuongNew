import * as React from 'react';
import './SanphamSingle.style.scss'
import {useState, useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { getDataById, getAllData } from '../../../firebase/firebase';
import { SANPHAM_PATH } from '../../../dataPaths/dataPaths';
import Loader from '../../../component/Loader/Loader';

const SanphamSingle = () => {
    const params = useParams();
    const [sanphamID, setSanphamId] = useState(null);
    const [sanphamTuongtu, setSanPhamTuongTu] = useState([]);
    const [sanpham, setSanpham] = useState(undefined);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (params.sanphamId) {
            setSanphamId(params.sanphamId);
            let res = async () => {
                // const result = await getDataById(SANPHAM_PATH, params.sanphamId);
                // if (Object.entries(result).length) {
                //     setSanpham(result);
                // }
                let data = await getAllData(SANPHAM_PATH);
            if (data.length) {
                let findSp = data.find(item => item.id === params.sanphamId);
                setSanpham(findSp);
                let others = data.filter(item => item.id !== params.sanphamId);
                setSanPhamTuongTu(others);
            }
            };
            res();
        }
        setTimeout(() => {
            setLoading(false)
        }, 300);

        return () => clearTimeout(() => setLoading(false));
    }, [params.sanphamId]);

    if (isLoading) {
        return <Loader />
    }

    if ((!sanphamID || !sanpham) && !isLoading) {
        return <div id={'sanpham-single-container'}>
            <div className={'sanpham-single-title'}>
                <h1 className={'sanpham-title'}>Không Tìm Thấy Sản Phẩm</h1>
            </div>
        </div>
    }
    return (
     <div id={'sanpham-single-container'}>
        <div className={'sanpham-single-title'}>
            <h1 className={'sanpham-title'}>{sanpham.title}</h1>
        </div>
        <div id={'sanpham-single-content'}>
            <div>
                <img src={sanpham.fileRef} alt={sanpham.title} className={'hinh-san-pham'}/>
            </div>
            <div className={'sp-content-main'}>
                <h5 className={'sp-mota'}>Mô Tả Sản Phẩm</h5>
                <div dangerouslySetInnerHTML={{__html: sanpham.content}}></div>
                <h5 className={'gia-ban'}>Giá Bán: 100,000đ</h5>
            </div>
        </div>
        <div id={'sanpham-tuongtu-container'}>
            <h3 className={'sp-tuongtu'}>Sản Phẩm Tương Tự</h3>
            <div id={'sp-tuongtu-sp'}>
            {
                    sanphamTuongtu.map( (item, i) => {
                        return (
                            <div className='sp-img-container'key={`${i + item.title}`}>
                                <Link to={`/san-pham/${item.id}`} className='sp-img-ctn'>
                                    <img src={item.fileRef} alt={item.title} className={'sp-tt'} />
                                </Link>
                                <div className='sp-tuongtu-title'>
                                    <h5>{item.title}</h5>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
     </div>   
    )
}


export default SanphamSingle;