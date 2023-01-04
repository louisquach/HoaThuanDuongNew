import React from 'react';
import { useState } from 'react';
import './LoginPage.style.scss'
import { signInWithCredential } from '../../firebase/firebase';
import { useNavigate } from 'react-router';

const LoginPage = () => {
    const [form, setForm] = useState({email: '', password: ''});
    const navigator = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const {email, password} = form;
        if (!email.length || !password.length) return;
        const res = await signInWithCredential(email, password);
        if (res && res.user !== null) {
            navigator('/');
        } else {
            console.error(res);
            return;
        }
    }

    const handleInputChange = (e) => {
        const target = e.target.name;
        const value = e.target.value;
        setForm({...form, [target]: value})
    }

    return (
        <div id='login-container'>
            <div className='login-form'>
                <div className='logo-box'>
                    <img src='/images/hoa-thuan-duong-logo.png' alt='logo'/>
                    <h1>Admin Đăng Nhập</h1>
                </div>
                <div className='login-form-group'>
                    <label >Email Address</label>
                    <input type={'email'} name='email' id='email' placeholder='Admin Email' required onChange={handleInputChange}/>
                </div>
                <div className='login-form-group'>
                    <label >Password</label>
                    <input type='password' name='password' id='password' placeholder='Admin Password' required onChange={handleInputChange}/>
                </div>
                <div className='form-submit'>
                    <button className='submit-btn' onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;