import * as React from 'react';
import './Separator.style.scss';

const Separator = ({title}) => {
    return (
        <>
        <h1 className={'section-header'}>{title}</h1>
        <div className={'section-separator'}>
            <div style={{padding: '0 1rem', backgroundColor: 'white'}}>
                <img src={'/images/hoa-thuan-duong-logo.png'} alt='hoa thuan duong logo' />
            </div>
        </div>
        </>
    )
}

export default Separator;