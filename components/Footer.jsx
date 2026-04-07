"use client";

import Link from "next/link";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import { ADDRESS, EMAIL, PHONE, SITE_NAME } from "@/lib/constants";

export default function Footer({ menus }) {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div>
          <h2 className="heading__1" style={{ fontSize: "1.2rem", padding: "0", margin: "0" }}>
            Nhà Thuốc - Phòng Chẩn Trị Đông Y
          </h2>
          <h3
            className="heading__1"
            style={{ textTransform: "uppercase", letterSpacing: "2px", margin: "1rem 0" }}
          >
            {SITE_NAME}
          </h3>
          <address className="footer__info" style={{ fontWeight: "500", fontStyle: "normal" }}>
            <span>Địa Chỉ: {ADDRESS}</span>
            <span>
              Điện Thoại: <a href={`tel:${PHONE}`} style={{ color: "inherit" }}>{PHONE.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}</a>
            </span>
            <span>
              Email: <a href={`mailto:${EMAIL}`} style={{ color: "inherit" }}>{EMAIL}</a>
            </span>
            <div style={{ display: "flex", width: "100%" }}>
              <span>
                <FontAwesomeIcon icon={faFacebook} /> hoathuanduong
              </span>
              <span style={{ width: "5%", textAlign: "center" }}> - </span>
              <span>Zalo: {PHONE.replace(/(\d{3})(\d{3})(\d{4})/, "$1 $2 $3")}</span>
            </div>
          </address>
        </div>
        <ul className="footer_list">
          {menus.map((item) => (
            <li style={{ marginBottom: "5px" }} key={item.path}>
              <Link className="footer_link" href={item.path}>
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="footer-span">
        <span>&copy;{new Date().getFullYear()} - Bản Quyền Thuộc Về Đông Y {SITE_NAME}</span>
      </div>
    </footer>
  );
}
