import React , {useState , useEffect, useContext} from 'react';
import PostContext from '../PostContext';
import { Service } from '../Types/Service';
import { Posts } from '../Types/posts';
import { makeStyles } from '@material-ui/core/styles';
import { Theme, IconButton  } from "@material-ui/core";
import Link from '@material-ui/core/Link';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/icons/Delete';
import Loader from './Loader';
import Box from '@material-ui/core/Box';
import moment from 'moment';


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
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));


const ListAll: React.FC<{}> = () =>{

  const classes = useStyles({});

  //Setting state for rendering posts and handle delete action.

  const [service, setResult] = useState<Service<Posts>>({
    status: 'loading'
  });

  // Getting data from the context and rendering it on the page
  const  contextData  = useContext(PostContext)

  //UseEffect hook to set the payload if data is properly loaded from the context.
  useEffect(() => {
    contextData.status==='loaded' && setResult({status: 'loaded', payload:contextData.payload})
  },[contextData.status])  


  //Deleting the post with the post id.
    const deletePost = (id:string) => {
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
        method: 'DELETE'
        })
          .then(response => {
              if (response.status === 200 && service.status==='loaded') {
                  let result = service.payload.filter(post => (
                      post.id !== id
                  ));
                  setResult({status:'loaded',payload:result})
              } 
          })
    }

      return(
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="lg">
          {service.status === 'loading' && (
            <div style={{ width: '100%' }}>
              <Box display="flex" justifyContent="center">
                <Loader />
              </Box>
            </div>
          )}
          {service.status === 'loaded' &&
          <main>
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
                  Blogging App...You search we provide
                </Typography>
                <Typography variant="h5" color="inherit" paragraph>
                  Multiple blogs being posted and updated frequently, providing the list for all the posted blogs.
                </Typography>
              </div>
            </Grid>
          </Grid>
        </Paper>
         <Grid container spacing={4} >
          {(service.payload).map((post) => (

            <Grid item key={post.title} xs={12} md={6}>
            <CardActionArea>
              <Card className={classes.card}>
                <div className={classes.cardDetails}>
                  <CardContent>
                    <Typography component="h2" variant="h5">
                      {post.title}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      {moment().fromNow()}
                    </Typography>
                    <Typography variant="subtitle1" color="textSecondary">
                      Category: {post.userId}
                    </Typography>
                    <Typography variant="subtitle1" paragraph>
                    {post.body.length > 100 ? `${post.body.substr(0, 100)}...` : post.body}
                    </Typography>
                    <Link href={`/SinglePost/${post.id}`} variant="subtitle1" color="primary">
                      Continue reading...
                    </Link>
                    
                    <IconButton onClick={() => deletePost(post.id)} ><DeleteIcon /></IconButton>
                    
                  </CardContent>
                </div>
                <Hidden xsDown>
                  <CardMedia
                    className={classes.cardMedia}
                    image="https://source.unsplash.com/random"
                    title="Image title"
                  />
                </Hidden>
              </Card>
            </CardActionArea>
            </Grid>   
          ))}
        </Grid>
        </main>}
        </Container>
        </React.Fragment>
      );
};

export default ListAll;