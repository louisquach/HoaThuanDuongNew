import React, { useState } from 'react';
import "./input.scss"

const Input = (props) => {
    const {name, placeholder, onChange, type,...otherprops} = props;
    const [emailErr, setErr] = useState(false)

    const handleOnchange = (event) => {
        event.preventDefault();

        let {name, value} = event.currentTarget;
        value = value.replace(' ', '');
        if (name === 'email') {
            let isValid = value.match(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
            if (!isValid) {
                setErr(true)
                return
            }
        }
        onChange(name, value)
    }

    return (
        <div className="input__container">
            <label>{placeholder}</label> 
            <input 
            onChange={handleOnchange} 
            type={type} 
            className='input__container-input' 
            name={name} {...otherprops} 
            placeholder={placeholder} 
            required
            autoComplete='off'
            />
            { emailErr && name === 'email' && 
                <p>{emailErr}</p>
            }
        </div>
    )
}

export default Input;