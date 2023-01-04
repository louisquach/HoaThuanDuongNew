import * as React from 'react';
import { ThreeDots } from 'react-loader-spinner';
import './Loader.style.scss';


const Loader = ({visible}) => {
    return (
        <div id={'loader-container'}>
            <ThreeDots 
            height="80" 
            width="80" 
            radius="9"
            color="#4fa94d" 
            ariaLabel="three-dots-loading"
            wrapperStyle={{}}
            wrapperClassName="loader-container"
            visible={visible}
            />
        </div>
    )
}


export default Loader;