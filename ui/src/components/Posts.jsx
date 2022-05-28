import React from 'react';
import PropTypes from 'prop-types';
import './Posts.css'

export const Posts = ({ data, account }) => {
    return (
        <>{data.map((post, index) => (
            <div className='post' key={index}>
                <div className='head'>
                    <div className='title'>
                        {post.title}
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
                    <div className='actions'>
                        {post.user_id === account.user_id ?
                            <>
                                <button>Edit</button>
                                <button>Delete</button>
                            </>
                            : <></>
                        }
                    </div>
                </div>
                <div className='content'>
                    {post.content}
                </div>
            </div>
        ))}</>
    )
}

Posts.propTypes = {
    data: PropTypes.array,
    account: PropTypes.object
}