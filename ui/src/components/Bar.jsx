import React, { useEffect, useState } from 'react';
import { useFetch } from '../hooks';

export const Bar = () => {
    const [users, setUsers] = useState([]);
    const { data } = useFetch('users')
    useEffect(() => {
        setUsers(data)
    }, [data])
    return (
        <>{users.map(user => user.first)}</>
    )
}