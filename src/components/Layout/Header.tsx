import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Link } from 'react-router-dom';

interface searchValue{
  inputValue: string;
  path: string;
}

class  Header extends React.Component<{}, searchValue> {

  searchRef: React.RefObject<HTMLInputElement>;
  constructor(props: searchValue){
    super(props);
    this.state = {
      inputValue: null,
      path: null
    }
    this.searchRef = React.createRef();
  }

  handelChange = () =>{
    this.setState({
      inputValue: this.searchRef.current.value,
      path: `/SearchPost/${this.state.inputValue}`
    })
  }

  render () {
    return (
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h2">
            Simple Blog Example
          </Typography>
          <input type='text' onChange={this.handelChange} ref={this.searchRef}/>
          <Link to={{pathname :`/SearchPost/`, state:{searchKey:`${this.state.inputValue}`}}} > Search</Link>
          <Link to="/">Home</Link>
        </Toolbar>
      </AppBar>
    );
  }
};
export default Header;