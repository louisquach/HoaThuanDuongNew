"use client";

import { useState } from "react";
import { addData } from "@/lib/firebase";
import { getDate } from "@/lib/getDate";
import Swal from "sweetalert2";

export default function LienHeSection() {
  const [yeucau, setYeuCau] = useState({
    ten: "",
    email: "",
    diachi: "",
    phone: "",
    sanpham: "",
    tinnhan: "",
    lienhe: false,
  });
  const [sentError, setSentError] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.currentTarget;
    if (name === "phone") {
      let letters = /^[0-9]*$/;
      if (value.match(letters)) {
        setYeuCau({ ...yeucau, [name]: value });
      }
    } else {
      setYeuCau({ ...yeucau, [name]: value });
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    const date = getDate();
    let data = { ...yeucau, ngaygui: date };
    const res = await addData("lienhe", data);
    if (res) {
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Gửi thành công! Chúng tôi sẽ liên hệ lại trong thời gian sớm nhất.",
        showConfirmButton: false,
        timer: 2500,
      });
      setYeuCau({
        ten: "",
        email: "",
        diachi: "",
        sanpham: "",
        phone: "",
        tinnhan: "",
        lienhe: false,
      });
    } else {
      setSentError(true);
    }
  };

  return (
    <section id="trangchu-lienhe">
      <div className="lienhe__container">
        <div className="lienhe-map">
          <iframe
            id="map-iframe"
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d979.4794217343866!2d107.22517548118459!3d10.89386017354663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1660232823058!5m2!1sen!2sau"
            width="600"
            height="450"
            style={{ border: "none", pointerEvents: "auto" }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Bản đồ Hoà Thuận Đường"
          />
        </div>
        <div className="lienhe__sub_container">
          {sentError && <p style={{ color: "red" }}>Có Lỗi kết nối xảy ra, vui lòng gửi yêu cầu lại!</p>}
          <form className="form ui form" onSubmit={handleSend}>
            <div className="field">
              <label htmlFor="contact-ten">Họ Tên</label>
              <input
                id="contact-ten"
                placeholder="Tên"
                autoComplete="name"
                required
                name="ten"
                value={yeucau.ten}
                className="lienhe-input"
                onChange={handleFormChange}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-diachi">Địa Chỉ</label>
              <input
                id="contact-diachi"
                placeholder="Địa Chỉ"
                autoComplete="street-address"
                name="diachi"
                className="lienhe-input"
                value={yeucau.diachi}
                onChange={handleFormChange}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                placeholder="Email"
                name="email"
                type="email"
                className="lienhe-input"
                value={yeucau.email}
                onChange={handleFormChange}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-phone">Số Điện Thoại</label>
              <input
                id="contact-phone"
                placeholder="Số Điện Thoại"
                autoComplete="tel"
                required
                name="phone"
                className="lienhe-input"
                onChange={handleFormChange}
                value={yeucau.phone}
              />
            </div>
            <div className="field">
              <label htmlFor="contact-tinnhan">Tin Nhắn</label>
              <textarea
                id="contact-tinnhan"
                rows={5}
                placeholder="Nội dung"
                name="tinnhan"
                className="lienhe-input"
                onChange={handleFormChange}
                value={yeucau.tinnhan}
              />
            </div>
            <button
              type="submit"
              className="ui button lienhe_submit_btn"
            >
              Gửi Yêu Cầu
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
