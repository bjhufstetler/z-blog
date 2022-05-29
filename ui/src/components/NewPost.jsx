import React,  { useState } from 'react';
import { useAppContext, useUpdateAppContext } from '../context';
import { CRUD } from '../crud';
import './NewPost.css';

export const NewPost = () => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const [postInputs, setPostInputs] = useState({
        title: '',
        content: ''
    })

    const handleChange = ({key, value}) => {
        let tmp = {...postInputs};
        tmp[key] = value;
        setPostInputs(tmp);
    }

    const handleSubmitClick = () => {
        const timestamp = new Date;
        const tmp = {...postInputs, user_id: appContext.user_id, timestamp};
        CRUD({method: 'POST', path: 'post', data: tmp})
            .then(res => {
                setAppContext({...appContext, posts: res})
            })
    }
    return (
        <>
            {appContext.loggedIn ?
                <div className='newPost'>
                    <div className='newPostHead'>
                        Create a new post
                    </div>
                    <div className='loginInputs'>
                        <label htmlFor='title'>Title</label>
                        <textarea 
                            rows='1'
                            cols='100'
                            id='title'
                            value={postInputs.title}
                            onChange={e => handleChange({key: 'title', value: e.target.value})}></textarea>
                    </div>
                    <div className='loginInputs'>
                        <label htmlFor='content'>Content</label>
                        <textarea 
                            rows='5'
                            cols='100'
                            id='content'
                            value={postInputs.content}
                            onChange={e => handleChange({key: 'content', value: e.target.value})}></textarea>
                    </div>
                    <div>
                        <button className='btnLogin' onClick={() => handleSubmitClick()}>Submit</button>
                        <button className='btnCancelLogin' onClick={() => setPostInputs({title: '', content: ''})}>Clear</button>
                    </div>
                </div>
                : 
                null
            }
        </>
    )
}