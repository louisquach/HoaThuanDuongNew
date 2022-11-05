import * as React from 'react';
import './TinNoiBat.style.scss'
import {Link} from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import Loader from '../../../../component/Loader/Loader';
import { getDataByPage } from '../../../../firebase/firebase';

const TinNoiBatSection = () => {
    const [selected, setSelected] = useState(0);
    const [intervalId, setIntervalId] = useState(null)
    const [baiviet, setBaiviet] = useState([]);
    const [lastVisible, setLastVisible] = useState(undefined);

    useEffect( () => {
        const getBaiViet = async () => {
            const response = await getDataByPage('baiviet', 5, 'date', 'desc', lastVisible);
            if (response.data.length) {
                setBaiviet(response.data);
                setLastVisible(response.lastVisible);
            }
        }
        getBaiViet();
        if (intervalId) {
            clearInterval(intervalId);
        }
        if (baiviet.length) {
            setIntervalId(setInterval( () => {
               setAutoChange()
           }, 6000));
        }
    },[selected]);

    const setAutoChange = () => {
        let count = selected;
        if (count >= baiviet.length - 1) {
            count = 0
            setSelected(count);
        } else if (count < baiviet.length - 1) {
            count += 1;
            setSelected(count);
        }
    }
    
    if (!baiviet.length) {
        return <Loader  visible={baiviet.length > 0}/>
    }

    const chonBaiViet = (index) => {
        if (intervalId) {
            clearInterval(intervalId)
        }
        setSelected(index)
    }

    return (
        <section id={'trangchu-tinnoibat'}> 
            <div className={'tinnoibat-container'}>
                <div className={'tinnoibat-carousel'}>
                    <Link className='tinnoibat-content' to={`/tintuc-baiviet/${baiviet[selected].id}`}>
                        <img className={'tinnoibat-img'} src={baiviet[selected].fileRef} alt="hinh thuoc"/>
                        <p className='tinnoibat-text' dangerouslySetInnerHTML={{__html: baiviet[selected].content}}>
                        </p>
                    </Link>

                    <div className='tinnoibat-thumbnail'>
                        <div className={'thumbnail-container'}>
                            {
                                baiviet.map( (p, i) => {
                                    return (
                                        <div className={ i === selected ? 'thumbnail-card active' : 'thumbnail-card'} key={i} onClick={() => chonBaiViet(i)}>
                                            <img src={p.fileRef} alt={p.title} className={'thumbnail-img'}/>
                                            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                                <h5 className={'thumbnail-title'}>{p.title}</h5>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default TinNoiBatSection;