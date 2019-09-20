import React from 'react';
import Home from './Layout/Home';
import { Route, Switch } from 'react-router-dom';
import SearchPost from './Layout/SearchPost';
import SinglePost from './Layout/SinglePost';
import DeletePost from './Layout'
import usePostListing from './Layout/Listing';
import Header from './Layout/Header';
import { PostProvider } from './PostContext';

const Main: React.FC = () => {
  const service = usePostListing();
  return (
    <div className="App">
      <Header />
      <PostProvider value={service}>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/SinglePost/:id" component={SinglePost} />
          <Route exact path="/SearchPost/" component={SearchPost} />
          <Route exact path="/DeletePost/:id" component={DeletePost} />
      </Switch>
      </PostProvider>
    </div>
  );
}

export default Main;
