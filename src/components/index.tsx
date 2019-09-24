import React from 'react';
import Home from './Layout/Home';
import { Route, Switch } from 'react-router-dom';
import SearchPost from './Layout/SearchPost';
import SinglePost from './Layout/SinglePost';
import usePostListing from './Actions/usePostListing';
import CategoryPost from './Layout/CategoryPost';
import Header from './Layout/Navigation/Header';
import { PostProvider } from './PostContext';
import CreateNewPost from './Layout/CreateNewPost';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import Footer from './Layout/Footer';



const theme = createMuiTheme({
  palette: {
    primary: {
      main:'#2196F3',
    },
    secondary:{
      main: '#FFFDE7',
    }
  },
})

const Main: React.FC = () => {
  const service = usePostListing();
  return (
    <div className="App">
      <MuiThemeProvider theme={theme}>
      <Header/>
      <PostProvider value={service}>
      <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/SinglePost/:id" component={SinglePost} />
          <Route exact path="/SearchPost/" component={SearchPost} />
          <Route exact path="/CreateNewPost" component={CreateNewPost}/>
          <Route exact path="/CategoryPost/:uId" component={CategoryPost}  />
      </Switch>
      </PostProvider>
      <Footer />
      </MuiThemeProvider>
    </div>
  );
}

export default Main;
