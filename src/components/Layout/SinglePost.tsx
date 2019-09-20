import React , { useContext } from 'react';
import PostContext from '../PostContext';
import { RouteComponentProps } from 'react-router-dom';
import { Posts } from '../Types/posts';

interface  PostId  {
  id: string;
}

interface Props extends Posts , RouteComponentProps<PostId> { }

const SinglePost: React.FC<Props> = ({ match }: RouteComponentProps<PostId>) =>{

  const dataList = useContext(PostContext);
  const urlId  = match.params.id;
  let userId, id, title , body;
  if(dataList.status!=='loaded'){
    userId=''; 
    id=''; 
    title='';
    body='';
  }else{
    let postData = dataList.payload.find(item => (item.id == urlId));
    userId=postData.userId;
    id=postData.id;
    title=postData.title
    body=postData.body;
  }
      return(
        <div>
         kuch to aaja!
         {title}
         <p>{userId}</p>
         <p>{body}</p>
        </div>
      );
};

export default SinglePost;