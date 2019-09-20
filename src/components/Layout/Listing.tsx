import { useEffect, useState } from 'react';
import { Service } from '../Types/Service';
import { Posts } from '../Types/posts';

const usePostListing = () => {
  const [results, setResult] = useState<Service<Posts>>({
    status: 'loading'
  });
  
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(response => setResult({ status: 'loaded', payload: response }))
      .catch(error => setResult({ status: 'error', error }));
  }, []);
  return results;
};

export default usePostListing;