import React from 'react'
import { Posts } from './Types/posts';
import { Service } from './Types/Service';

const PostContext = React.createContext<Service<Posts> | null>(null);

export const PostProvider = PostContext.Provider
export const PostConsumer = PostContext.Consumer
export default PostContext