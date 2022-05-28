import React, { useEffect, useState } from 'react';
import { useFetch } from './hooks';
import { Bar, Login, CreateAccount, Posts, NewPost } from './components';

function App() {
  const users = useFetch('users');
  const posts = useFetch('post');
  const [account, setAccount] = useState({username: 'aaa', user_id: 1, loggedIn: false})
  const [data, setData] = useState([])
  useEffect(() => {
    if(posts.load && users.load) {
      let tmp = [...posts.data].map(post => {
        let userData = users.data.filter(user => user.id === post.user_id)[0]
        return({...post, userData})
      });
      setData(tmp)
      console.log('tmp', tmp)
    }
  },[users.load, posts.load]);
  return (
    <>
      <Bar />
      <Login />
      <CreateAccount />
      <NewPost />
      <Posts data={data} account={account}/>
    </>
  );
}

export default App;
