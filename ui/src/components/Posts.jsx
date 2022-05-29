import React from 'react';
import { Post } from './'
import { useAppContext } from '../context';
import './Posts.css'

export const Posts = () => {
    const appContext = useAppContext();
    return (
        <>{[...appContext.data].sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1).map((post, index) => (
            <Post post={post} key={index} />
        ))}</>
    )
}
