import * as React from 'react';
import './TinNoiBat.style.scss'


const TinNoiBatSection = ({baiviet, index}) => {
    return (
        <section id={'trangchu-tinnoibat'}> 
            <div className={'tinnoibat-container'}>
                <div className={'tinnoibat-carousel'}>
                    <div className='tinnoibat-content'>
                        <img className={'tinnoibat-img'} src={baiviet[index].img} alt="hinh thuoc"/>
                        <p className='tinnoibat-text'>
                            {baiviet[index].content}
                        </p>
                    </div>

                    <div className='tinnoibat-thumbnail'>
                        <div className={'thumbnail-container'}>
                            {
                                baiviet.map( (p, i) => {
                                    return (
                                        <div className={ i === index ? 'thumbnail-card active' : 'thumbnail-card'} key={i}>
                                            <img src={p.img} alt={p.title} className={'thumbnail-img'}/>
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