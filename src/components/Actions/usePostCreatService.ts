import { useState } from 'react';
import { Service } from '../Types/Service';
import { Posts } from '../Types/posts';

export type NewPost = Pick<
  Posts,
  'id' | 'userId' | 'title' | 'body'
>;

const usePostCreatService = () => {
  const [service, setService] = useState<Service<NewPost>>({
    status: 'init'
  });

  const publishPost = (post: NewPost) => {
    setService({ status: 'loading' });

    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=utf-8');

    return new Promise((resolve, reject) => {
      fetch('https://jsonplaceholder.typicode.com/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers
      })
        .then(response => response.json())
        .then(response => {
          setService({ status: 'loaded', payload: response });
          resolve(response);
        })
        .catch(error => {
          setService({ status: 'error', error });
          reject(error);
        });
    });
  };

  return {
    service,
    publishPost
  };
};

export default usePostCreatService;