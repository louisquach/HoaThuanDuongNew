import * as React from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import './Carousel.style.scss'
import 'pure-react-carousel/dist/react-carousel.es.css';

const BangKhen = () => {
    const nodes = [];

    for( let i = 1; i <= 9; i++) {
        nodes.push(
            <img src={`/images/bangkhen/bk${i}.jpg`} alt='bang khen' className={'carousel-img'}/>
        )
    }

    return (
        <section id={'trangchu-bangkhen'}>
            <CarouselProvider
                totalSlides={nodes.length}
                visibleSlides={nodes.length-3}
                infinite={true}
                isPlaying={true}
                playDirection={'backward'}
            >
                <Slider id={'carousel-container'}>
                    {
                        nodes.map( (item,index) => {
                            return (
                                <Slide index={index} className={'carousel-item'} key={index}>
                                    {item}
                                </Slide>
                            )
                        })
                    }
                </Slider>
            </CarouselProvider>
        </section>
    )
}

export default BangKhen;