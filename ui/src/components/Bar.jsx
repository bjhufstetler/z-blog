import React from 'react';
import './Bar.css'
import { useAppContext, useUpdateAppContext } from '../context';

export const Bar = () => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();

    return (
        <div className='navBar'>
            <button className='logo' onClick={() => setAppContext({...appContext, myContent: false, login: false})}>Z BLOG</button>
            <div>
                {appContext.loggedIn ?
                    <>
                        <button className='userId' onClick={() => setAppContext({...appContext, myContent: true})}>{`@${appContext.username}`}</button>
                        <button className='btnStartLogin' onClick={() => setAppContext({myContent: false, login: false, loggedIn: false, username: null, userId: null})}>Logout</button>
                    </>
                    :
                    appContext.login ?
                        null : <button className='btnStartLogin' onClick={() => setAppContext({...appContext, login: true})}>Login</button>
                }
            </div>
        </div>
    )
}