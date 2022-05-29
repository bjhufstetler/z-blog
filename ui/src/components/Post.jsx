import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRUD } from '../crud';
import { useAppContext, useUpdateAppContext } from '../context';
import './Posts.css';
import { useEffect } from 'react';

export const Post = ({ post }) => {
    const appContext = useAppContext();
    const setAppContext = useUpdateAppContext();
    const [edit, setEdit] = useState(false);
    const [postUpdates, setPostUpdates] = useState({...post})
    const [full, setFull] = useState(false);
    
    useEffect(() => {
        setPostUpdates({...post})
    }, [post])

    const handleUpdate = ({ key, value }) => {
        let tmp = {...postUpdates};
        tmp[key] = value;
        setPostUpdates(tmp)
    }

    const handleDeleteClick = () => {
        CRUD({method: 'DELETE', path: 'post', data: post})
            .then(res => {
                setAppContext({...appContext, posts: res})
            })
    }

    const handleSaveClick = () => {
        let tmp = {...postUpdates};
        delete(tmp['userData']);
        CRUD({method: 'PATCH', path: 'post', data: tmp})
            .then(res => {
                setAppContext({...appContext, posts: res})
            })
        setEdit(!edit)
    }

    return (
        <>
        {appContext.myContent && post.user_id !== appContext.user_id ?
            null :
            <div className='post'>
                <div className='head'>
                    <div className='title'>
                        {edit ?
                            <input 
                            type='text'
                            value={postUpdates.title}
                            onChange={(e) => handleUpdate({key: 'title', value: e.target.value})}>
                            </input>
                            : post.title
                        }
                        <div className='actions'>
                            {post.user_id === appContext.user_id ?
                                <>
                                    {edit ? 
                                        <button className='save'  onClick={() => handleSaveClick()}>Save</button>
                                        : 
                                        <button className='delete' onClick={() => handleDeleteClick()}>Delete</button>
                                    }
                                    <button className='edit' onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit'}</button>
                                </>
                                : null
                            }
                        </div>
                    </div>
                    <div className='author'>
                        <div className='username'>
                            {`@${post.userData.username}`}
                        </div>
                        <div className='name'>
                            {`${post.userData.first} ${post.userData.last}`}
                        </div>
                        <div className='timestamp'>
                            {post.timestamp}
                        </div>
                    </div>
                </div>
                <div className='content'>
                    {edit ?
                        <textarea 
                        rows='5'
                        cols='100'
                        value={postUpdates.content}
                        onChange={(e) => handleUpdate({key: 'content', value: e.target.value})}>
                        </textarea>
                        :
                        full ? 
                            <>
                                {post.content}
                                <br></br>
                                <button className='expand' onClick={() => setFull(!full)}>Show Less</button>
                            </>
                            : 
                            post.content.length > 100 ?
                                <>
                                    {`${post.content.slice(0,100)} ...`}
                                    <br></br>
                                    <button className='expand' onClick={() => setFull(!full)}>Show More</button>
                                </>
                                : post.content
                    }
                </div>
            </div>
        }
        </>
    )
};

Post.propTypes = {
    post: PropTypes.object,
    account: PropTypes.object
}