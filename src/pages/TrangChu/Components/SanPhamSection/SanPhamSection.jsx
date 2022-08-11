import * as React from 'react'
import './SanPhamSection.style.scss';


const SanPhamSection = () => {
    const sanpham = [
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
        {
            title: 'Tieu Viem Xoang', img: "/images/tra-binh-vi.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
        {
            title: 'Chi Phuc Thong', img: "/images/tanmogan.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
        {
            title: 'Tieu Viem Xoang', img: "/images/tra-binh-vi.jpg", content: "Lorem ipsum dolor sit amet consectetur adipisicing elit \nDoloribus dolorum rem eaque impedit tenetur ullam accusantium, consequuntur numquam quidem natus ut dolor official \nVoluptatum officiis distinctio ad quae velit ut."
        },
    ]
    return (
        <section id={'trangchu-sanpham'}> 
            <div className={'sanpham-container'}>
                {
                    sanpham.map( (item, i) => {
                        return (
                            <div className={'sanpham-card'} key={`${i + item.title}`}>
                                <img src={item.img} alt={item.title} className={'sanpham-card-img'} />
                                <h4>{item.title}</h4>
                            </div>
                        )
                    })
                }
                
            </div>
        </section>
    )
}


export default SanPhamSection;