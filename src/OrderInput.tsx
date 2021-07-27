import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded';

import Header from './CommonComponents/Header';
import TabStepper from './CommonComponents/TabStepper';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  input: {
    display: 'none',
  },
}));


export default function OrderInput(props) {
  const history = useHistory();
  const classes = useStyles();

  function handleFetch() {
    history.push('/fetchOrders');
  }

  function handleUpload(csvJson) {
    history.push({
      pathname: '/orderDisplay',
      state: {
        rows: csvJson,
      },
    });
  }

  let fileReader;

  const handleFileRead = () => {
    const content = fileReader.result;

    const csv = require('csvtojson');

    (async () => {
      const jsonObj = await csv().fromString(content);

      handleUpload(jsonObj);
    })();
  };

  const handleFileChosen = (file) => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(file);
  };

  const uploadButton = (
    <div>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        accept=".csv"
        onChange={(e) => handleFileChosen(e.target.files[0])}
      />
      <label htmlFor="contained-button-file">
        <Button
          variant="contained"
          color="primary"
          component="span"
          startIcon={<CloudUploadRoundedIcon />}
        >
          Upload
        </Button>
      </label>
    </div>
  );
  const fetchButton = (
    <Button
      variant="contained"
      color="primary"
      onClick={handleFetch}
      disabled
      startIcon={<CloudDownloadRoundedIcon />}
    >
      Fetch
    </Button>
  );

  function closeApp() {
    window.close();
  }

  return (
    <>
      <Header />
      <div
        style={{
          marginTop: 20,
          padding: 10,
          backgroundColor: 'gainsboro',
          borderWidth: 0,
          borderColor: 'grey',
          borderStyle: 'solid',
          borderRadius: '10px',
          overflow: 'hidden',
        }}
      >
        <TabStepper activeStep={0} />
        <div className={classes.root}>
          <Button
            style={{ float: 'right' }}
            variant="contained"
            onClick={closeApp}
            className="margin-top-20 pull-left"
          >
            Close
          </Button>
          <Grid container spacing={3}>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{uploadButton}</Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper className={classes.paper}>{fetchButton}</Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
