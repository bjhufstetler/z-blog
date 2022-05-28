import React, { useEffect, useState } from 'react';
import { useFetch } from './hooks';
import { Bar, Login, CreateAccount, Posts, NewPost } from './components';
import './App.css'

function App() {
  const users = useFetch('users');
  const posts = useFetch('post');
  const [data, setData] = useState([])
  useEffect(() => {
    if(posts.load && users.load) {
      let tmp = [...posts.data].map(post => {
        let userData = users.data.filter(user => user.id === post.user_id)[0]
        return({...post, userData})
      });
      setData(tmp)
    }
  },[users.load, posts.load]);
  return (
    <div className='app'>
      <Bar />
      <Login />
      <CreateAccount />
      <NewPost />
      <Posts data={data} />
    </div>
  );
}

export default App;
