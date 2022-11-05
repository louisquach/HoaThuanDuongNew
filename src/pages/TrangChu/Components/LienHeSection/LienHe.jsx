import * as React from 'react'
import { useState } from 'react';
import { addData } from "../../../../firebase/firebase";
import Swal from "sweetalert2";
import {getDate} from '../../../../utils/getDate'
import { Form, Button } from 'semantic-ui-react';
import './LienHe.style.scss'


const LienHeSection = () => {
    const [yeucau, setYeuCau] = useState({
        ten: "",
        email: "",
        diachi: "",
        phone: "",
        sanpham: "",
        tinnhan: "",
        lienhe: false
      });
      const [sentEror, setSentError] = useState(false);
    
      const handleFormChange = (e, data) => {
        const { name, value } = e.currentTarget;
        if (name) {
          if (name === "phone") {
            let letters = /^[0-9]+$/;
            if (value.match(letters) || value === '') {
              setYeuCau({ ...yeucau, [name]: value });
            }
          } else {
            setYeuCau({ ...yeucau, [name]: value });
          }
        } else {
          let luachon = [...data.value];
          setYeuCau({ ...yeucau, [data.name]: luachon.join() });
        }
      };
    
      const handleSend = async () => {
        const date = getDate()
        let data = yeucau;
        data.ngaygui = date;
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
          });
          window.location.pathname = "/";
        } else {
          setSentError(true);
        }
      };
    
      return (
        <section id={'trangchu-lienhe'}>
            <div className={"lienhe__container"}>
                <div className={'lienhe-map'}>
                <iframe 
                    id='map-iframe'
                    src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d979.4794217343866!2d107.22517548118459!3d10.89386017354663!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sau!4v1660232823058!5m2!1sen!2sau" 
                    width="600" 
                    height="450" 
                    style={{border: 'none', pointerEvents: 'auto', boxShadow: '1px 2px 10px grey'}} 
                    allowFullScreen="" 
                    loading="lazy" 
                    referrerPolicy="no-referrer-when-downgrade"
                    title='Hoà Thuận Đường'
                 />
                </div>
                <div className={"lienhe__sub_container"}>
                {sentEror && <h1>Có Lỗi kết nối xảy ra, vui lòng gửi yêu cầu lại!</h1>}
                <Form className="form" onSubmit={handleSend}>
                    <Form.Field>
                        <label>Họ Tên</label>
                        <input
                        placeholder="Tên"
                        autoComplete="off"
                        required
                        name="ten"
                        value={yeucau.ten}
                        className={'lienhe-input'}
                        onChange={handleFormChange}
                        />
                    </Form.Field>
                
                    <Form.Field>
                        <label>Địa Chỉ</label>
                        <input
                        placeholder="Địa Chỉ"
                        autoComplete="off"
                        name="diachi"
                        className={'lienhe-input'}
                        value={yeucau.diachi}
                        onChange={handleFormChange}
                        />
                    </Form.Field>
                
                    <Form.Field>
                        <label>Email</label>
                        <input
                            placeholder="Email"
                            name="email"
                            className={'lienhe-input'}
                            value={yeucau.email}
                            onChange={handleFormChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Số Điện Thoại</label>
                        <input
                            placeholder="Số Điện Thoại"
                            autoComplete="off"
                            required
                            name="phone"
                            className={'lienhe-input'}
                            onChange={handleFormChange}
                            value={yeucau.phone}
                        />
                    </Form.Field>
                
                    <Form.Field>
                        <label>Tin Nhắn</label>
                        <textarea
                        rows={5}
                        placeholder="Nội dung"
                        name="tinnhan"
                        className={'lienhe-input'}
                        onChange={handleFormChange}
                        value={yeucau.tinnhan}
                        />
                    </Form.Field>
        
                    <Button type="submit" className={"lienhe_submit_btn"} style={{backgroundColor: 'lightseagreen', color:'white'}}>
                        Gửi
                    </Button>
                </Form>
            </div>
            </div>
        </section>
      );
}

export default LienHeSection;