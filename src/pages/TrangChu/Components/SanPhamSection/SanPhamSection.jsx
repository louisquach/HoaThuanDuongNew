import * as React from 'react'
import { useState, useEffect } from 'react';
import './SanPhamSection.style.scss';
import {Link} from 'react-router-dom'
import { getDataByPage } from '../../../../firebase/firebase';

const SanPhamSection = () => {
    const [sanphams, setSanPham] = useState([]);

    useEffect(() => {
        const getSanpham = async () => {
            let response = await getDataByPage("sanpham", 12, 'date');

            if (response.data) {
                setSanPham(response.data);
            }
        };
        getSanpham();
    }, []);

    return (
        <section id={'trangchu-sanpham'}> 
            <div className={'sanpham-container'}>
                {
                    sanphams.map( (item, i) => {
                        return (
                            <div className={'sanpham-card'} key={`${i + item.title}`} onClick={ () => window.location.href = `/san-pham/${item.id}`}>
                                <img src={item.fileRef} alt={item.title} className={'sanpham-card-img'} />
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })
                }
            </div>
            <div id={'xemsp-d'}>
                    <Link to={'/san-pham/thuoc'} id={'xemsp-btn'}>Xem Tất Cả</Link>
            </div>
        </section>
    )
}


export default SanPhamSection;