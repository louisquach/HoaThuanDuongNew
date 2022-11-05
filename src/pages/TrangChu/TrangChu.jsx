import * as React from 'react';
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp } from '@fortawesome/free-solid-svg-icons';
import Separator from '../../component/Separator/Separator';
import GioiThieuSection from './Components/GioiThieuSection/GioiThieuSection';
import SanPhamSection from './Components/SanPhamSection/SanPhamSection';
import TinNoiBatSection from './Components/TinNoiBatSection/TinNoiBat';
import './TrangChu.style.scss'
import BangKhen from './Components/Carousel/Carousel';
import LienHeSection from './Components/LienHeSection/LienHe';
import Loader from '../../component/Loader/Loader';

const TrangChu = () => {
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => clearTimeout(() => setLoading(false));
    },[])

    if (loading) {
        return <Loader visible={loading}/>
    }

    const goTop = () => {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    return (
        <div id={'trangchu-container'}>
             { document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? 
                         <div id={'scroll-top-btn'} onClick={goTop}>
                         <FontAwesomeIcon icon={faChevronUp} size='lg' />
                     </div>
         
             : ''}
            <Separator title={'Giới Thiệu'}/>
            <GioiThieuSection />
            
            <Separator title={'Tin Tức - Bài Viết'} />
            <TinNoiBatSection />

            <Separator title={'Sản Phẩm Nổi Bật'}/>
            <SanPhamSection />

            <Separator title={'Chứng Nhận - Bằng Khen'}/>
            <BangKhen />
            
            <Separator title={'Liên Hệ Tư Vấn'}/>
            <LienHeSection />
        </div>
    )
}

export default TrangChu;