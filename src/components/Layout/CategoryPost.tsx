import React , { useState, useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Posts } from '../Types/posts';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
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

interface  UserId  {
  uId: string;
}

//Defining static categories or user id and searching on the basis of them.
const users = ['1','2','3','4','5','6','7','8','9'];


interface Props extends Posts , RouteComponentProps<UserId> { }

const CategoryPost: React.FC<Props> = ({ match }: RouteComponentProps<UserId>) =>{

  const classes = useStyles({});

  const user_id  = match.params.uId;
  const [details, setDetails] = useState<Service<Posts>>({
    status: 'init'
  });

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?userId=${user_id}`)
    .then(response=> response.json())
    .then(response => setDetails({status: 'loaded', payload: response}))
    .catch(error => setDetails({ status: 'error', error }))
  },[user_id]);


      return(
        <div>
          <Container maxWidth="lg">
            { details.status==='loaded' && <Grid container spacing={5} className={classes.mainGrid}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                For the Category(UserId) : {user_id}
              </Typography>
              <Divider />
              {details.payload.map(item => (
                
                <List className={classes.root}>
                  <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                      <AccountCircleIcon fontSize="large"/>
                    </ListItemAvatar>
                    <ListItemText
                      primary={item.userId}
                      secondary={
                        <React.Fragment>
                          <Typography
                            component="span"
                            variant="body2"
                            className={classes.inline}
                            color="textPrimary"
                          >
                            { item.title }
                          </Typography>
                          <Typography>
                            { item.body}
                          </Typography>
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

export default CategoryPost;