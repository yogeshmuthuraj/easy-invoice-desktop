import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
    },
    instructions: {
      marginTop: theme.spacing(1),
      marginBottom: theme.spacing(1),
    },
  }),
);

export default function Header(props) {
  const classes = useStyles();
  const title = 'Easy Invoice';

  return (
    <Typography style={{ fontSize: 30 }} className={classes.instructions}>{title}</Typography>
  );
}
