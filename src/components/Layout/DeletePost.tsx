import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { Posts } from '../Types/posts';

interface  PostId  {
  id: string;
}

interface Props extends Posts , RouteComponentProps<PostId> { }

const DeletePost: React.FC<Props> = ({ match }: RouteComponentProps<PostId>) =>{
  return(
    <div>
      kuch to aaja!
    </div>
  );
};

export default DeletePost;