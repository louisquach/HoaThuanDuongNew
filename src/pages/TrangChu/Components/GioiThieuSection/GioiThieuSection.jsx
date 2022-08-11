import * as React from 'react';
import './GioiThieuSection.style.scss'


const GioiThieuSection = () => {
    return (
        <section id={"trangchu-gioithieu"}>
            <div id={'cloned-section'}>
                <div className={'gioithieu-container'}>
                    <div className={'gioithieu-img-container'}>
                        <img src={'/images/nhathuoc1.jpg'} alt='hinh nha thuoc' id={'hinh-nha-thuoc1'} />
                        <img src={'/images/nhathuoc2.png'} alt='hinh nha thuoc' id={'hinh-nha-thuoc2'}/>
                        <img src={'/images/nhathuoc3.jpg'} alt='hinh nha thuoc' id={'hinh-nha-thuoc3'}/>
                    </div>
                    <div className={'gioithieu-content'}>
                        <p className={'gioithieu-paraph'}>
Nhà thuốc - Phòng chẩn trị đông y <strong style={{color: 'teal'}}>HOÀ THUẬN ĐƯỜNG</strong> được thành lập bởi Lương Y <strong>Nguyễn Tăng Công</strong> nhằm chẩn đoán điều trị và nâng cao sức khoẻ bệnh nhân bằng những phương thuốc đông y gia truyền. 
 <br/><br/>
Cùng với việc không ngừng nghiên cứu phát triển các loại thuốc và những sản phẩm hỗ trợ nâng cao sức khoẻ, 
<strong style={{color: 'teal', textTransform: 'uppercase'}}> Hoà Thuận Đường</strong> cũng liên tục đầu tư vào cơ sở vật chất như phát triển phòng châm cứu, phòng vật lý trị liệu, các vườn dược liệu... 
Nhằm nâng cao chất lượng điều trị cho người bệnh.
<br/><br/>
Bằng tất cả tâm huyết với y học dân tộc và với bệnh nhân, <strong style={{color: 'teal', textTransform: 'uppercase'}}>Hoà Thuận Đường</strong> cam kết sẽ luôn luôn nỗ lực để xứng đáng với niềm tin của bệnh nhân và các đối tác.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default GioiThieuSection;