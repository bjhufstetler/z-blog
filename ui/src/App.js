import React from 'react';
//import config from './config'
import { useAppContext } from './context';
import { useFetch } from './hooks';
//const ApiUrl = config[process.env.REACT_APP_NODE_ENV || "development"].apiUrl;

function App() {
const appContext = useAppContext();
const posts = useFetch(appContext.postURL)
  return (
    <div>
      App is running - good work: 
      {posts.map(post => post.title)}
    </div>
  );
}

export default App;
