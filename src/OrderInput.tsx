import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';
import CloudDownloadRoundedIcon from '@material-ui/icons/CloudDownloadRounded';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

import Header from './CommonComponents/Header';
import TabStepper from './CommonComponents/TabStepper';
import LogoSelector from './logo/LogoSelector';
import Typography from '@material-ui/core/Typography';

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
  logo: {
    objectFit: 'contain',
    maxWidth: 120,
    maxHeight: 120,
    width: 'auto',
    height: 'auto',
  }
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
        logoPath: logoPathState,
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

  const [logoPathState, setLogoPathState] = React.useState('../assets/logo/crazy_punch_logo.png');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogoPathState((event.target as HTMLInputElement).value);
  };

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
          <br />
          <Paper className={classes.paper} style={{ marginTop: 50, textAlign: 'left' }}>
            <FormControl component="fieldset">
              <FormLabel component="legend">
                <Typography style={{ fontSize: 18, textAlign: 'left' }}>Logo</Typography>
              </FormLabel>
              <br />
              <RadioGroup aria-label="gender" name="gender1" value={logoPathState} onChange={handleChange}>
                <FormControlLabel value="../assets/logo/crazy_punch_logo.png" control={<Radio />} label={<img className={classes.logo} src="../assets/logo/crazy_punch_logo.png" />} />
                <br />
                <br />
                <FormControlLabel value="../assets/logo/drunken_monk.jpeg" control={<Radio />} label={<img className={classes.logo} src="../assets/logo/drunken_monk.jpeg" />} />
              </RadioGroup>
            </FormControl>
          </Paper>
          <br />
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
