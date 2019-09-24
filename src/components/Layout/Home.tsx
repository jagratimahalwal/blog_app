import React , {useContext} from 'react';
import ListAll from './ListAll';
import PostContext from '../PostContext';
import Loader from './Loader';
import Box from '@material-ui/core/Box';

                                                                    
const Home: React.FC<{}> = () => {
  //const service = usePostListing();
  const  service  = useContext(PostContext);
  return (
    <div>
        {service.status === 'loading' && (
          <div style={{ width: '100%' }}>
          <Box display="flex" justifyContent="center">
            <Loader />
          </Box>
        </div>
        )}
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
