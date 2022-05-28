import React,  { useState } from 'react';
import { useAppContext, useUpdateAppContext } from '../context';
import './Login.css'

export const Login = () => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const [loginInputs, setLoginInputs] = useState({username: '', password: ''})

    const handleChange = ({key, value}) => {
        let tmp = {...loginInputs};
        tmp[key] = value;
        setLoginInputs(tmp);
    }
    const handleLogin = () => {

    };
    return (
        <>
            {appContext.login ?
                <div className='login'>
                    <div className='loginInputs'>
                        <label htmlFor='username'>Username</label>
                        <input 
                            type='text'
                            id='username'
                            value={loginInputs.username}
                            onChange={e => handleChange({key: 'username', value: e.target.value})}></input>
                    </div>
                    <div className='loginInputs'>
                        <label htmlFor='password'>Password</label>
                        <input 
                            type='password'
                            id='password'
                            value={loginInputs.password}
                            onChange={e => handleChange({key: 'password', value: e.target.value})}></input>
                    </div>
                    <div>
                        <button className='btnLogin' onClick={() => handleLogin()}>Login</button>
                        <button className='btnCancelLogin' onClick={() => setAppContext({...appContext, login: false})}>Cancel</button>
                    </div>
                </div>
                : 
                null
            }
        </>
    )
}