import React , {useContext} from 'react';
import ListAll from './ListAll';
import PostContext from '../PostContext';
                                                                    
const Home: React.FC<{}> = () => {
  //const service = usePostListing();
  const  service  = useContext(PostContext);
  return (
    <div>
      {service.status === 'loading' && <div>Loading...</div>}
      {service.status === 'loaded' &&
      <div>
          <ListAll />
      </div>
      }
      {service.status === 'error' && (
        <div>Error, the backend moved to the dark side.</div>
      )}
      
    </div> 
  );
};

export default Home;
