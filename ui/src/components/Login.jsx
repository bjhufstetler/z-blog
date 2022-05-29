import React,  { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useAppContext, useUpdateAppContext } from '../context';
import './Login.css';

export const Login = () => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const [loginInputs, setLoginInputs] = useState({note:'', username: '', password: ''});

    const handleChange = ({key, value}) => {
        let tmp = {...loginInputs};
        tmp[key] = value;
        setLoginInputs(tmp);
    };

    const handleLoginClick = () => {
        let note = 'Unknown Username';
        const userFound = appContext.users?.filter(user => user.username === loginInputs.username)[0];
        let userAuth = false;
        if ( userFound ) {
            note = 'Invalid Password';
            const hash = userFound.password;
            const salt = userFound.salt;
            const authHash = bcrypt.hashSync(loginInputs.password, salt);
            userAuth = authHash === hash;
        }
        if (userAuth) { 
            note = '';
            setAppContext(
                {
                    username: loginInputs.username,
                    user_id: userFound.id,
                    login: false,
                    loggedIn: true,
                    myContent: true
                }
            );
        } else {
            setLoginInputs({...loginInputs, password: ''});
        }
        setLoginInputs({...loginInputs, note});
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
                        <button className='btnLogin' onClick={() => handleLoginClick()}>Login</button>
                        <button className='btnCancelLogin' onClick={() => setAppContext({...appContext, login: false})}>Cancel</button>
                        <div className='note'>{loginInputs.note}</div>
                    </div>
                </div>
                : 
                null
            }
        </>
    )
}