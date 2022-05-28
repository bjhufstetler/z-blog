import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { CRUD } from '../crud';
import { useAppContext } from '../context';
import './Posts.css';

export const Post = ({ post }) => {
    const appContext = useAppContext();
    const [edit, setEdit] = useState(false);
    const [deleted, setDeleted] = useState(false);
    const [truthData, setTruthData] = useState({...post})
    const [postUpdates, setPostUpdates] = useState({...post})
    const [full, setFull] = useState(false);
    
    const handleUpdate = ({ key, value }) => {
        let tmp = {...postUpdates};
        tmp[key] = value;
        setPostUpdates(tmp)
    }
    const handleDeleteClick = () => {
        CRUD({method: 'DELETE', path: 'post', data: post})
        setDeleted(true)
    }
    const handleSaveClick = () => {
        let tmp = {...postUpdates};
        delete(tmp['userData']);
        CRUD({method: 'PATCH', path: 'post', data: tmp})
        setTruthData(tmp)
        setEdit(!edit)
    }

    return (
        <>
        {deleted || (appContext.myContent && post.user_id !== appContext.user_id) ?
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
                            : truthData.title
                        }
                        <div className='actions'>
                            {post.user_id === appContext.user_id ?
                                <>
                                    {edit ? 
                                        <button className='save'  onClick={() => handleSaveClick()}>Save</button>
                                        : null
                                    }
                                    <button className='edit' onClick={() => setEdit(!edit)}>{edit ? 'Cancel' : 'Edit'}</button>
                                    <button className='delete' onClick={() => handleDeleteClick()}>Delete</button>
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
                        type='textarea'
                        rows='5'
                        cols='100'
                        value={postUpdates.content}
                        onChange={(e) => handleUpdate({key: 'content', value: e.target.value})}>
                        </textarea>
                        :
                        full ? 
                            <>
                                {truthData.content}
                                <br></br>
                                <button className='expand' onClick={() => setFull(!full)}>Show Less</button>
                            </>
                            : 
                            truthData.content.length > 100 ?
                                <>
                                    {`${truthData.content.slice(0,100)} ...`}
                                    <br></br>
                                    <button className='expand' onClick={() => setFull(!full)}>Show More</button>
                                </>
                                : truthData.content
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