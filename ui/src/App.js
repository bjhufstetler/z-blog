import React, { useEffect, useState } from 'react';
import { useFetch } from './hooks';
import { Bar, Login, CreateAccount, Posts, NewPost } from './components';

function App() {
  const users = useFetch('users');
  const posts = useFetch('posts');
  //const [account, setAccount] = useState({username: null, user_id: null, loggedIn: false})
  const [data, setData] = useState([])
  useEffect(() => {
    if(posts.load && users.load) {
      let tmp = [...posts].map(post => {
        let userData = users.filter(user => user.id === post.user_id)
        return({...post, userData})
      });
      setData(tmp)
    }
  },[users.load, posts.load]);
  return (
    <>
      <Bar />
      <Login />
      <CreateAccount />
      <NewPost />
      <Posts data={data}/>
    </>
  );
}

export default App;
