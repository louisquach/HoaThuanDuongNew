import * as React from 'react'
import Separator from '../../component/Separator/Separator';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {getAllData} from '../../firebase/firebase';
import Loader from '../../component/Loader/Loader';
import './BaiVietPage.style.scss'
import { BAIVIET_PATH } from '../../dataPaths/dataPaths';

const BaiVietPage = () => {
    const [baivietsKhac, setBaiviet] = React.useState([]);
    const [baimoi, setBaimoi] = useState(undefined);
    const [isLoading, setLoading] = useState(true);
  
    React.useEffect(() => {
      const response = async () => {
        let data = await getAllData(BAIVIET_PATH);
        if (data.length) {
            setBaimoi(data[0]);
            
            let others = data.filter( baiviet => baiviet.id !== data[0].id);
            setBaiviet(others);
        }
      };
      response();
      setTimeout(() => {
        setLoading(false)
    }, 500);

    return () => clearTimeout(() => setLoading(false));
    }, []);
  
    if (isLoading) {
      return <div id={'baiviet-page-container'}><Loader /></div>;
    }

    if (!baimoi) {
        return <>
        <Separator title={'Tin Tức - Bài Viết'} />
            <div id={'baiviet-page-container'}>
                <h1 style={{textAlign: 'center', margin: '5rem auto'}}>Chưa có bài viết mới</h1>
            </div>
        </>
    }

    const baivietKhacNode = [];
    baivietsKhac.map( (baiviet, i) => {
        if (baiviet) {
            baivietKhacNode.push(
                <Link to={`/tintuc-baiviet/${baiviet.id}`} key={baiviet.title + i}>
                    <div className={'baiviet-khac-container'} >
                        {baiviet.fileRef.length ?
                            <div className={'baiviet-khac-img'}>
                                <img src={baiviet.fileRef} alt={baiviet.title} className={'baiviet-img'}/>
                            </div>
                            : ''
                        }
                        <div className={'baiviet-khac-content'}>
                            <h1>{baiviet.title}</h1>
                            <h5 className='ngaytao-span'>{baiviet.ngaytao}</h5>
                            {/* <div className={'baiviet-content'} dangerouslySetInnerHTML={{__html: baiviet.content}}></div> */}
                        </div>
                    </div>
                </Link>
            )
        }
    });

    return (
        <>
            <Separator title={'Tin Tức - Bài Viết'} />
            <div id={'baiviet-page-container'}>
                <div className={'baiviet-moinhat'}>
                    <div className='baiviet-title'>
                        <h1>{baimoi.title}</h1>
                        <span className='ngaytao-span'><em>Ngày {baimoi.ngaytao}</em></span>
                    </div>

                    <div className={'baiviet-moinhat-container'}>
                        <div className={'baiviet-moinhat-img'}>
                            <img src={baimoi.fileRef} alt={baimoi.title} className={'baiviet-img'}/>
                        </div>
                        <div className={'baiviet-moinhat-content'}>
                            <div className={'baiviet-content'} dangerouslySetInnerHTML={{__html: baimoi.content}}></div>
                            <div className='link-container'>
                                <Link to={`/tintuc-baiviet/${baimoi.id}`} id='xem-bai-viet-link'>Xem bài viết</Link>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'baiviet-khac'}>
                    {
                        baivietKhacNode
                    }
                </div>
            </div>
        </>
    )
}

export default BaiVietPage;