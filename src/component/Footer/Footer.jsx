import * as React from "react";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faFacebook} from '@fortawesome/free-brands-svg-icons';
import './Footer.style.scss'

const Footer = ({menus}) => {
  return (
    <footer className="footer">
      <div className="footer_container">
        <div>
            <h1 className={'heading__1'} style={{fontSize: '1.2rem', padding: '0', margin: '0'}}>
              Nhà Thuốc - Phòng Chẩn Trị Đông Y
              </h1>
            <h1 className={'heading__1'} style={{textTransform: 'uppercase', letterSpacing: '2px', margin: '1rem 0'}}>
              Hoà Thuận Đường
              </h1>
            <div className={'footer__info'} style={{fontWeight: '500'}}>
              <span>Địa Chỉ: 28 K2 Ấp Tân Phong, Xã Xuân Tân, Long Khánh, Đồng Nai</span>
              <span>Điện Thoại: 093 727 1186</span>
              <span>Email: dongy.hoathuanduong@gmail.com</span>
              <div style={{ display: "flex", width: '100%' }}>
                <span><FontAwesomeIcon icon={faFacebook}/> hoathuanduong</span>
                <span style={{width: '5%', textAlign: 'center'}}> - </span>
                <span>Zalo: 093 727 1186</span>
              </div>
            </div>
          </div>
          <ul className="footer_list">
            {
              menus.map( item => {
                return (
                  <li style={{marginBottom: '5px'}} key={item.path}>
                    <Link className="footer_link" to={item.path}>
                      {item.name}
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </div>
        <div className={'footer-span'}>
            <span>&copy;2022 - Bản Quyền Thuộc Về Đông Y Hoà Thuận Đường</span>
        </div>
    </footer>
  );
};

export default Footer;
