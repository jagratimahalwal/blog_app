import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';
import { Theme, WithStyles, withStyles  } from "@material-ui/core";
import { createStyles} from '@material-ui/core/styles';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SvgIcon from '@material-ui/core/SvgIcon';

const useStyles = ((theme: Theme) => createStyles({
  root:  {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'flex-start',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
    color: "secondary",
  },
  searchIcon: {
    width: theme.spacing(8),
    height: '100%',
    position: 'absolute',
    display: 'flex',
    alignItems: 'inherit',
    justifyContent: 'center',
  },
  search: {
    position: 'relative',
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  iconRightAlign: {
    marginLeft: '80%',
    marginRight: '10%',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 2),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 80,
      '&:focus': {
        width: 200,
      },
    },
  },
}));

export interface IProps extends WithStyles<typeof useStyles> {}

interface searchValue{
  inputValue: string;
  path: string;
}



class  Header extends React.Component<IProps, searchValue> {

  searchRef: React.RefObject<HTMLInputElement>;
  constructor(props: IProps){
    super(props);
    this.state = {
      inputValue: null,
      path: null
    }
    this.searchRef = React.createRef();
  }

  //Get the data of input box and setting in state
  handelChange = () =>{
    this.setState({
      inputValue: this.searchRef.current.value,
      path: `/SearchPost/${this.searchRef.current.value}`
    })
  }
  // Setting the state and input box field to blank
  handleSearch = () =>{
    this.searchRef.current.value='';
    this.setState({
      inputValue: null

    })
  }
  
  render () {
    const { classes } = this.props;
    return (
      <AppBar position="static">
        <Toolbar> 
        <Typography
            component="h1"
            variant="h2"
            color="inherit"
            align="center"
            noWrap
            className={classes.toolbarTitle}
          >
          My Blog
          </Typography>
        </Toolbar>
        <Toolbar component="nav" variant="dense" >
            <Link to="/" className={classes.toolbarLink}>
              <HomeIcon fontSize="large" color="secondary" />
            </Link>
            <Link to="/CreateNewPost" className={classes.toolbarLink} style={{ fontSize: 25 }}>
              <PostAddIcon fontSize="large" color="secondary"/>
            </Link>
            <Link onClick={this.handleSearch} className={classes.toolbarLink}  to={{pathname :`/SearchPost/`, state:{searchKey:`${this.state.inputValue}`}}} >
                <SearchIcon />
              </Link>
                <InputBase onChange={this.handelChange}  inputRef={this.searchRef}
                  placeholder="Search…"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                />
              
              <a rel="noopener noreferrer"  className={classes.iconRightAlign} href="https://github.com/jagratimahalwal"  target="_blank">
                  <SvgIcon style={{ fontSize: 25 }}>
                  <path fill="#000000" d="M5,3H19A2,2 0 0,1 21,5V19A2,2 0 0,1 19,21H14.56C14.24,20.93 14.23,20.32 14.23,20.11L14.24,17.64C14.24,16.8 13.95,16.25 13.63,15.97C15.64,15.75 17.74,15 17.74,11.53C17.74,10.55 17.39,9.74 16.82,9.11C16.91,8.89 17.22,7.97 16.73,6.73C16.73,6.73 15.97,6.5 14.25,7.66C13.53,7.46 12.77,7.36 12,7.35C11.24,7.36 10.46,7.46 9.75,7.66C8.03,6.5 7.27,6.73 7.27,6.73C6.78,7.97 7.09,8.89 7.18,9.11C6.61,9.74 6.26,10.55 6.26,11.53C6.26,15 8.36,15.75 10.36,16C10.1,16.2 9.87,16.6 9.79,17.18C9.27,17.41 7.97,17.81 7.17,16.43C7.17,16.43 6.69,15.57 5.79,15.5C5.79,15.5 4.91,15.5 5.73,16.05C5.73,16.05 6.32,16.33 6.73,17.37C6.73,17.37 7.25,19.12 9.76,18.58L9.77,20.11C9.77,20.32 9.75,20.93 9.43,21H5A2,2 0 0,1 3,19V5A2,2 0 0,1 5,3Z" />
                  </SvgIcon>
              </a>
        </Toolbar>
      </AppBar>
    );
  }
};
export default withStyles(useStyles)(Header);