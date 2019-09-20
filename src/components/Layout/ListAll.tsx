import React , {useContext} from 'react';
import PostContext from '../PostContext';
import {Link} from 'react-router-dom';

const ListAll: React.FC<{}> = () =>{

  const  service  = useContext(PostContext)
      return(
        <div>
          {service.status === 'loaded' &&
         <ul>
          {(service.payload).map((item) => (
              <li key={item.id} >  {item.title}
              <Link to={{pathname : `/SinglePost/${item.id}`}} >  Show More</Link>
              <Link to={{pathname : `/SinglePost/${item.id}`}} >  Delete</Link>
              </li> 
          ))}
        </ul>}
        </div>
      );
};

export default ListAll;