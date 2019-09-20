import React from 'react';
import { Posts } from '../Types/posts';
import { RouteProps } from 'react-router';

interface SearchState {
  error: boolean;
  post: Posts;
}

interface Props extends RouteProps, Posts{ }

class SearchPost extends React.Component<Props, SearchState>{
    constructor(props: Posts) {
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
      if(this.props.location.state.searchKey != prevProps.location.state.searchKey)
      this.getDataForKey()
    }

    render(){
      const { error, post } = this.state;
      let resultMarkup;
      if (error) {
        resultMarkup = (<div>
        <p>No result found, please try again</p>;
        </div>
        )
      } else if (this.state.post) {
        resultMarkup = (
          <div>
            <p>{post.id}</p>
            <p>{post.userId}</p>
            <p>
              { post.title }
            </p>
            <p>
              {post.body}
            </p>
          </div>
        );
      }

      return(
        <div>
          { resultMarkup }
         </div> 
      );
    }
}

export default SearchPost;