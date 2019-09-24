import React from 'react';
import usePostCreateService , { NewPost } from '../Actions/usePostCreatService';
import Loader from './Loader';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Theme  } from "@material-ui/core";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme:Theme) => ({
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const CreateNewPost: React.FC<{}> = () => {

  const classes = useStyles({});

  //Setting initial state of the form

  const initialPostState: NewPost = {
    userId: '',
    id: '',
    title: '',
    body: ''
  };
  const [post, setPost] = React.useState<NewPost>(
    initialPostState
  );

  //Posting data to API and stroning response
  const { service, publishPost } = usePostCreateService();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist();
    setPost(prevPost => ({
      ...prevPost,
      [event.target.name]: event.target.value
    }));
  };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    publishPost(post).then(() => setPost(initialPostState));
    handleClickOpen();
  };

  //Dialouge box handling to show the response of the API
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setPost(initialPostState);
    setOpen(false);
    window.location.reload(false);
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5">
        Create Post
      </Typography>
      <form className={classes.form} onSubmit={handleFormSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="userId"
                name="userId"
                variant="outlined"
                required
                fullWidth
                id="userId"
                label="Category"
                autoFocus
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="title"
                label="Title"
                name="title"
                autoComplete="title"
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="post-content"
                label="Content"
                type="post-content"
                id="post-content"
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Create Post
          </Button>
        </form>
        {service.status === 'loading' && (
        <div className="loader-container">
          <Loader />
        </div>
      )}
      
        <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="alert-dialog-title" aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">{"Response"}</DialogTitle>
            <DialogContent>
            {service.status === 'loaded' && ( <DialogContentText id="alert-dialog-description">
              Your Post has been submitted. Will update on Home Page Shortly.
               Your Post ID is : 101
               Original Post :{JSON.stringify(service.payload)}
              </DialogContentText>)}
              {service.status === 'error' && (
              <DialogContentText id="alert-dialog-description">
                A disturbance in the force prevented your post to be submitted.
              </DialogContentText>
            )}
            </DialogContent> 
            
            <DialogActions>
              <Button onClick={handleClose} color="primary" autoFocus>
                OK
              </Button>
            </DialogActions>
          </Dialog>
          
          </div>
      </Container>
    </div>
  );
};

export default CreateNewPost;