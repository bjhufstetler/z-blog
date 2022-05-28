import React, { useEffect } from 'react';
import { useFetch } from '../hooks';

export const Bar = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const { data } = useFetch('https://z-blog-api.herokuapp.com/api/users')
        setUsers(data)
    }, [])
    return (
        <>{users.map(user => user.first)}</>
    )
}