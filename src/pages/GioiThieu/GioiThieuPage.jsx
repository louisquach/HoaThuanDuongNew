import * as React from 'react'
import GioiThieuSection from '../TrangChu/Components/GioiThieuSection/GioiThieuSection'
import './GioiThieuPage.style.scss'
import Separator from '../../component/Separator/Separator'


const GioiThieuPage = () => {
    return (
        <div id={'gioithieu-page-container'}>
            <Separator title={'Giới Thiệu'}/>
            <section id={'gioithieu-2-section'}>
                <div className={'gioithieu-detail-container'}>
                    <div className={'gioithieu-detail-d'}>
                        <p className={'gioithieu-detail-p'}>
                        Thành lập năm 1977 với 3 thành viên, đến năm 2022, <strong style={{color: 'teal'}}>HOÀ THUẬN ĐƯỜNG</strong> được vận hành bởi hơn 30 y dược sĩ bao gồm thành viên trong gia đình cùng các công nhân có nhiều năm kinh nghiệm. 
                        <br /><br/>
                        Cùng với việc chẩn trị, điều trị và bốc thuốc cho người bệnh tại chỗ, các sản phẩm do <strong style={{color: 'teal'}}>HOÀ THUẬN ĐƯỜNG</strong> nghiên cứu bào chế đã được phân phối trên toàn quốc từ năm 1998,
                        do Cục Quản Lý Dược cấp số đăng ký lưu hành, với nhiều sản phẩm nổi tiếng và được đăng ký độc quyền như Tiêu Viêm Xoang, Phong Tê Thấp, Chỉ Phúc Thống...
                        <br/><br/>
                        Đến nay <strong style={{color: 'teal'}}>HOÀ THUẬN ĐƯỜNG</strong> đã xây dựng được hơn 2000m2 cơ sở vật chất bao gồm điện thờ Y tổ, vườn dược liệu, xưởng bào chế thuốc,
                        phòng khám và điều trị. 
                        Phòng điều trị nội trú miễn phí với 20 giường bệnh để bệnh nhân có thể được điều trị tốt nhất bằng cách phối hợp các phương pháp như vật lý trị liệu, bấm huyệt, châm cứu...
                        </p>
                    </div>
                    <div className={'gioithieu-detail-video'}>
                        <iframe 
                            width="350" 
                            height="300" 
                            src="https://www.youtube.com/embed/7LSIS7OashE" 
                            title="Lương y Nguyễn Tăng Công - Cơ sở sản xuất đông dược Hoà Thuận Đường" 
                            frameBorder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen>
                        </iframe>
                    </div>
                </div>
            </section>
            <GioiThieuSection/>
            
        </div>
    )
}


export default GioiThieuPage;