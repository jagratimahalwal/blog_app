import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    progress: {
      margin: theme.spacing(2),
      color: '#1a237e',
    },
  }),
);

const Loader: React.FC<{}> = () => {
  const classes = useStyles({});
  return(
  <div>
    <CircularProgress className={classes.progress} />
  </div>
  );
}

export default Loader;