import * as React from 'react';
import { useEffect, useState } from 'react';
import LienHeSection from '../TrangChu/Components/LienHeSection/LienHe';
import './LienHePage.style.scss'
import Separator from '../../component/Separator/Separator';
import Loader
 from '../../component/Loader/Loader';
const LienHePage = () => {
    const [loading, setLoading] = useState(true);

    useEffect( () => {
        setTimeout(() => {
            setLoading(false)
        }, 500);

        return () => clearTimeout(() => setLoading(false));
    },[])

    if (loading) {
        return <Loader visible={loading}/>
    }
    return (
        <div id={'lienhe-page-container'}>
            
            <Separator title={'Liên Hệ Tư Vấn'}/>
            <h3 style={{textAlign: 'center', paddingTop: "3rem", marginBottom: '-2rem', color: 'teal'}}>
                Vui lòng gửi lại lời nhắn, chúng tôi sẽ liên hệ với bạn sớm nhất!
            </h3>
        <LienHeSection />
        </div>
    )
}

export default LienHePage;