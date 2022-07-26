import * as React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhoneVolume, faGlobe } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF } from '@fortawesome/free-brands-svg-icons';
import './Header.style.scss';

const Header = () => {
    return (
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
                        <img src="images/zalo.png" alt="social network Zalo" className='zalo'/>
                    </a>
                </div>
             </div>
        </div>
    )
}


export default Header;