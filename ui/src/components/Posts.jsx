import React from 'react';
import PropTypes from 'prop-types';
import { Post } from './'
import './Posts.css'

export const Posts = ({ data }) => {
    return (
        <>{data.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).map((post, index) => (
            <Post post={post} key={index} />
            
        ))}</>
    )
}

Posts.propTypes = {
    data: PropTypes.array
}