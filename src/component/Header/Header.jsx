import * as React from 'react';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faGlobe, faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './Header.style.scss';
import { AppContext } from '../../context/AppContextProvider';
import { googleSignOut } from '../../firebase/firebase';

const Header = ({menus}) => {
    const [activeTab, setActiveTab] = useState('/');
    const context = React.useContext(AppContext);
    const navigator = useNavigate();

    const location = useLocation();
    React.useEffect( () => {
        if (location !== null) {
            setActiveTab(location.pathname)
        }
    },[location])

    const handleSignout = () => {
        navigator('/');
        googleSignOut();
        context.logout();
    }
    return (
        <div className={'header-container'}>
        <div className={'header'}>
             <div className={'social-contact'}>
                <div className={'header-phone-box'}>
                    <FontAwesomeIcon 
                        className={'header-icon'}
                        icon={faPhoneVolume} 
                        style={{color: '#dd9933', fontSize: '1.3em', marginRight: '.5rem'}}
                    />
                    <span className={'header-text'}>Liên hệ: 0937271186</span>
                </div>
                
                <div className={'header-social-box'}>
                <FontAwesomeIcon 
                    icon={faGlobe} 
                    style={{color: 'teal', fontSize: '1.3em', marginRight: '.5rem'}}
                />
                    <span style={{marginRight: '1rem'}}>Mạng xã hội</span>
                    <a href='https://facebook.com'>
                        <FontAwesomeIcon 
                        icon={faFacebookF}
                        className={'header-icon'}
                        />
                    </a>
                    <a href="https://zalo.com.vn">
                        <img src="/images/zalo.png" alt="social network Zalo" className='zalo'/>
                    </a>
                </div>
             </div>
        </div>
        <div className={'header-main'}>
            <div className={'header-main-intro'}>
                <img className={'header-logo'} src={'/images/hoa-thuan-duong-logo.png'} alt={'logo'}/>
                <div>
                    <h4 className={'header-h4'}>Nhà Thuốc - Phòng Chẩn Trị Đông Y</h4>
                    <h1 className={'header-h1'}>Hoà Thuận Đường</h1>
                </div>
            </div>
            <div className={'header-main-nav'}>
                {menus.map( item => {
                        return (
                            <Link to={item.path} className={activeTab === item.path ? 'header-menu-item active' : 'header-menu-item'} key={item.path} >{item.name}</Link>
                        )
                    })
                }
                { context.logged && 
                    <>
                        <Link to={'/quanly'} className={activeTab === '/quanly' ? 'header-menu-item active' : 'header-menu-item'}>Quản Lý</Link>
                        <button className={'sign-off-btn'} onClick={handleSignout}>
                            <FontAwesomeIcon icon={faPowerOff} />
                        </button>
                    </>
                }
            </div>
        </div>
        </div>
    )
}


export default Header;