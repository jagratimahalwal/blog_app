import React from 'react';
import { Posts } from '../Types/posts';
import { RouteProps } from 'react-router';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles } from '@material-ui/core/styles';
import { Theme ,  WithStyles, withStyles } from "@material-ui/core";
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';

const useStyles = ((theme: Theme) => createStyles({
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

}));

interface SearchState {
  error: boolean;
  post: Posts;
}

interface Props extends RouteProps, WithStyles<typeof useStyles>, Posts{ }

class SearchPost extends React.Component<Props, SearchState>{
    constructor(props: Props) {
      super(props);
      this.state = {
        error: false,
        post: null,
      };
    }

    getDataForKey = () => {
      const searchKey = this.props.location.state.searchKey;
      fetch(`https://jsonplaceholder.typicode.com/posts/${searchKey}`)
      .then(response => {
        if(response.status !== 200){
          this.setState({error: true});
          return;
        }
        response.json()
        .then(response => {
            this.setState({
              error: false,
              post:{
                userId:response.userId,
                id: response.id,
                title: response.title,
                body:response.body
              }
            })
          })
      })
      .catch(error => this.setState({error: true}));

    }
    componentDidMount = () =>{
      this.props.location.state.searchKey!==null && (this.getDataForKey())
    }

    componentDidUpdate = (prevProps:Props) => {
      if(this.props.location.state.searchKey !== prevProps.location.state.searchKey)
      this.getDataForKey()
    }

    render(){
      const { classes } = this.props;
      const { error, post } = this.state;
      let resultMarkup;
      if (error) {
        resultMarkup = (<div style={{ width: '100%' }}>
        <Box display="flex" justifyContent="center">
          No result found, please try again
        </Box>
        </div>
        )
      } else if (this.state.post) {
        resultMarkup = (
          <div>

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
                    { post.title }
                    </Typography>
                  </div>
                </Grid>
              </Grid>
            </Paper>
            <Typography variant="h5" color="inherit" paragraph>
              {post.body}
            </Typography>
          </div>
        );
      }

      return(
        <Container maxWidth="lg">
          { resultMarkup }
        </Container>
      );
    }
}

export default withStyles(useStyles)(SearchPost);