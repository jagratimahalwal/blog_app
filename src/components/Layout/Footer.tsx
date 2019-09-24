import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { Theme  } from "@material-ui/core";

const useStyles = makeStyles((theme:Theme) => ({ 
  footer: {
    backgroundColor: theme.palette.background.paper,
    marginTop: theme.spacing(8),
    padding: theme.spacing(6, 0),
  },
}));
const Copyright = () => {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
          Jagrati
          jagratimahalwal1992@gmail.com
      </Typography>
    );
  }

const Footer = () => {
    const classes = useStyles({});
    return (
        <footer className={classes.footer}>
        <Container maxWidth="lg">
          <Typography variant="subtitle1" align="center" color="textSecondary" component="p">
           Footer of the blog {new Date().getFullYear()}
          </Typography>
          <Copyright />
        </Container>
      </footer>
     );
}
 
export default Footer;