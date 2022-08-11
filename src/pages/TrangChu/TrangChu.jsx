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

const TrangChu = () => {
    const [bp, setP] = useState(0);

    // get baiviet from db
    const baiviet = [
        {
            title: 'Cao Ban Long', img: "/images/cao-ban-long.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
        {
            title: 'Chi Phuc Thong', img: "/images/tanmogan.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
        {
            title: 'Tieu Viem Xoang', img: "/images/tra-binh-vi.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
        {
            title: 'Chi Phuc Thong', img: "/images/tanmogan.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
        {
            title: 'Tieu Viem Xoang', img: "/images/tra-binh-vi.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
    ];

    setInterval( () => {
        let count = bp;
        if (count >= baiviet.length - 1) {
            count = 0
            setP(count);
        } else if (count < baiviet.length - 1) {
            count += 1;
            setP(count);
        }
    }, 6000);

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
            
            <Separator title={'Tin Tức - Hoạt Động'} />
            <TinNoiBatSection baiviet={baiviet} index={bp} />

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