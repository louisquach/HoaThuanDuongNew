import * as React from 'react';
import {useState, useEffect} from 'react';
import './BaivietSingle.style.scss';
import { useParams, Link } from 'react-router-dom';
import { getAllData } from '../../../firebase/firebase';
import { BAIVIET_PATH } from '../../../dataPaths/dataPaths';
import Loader from '../../../component/Loader/Loader';

const BaivietSingle = () => {
    const params = useParams();
    const [baivietID, setSanphamId] = useState(null);
    const [baivietTuongtu, setBaivietTuongTu] = useState([]);
    const [baiviet, setBaiviet] = useState(undefined);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        if (params.baivietId) {
            setSanphamId(params.baivietId);
            let res = async () => {
                let data = await getAllData(BAIVIET_PATH);
                if (data.length) {
                    let findSp = data.find(item => item.id === params.baivietId);
                    setBaiviet(findSp);
                    let others = data.filter(item => item.id !== params.baivietId);
                    setBaivietTuongTu(others);
                }
            };
            res();
        }
        setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => clearTimeout(() => setLoading(false));
    }, [params.baivietId]);

    if (isLoading) {
        return <Loader />
    }

    return (
        <div id={'baiviet-single-container'}>
            {
                baiviet ? 
                <>
                    <div className={'baiviet-single-head'}>
                        <h1>{baiviet.title}</h1>
                        <span><em>{baiviet.ngaytao}</em></span>
                    </div>
                    <div className={'baiviet-single-content'}>
                        <div dangerouslySetInnerHTML={{__html: baiviet.content}}></div>
                    </div>
                </> : ''
            }
            <div className={'baiviet-khac'}>
                <h3>Bài viết khác</h3>
                {
                    baivietTuongtu.map( (item,i) => {
                        return (
                            <Link to={`/tintuc-baiviet/${item.id}`} key={item.title + i}>
                                <div className={'baiviet-khac-container'} >
                                    <div className={'baiviet-khac-img'} style={{backgroundImage: `url("${item.fileRef}")`}}>
                                        {/* <img src={item.fileRef} alt={item.title} className={'baiviet-img'}/> */}
                                    </div>
                                    <div className={'baiviet-khac-content'}>
                                        <h3 className='baiviet-khac-title'>{item.title}</h3>
                                        <span>{item.ngaytao}</span>
                                        {/* <div className={'baiviet-content'} dangerouslySetInnerHTML={{__html:item.content}}></div> */}
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </div>
    )
}



export default BaivietSingle;