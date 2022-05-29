import React,  { useState } from 'react';
import bcrypt from 'bcryptjs';
import { useAppContext, useUpdateAppContext } from '../context';
import { CRUD } from '../crud'
import './Login.css';
import { useEffect } from 'react';

export const Login = () => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const [loginInputs, setLoginInputs] = useState({duplicate: false, note:'', username: '', password: '', first: '', last: ''});

    const handleChange = ({key, value}) => {
        let tmp = {...loginInputs};
        tmp[key] = value;
        setLoginInputs(tmp);
    };

    useEffect(() => {
        const duplicateFound = appContext.users.map(user => user.username).includes(loginInputs.username)
        setLoginInputs({...loginInputs, duplicate: duplicateFound})
    }, [loginInputs.username])

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
                    ...appContext,
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

    const handleCreateClick = () => {
        if(!loginInputs.duplicate){
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(loginInputs.password, salt)
            let tmp = {...loginInputs, salt, password: hash}
            delete(tmp['note'])
            delete(tmp['duplicate'])
            CRUD({method: 'POST', path: 'users', data: tmp})
                .then(res => {
                    console.log(res)
                    const user_id = res.filter(user => user.username === loginInputs.username)[0].id
                    setAppContext({...appContext, username: loginInputs.username, login: false, create: false, myContent: true, user_id, loggedIn: true, users: res})
                })
        }
    }

    return (
        <>
            {appContext.login ?
                <div className='login'>
                    <div className='loginInputs'>
                        <label htmlFor='username'>Username</label>
                        <input className={loginInputs.duplicate && appContext.create ? 'duplicate': ''}
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
                    {appContext.create ?
                        <>
                            <div className='loginInputs'>
                                <label htmlFor='first'>First Name</label>
                                <input 
                                    type='text'
                                    id='first'
                                    value={loginInputs.first}
                                    onChange={e => handleChange({key: 'first', value: e.target.value})}></input>
                            </div>
                            <div className='loginInputs'>
                                <label htmlFor='last'>Last Name</label>
                                <input 
                                    type='text'
                                    id='last'
                                    value={loginInputs.last}
                                    onChange={e => handleChange({key: 'last', value: e.target.value})}></input>
                            </div>
                        </>
                        : null
                    }
                    <div>
                        {appContext.create ?
                            <>
                                <button className='btnLogin' onClick={() => handleCreateClick()}>Create</button>
                                <button className='btnLogin' onClick={() => setAppContext({...appContext, create: false})}>Cancel</button>
                            </>
                            :
                            <>
                                <button className='btnLogin' onClick={() => handleLoginClick()}>Login</button>
                                <button className='btnLogin' onClick={() => setAppContext({...appContext, login: false})}>Cancel</button>
                                <button className='btnLogin' onClick={() => setAppContext({...appContext, create: true})}>Create</button>
                            </>
                        }
                        <div className='note'>{loginInputs.note}</div>
                    </div>
                </div>
                : 
                null
            }
        </>
    )
}