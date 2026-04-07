"use client";

import Image from "next/image";

export default function BangKhen() {
  const items = [];
  for (let i = 1; i <= 9; i++) {
    items.push(
      <div className="bangkhen-slide" key={i}>
        <Image
          src={`/images/bangkhen/bk${i}.jpg`}
          alt={`Bằng khen - Chứng nhận số ${i}`}
          className="carousel-img"
          width={300}
          height={200}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <section id="trangchu-bangkhen">
      <div className="bangkhen-track">
        {items}
        {/* Duplicate for seamless infinite loop */}
        {items.map((item) => (
          <div className="bangkhen-slide" key={`dup-${item.key}`}>
            {item.props.children}
          </div>
        ))}
      </div>
    </section>
  );
}
