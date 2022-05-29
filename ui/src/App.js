import React, { useEffect } from 'react';
import { useFetch } from './hooks';
import { Bar, Login, Posts, NewPost } from './components';
import { useAppContext, useUpdateAppContext } from './context';
import './App.css'

function App() {
  const appContext = useAppContext();
  const setAppContext = useUpdateAppContext();
  const { data:users } = useFetch('users');
  const { data:posts } = useFetch('post');

  useEffect(() => {
    setAppContext({...appContext, users, posts})
  }, [users,posts])
  
  useEffect(() => {
    if(appContext.posts.length > 0 && appContext.users.length > 0) {
      let tmp = [...appContext.posts].map(post => {
        let userData = appContext.users.filter(user => user.id === post.user_id)[0]
        return({...post, userData})
      });
      setAppContext({...appContext, data: tmp})
      console.log('data updated')
    }
  },[appContext.users, appContext.posts]);
  useEffect(() => {
    console.log(appContext)
  }, [appContext.data])
  return (
    <div className='app'>
      <Bar />
      <Login />
      <NewPost />
      <Posts />
    </div>
  );
}

export default App;
