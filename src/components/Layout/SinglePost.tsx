import React , { useState, useEffect, useContext } from 'react';
import PostContext from '../PostContext';
import { RouteComponentProps } from 'react-router-dom';
import { Posts } from '../Types/posts';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { Theme  } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import { Service } from '../Types/Service';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Link from '@material-ui/core/Link';

const useStyles = makeStyles((theme:Theme) => ({
  mainFeaturedPost: {
    position: 'relative',
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: 'url(https://source.unsplash.com/user/erondu)',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,.3)',
  },
  mainFeaturedPostContent: {
    position: 'relative',
    padding: theme.spacing(3),
    [theme.breakpoints.up('md')]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  markdown: {
    ...theme.typography.body2,
    padding: theme.spacing(3, 0),
  },
  root: {
    width: '100%',
    maxWidth: 660,
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
  sidebarSection: {
    marginTop: theme.spacing(3),
  },
}));

interface  PostId  {
  id: string;
}

interface PostDetailsState {
  body: string;
  email: string;
  name: string;
  id: string;
  postId: string;
}

const users = ['1','2','3','4','5','6','7','8','9'];


interface Props extends Posts , RouteComponentProps<PostId> { }

const SinglePost: React.FC<Props> = ({ match }: RouteComponentProps<PostId>) =>{

  const classes = useStyles({});

  const dataList = useContext(PostContext);
  const urlId  = match.params.id;
  let userId, id, title , body;

  const [details, setDetails] = useState<Service<PostDetailsState>>({
    status: 'init'
  });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/comments?postId=${urlId}`)
    .then(response=> response.json())
    .then(response => setDetails({status: 'loaded', payload: response}))
    .catch(error => setDetails({ status: 'error', error }))
  },[urlId]);

  //Reading the data from the context and not calling the API again with the ID.
  if(dataList.status!=='loaded'){
    userId=''; 
    id=''; 
    title='';
    body='';
  }else{
    let postData = dataList.payload.find(item => (item.id == urlId)); // Searching for the id in the context response
    userId=postData.userId;
    id=postData.id;
    title=postData.title
    body=postData.body;
  }
      return(
        <div>
          <Container maxWidth="lg">
          <Paper className={classes.mainFeaturedPost}>
              {
                <img
                  style={{ display: 'none' }}
                  src="https://source.unsplash.com/user/erondu"
                  alt="background"
                />
              }
              <div className={classes.overlay} />
              <Grid container>
                <Grid item md={6}>
                  <div className={classes.mainFeaturedPostContent}>
                    <Typography component="h1" variant="h3" color="inherit" gutterBottom>
                      {title}
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            { details.status==='loaded' && <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                From the Firehose for the category(user) : {userId} and Post ID : {id}
              </Typography>
              <Divider />
              <Typography variant="h5" color="inherit" paragraph>
                      {body}
              </Typography>
              {details.payload.map(item => (
                
                <List className={classes.root} key={item.id}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AccountCircleIcon fontSize="large"/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.email}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            { item.email }
                          </Typography>
                          { item.body}
                        </React.Fragment>
                      }
                    />
                  </ListItem>
                </List>
              ))}
            </Grid>
                <Grid item xs={12} md={4}>
                <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                      Categories
                </Typography>
                {users.map(user => (
                    <Link display="block" variant="body1" href={`/CategoryPost/${user}`} key={user}>
                      {user}
                    </Link>
                  ))}
                </Grid>
            </Grid>}
          </Container>
        </div>
      );
};

export default SinglePost;