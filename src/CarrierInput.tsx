import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CloudUploadRoundedIcon from '@material-ui/icons/CloudUploadRounded';

import Header from './CommonComponents/Header';
import TabStepper from './CommonComponents/TabStepper';

import { useHistory, useLocation } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

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

export default function CarrierInput(props) {
  const classes = useStyles();

  const [fileState, setFileState] = useState(null);

  const handleFileChosen = (file) => {
    setFileState(file);
  };

  const uploadButton = (
    <div>
      <input
        className={classes.input}
        id="contained-button-file"
        type="file"
        accept=".csv"
        onChange={(event) => handleFileChosen(event.target.files[0])}
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

  let fileReader;

  function handleUpload(carrierRows) {
    const orderRows = location.state.rows;
    const { selectedRowIds } = location.state;

    // select rows
    const selectedOrderRows = [];

    orderRows.map((orderRow, index) => {
      selectedRowIds.map((selectedRowId) => {
        if (orderRows[index].id == selectedRowId) {
          selectedOrderRows.push(orderRows[index]);
        }
      });
    });

    const groupedOrders = groupSameOrders(selectedOrderRows);

    const mergedOrders = mergeRows(groupedOrders, carrierRows);

    const filteredUniqueOrders = uniqueOrders(mergedOrders);

    const sortedOrders = sortingBasedOnCarrier(filteredUniqueOrders);

    history.push({
      pathname: '/printPreview',
      state: {
        orderRows: sortedOrders,
      },
    });
  }

  const handleFileRead = () => {
    const content = fileReader.result;

    const csv = require('csvtojson');

    (async () => {
      const jsonObj = await csv().fromString(content);

      handleUpload(jsonObj);
    })();
  };

  const passFileToRead = () => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(fileState);
  };

  const history = useHistory();
  const location = useLocation();

  function groupSameOrders(selectedOrderRows) {
    const compareClonedRows = Object.assign(selectedOrderRows);
    const groupedOrders = [];

    selectedOrderRows.map((selectedOrderRow, index) => {
      const lineItemDetails = [];

      compareClonedRows.map((compareClonedRow) => {
        if (selectedOrderRows[index].Name == compareClonedRow.Name) {
          lineItemDetails.push({
            'Lineitem name': compareClonedRow['Lineitem name'],
            'Lineitem sku': compareClonedRow['Lineitem sku'],
            'Lineitem quantity': compareClonedRow['Lineitem quantity'],
            'Lineitem price': compareClonedRow['Lineitem price'],
            Currency: compareClonedRow.Currency,
          });
        }
      });

      groupedOrders.push({
        Name: selectedOrderRow.Name,
        Taxes: selectedOrderRow.Taxes,
        Total: selectedOrderRow.Total,
        'Outstanding Balance': selectedOrderRow['Outstanding Balance'],
        'Created at': selectedOrderRow['Created at'],
        'Shipping Name': selectedOrderRow['Shipping Name'],
        'Shipping Address1': selectedOrderRow['Shipping Address1'],
        'Shipping Address2': selectedOrderRow['Shipping Address2'],
        'Shipping Street': selectedOrderRow['Shipping Street'],
        'Shipping City': selectedOrderRow['Shipping City'],
        'Shipping Zip': selectedOrderRow['Shipping Zip'],
        'Shipping Province': selectedOrderRow['Shipping Province'],
        'Shipping Country': selectedOrderRow['Shipping Country'],
        'Shipping Phone': selectedOrderRow['Shipping Phone'],
        Shipping: selectedOrderRow.Shipping,
        'Payment Method': selectedOrderRow['Payment Method'],
        Currency: selectedOrderRow.Currency,
        'Tax 1 Name': selectedOrderRow['Tax 1 Name'],
        'Tax 1 Value': selectedOrderRow['Tax 1 Value'],
        'Tax 2 Name': selectedOrderRow['Tax 2 Name'],
        'Tax 2 Value': selectedOrderRow['Tax 2 Value'],
        'Tax 3 Name': selectedOrderRow['Tax 3 Name'],
        'Tax 3 Value': selectedOrderRow['Tax 3 Value'],
        Taxes: selectedOrderRow.Taxes,
        Total: selectedOrderRow.Total,
        'Discount Code': selectedOrderRow['Discount Code'],
        'Discount Amount': selectedOrderRow['Discount Amount'],
        AWB: selectedOrderRow.AWB,
        'More Details': lineItemDetails,
      });
    });

    return groupedOrders;
  }

  function uniqueOrders(groupedOrders) {
    return groupedOrders.filter(
      (v, i, a) => a.findIndex((t) => t.Name === v.Name) === i
    );
  }

  function mergeRows(filteredUniqueOrders, carrierRows) {
    const mergedRows = [];

    filteredUniqueOrders.map((filteredUniqueOrder, index) => {
      carrierRows.map((carrierRow) => {
        if (filteredUniqueOrders[index].Name == carrierRow.Name) {
          mergedRows.push(
            Object.assign(filteredUniqueOrders[index], carrierRow)
          );
        }
      });
    });

    return mergedRows;
  }

  function sortingBasedOnCarrier(csvObject) {
    return csvObject.sort((a, b) =>
      a.Carrier > b.Carrier
        ? 1
        : a.Carrier === b.Carrier
        ? a.size > b.size
          ? 1
          : -1
        : -1
    );
  }

  function handleCancel() {
    history.push('/');
  }

  function handleBack() {
    history.push('/');
  }

  function handleNext() {
    passFileToRead();
  }

  function getFileDetails() {
    const file = Object.assign(fileState);

    return (
      <>
        <Typography style={{ fontSize: 15 }} className={classes.materialText}><strong>Name:</strong> {file.name}</Typography>
        <Typography style={{ fontSize: 20 }} className={classes.materialText}><strong>Path:</strong> {file.path}</Typography>
        <Typography style={{ fontSize: 20 }} className={classes.materialText}><strong>Size:</strong>{' '}{Number.parseFloat(file.size / 1000000).toFixed(2)} MB</Typography>
        <Typography style={{ fontSize: 20 }} className={classes.materialText}><strong>Type:</strong> {file.type}</Typography>
      </>
    );
  }

  const nextDisabled = fileState == null;

  const fileDetails = fileState == null ? <div /> : getFileDetails();

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
        <TabStepper activeStep={2} />
        <div className={classes.root}>
          <Button
            style={{ marginTop: 20, float: 'left' }}
            variant="contained"
            onClick={handleBack}
            className="margin-top-20 pull-left"
          >
            Back
          </Button>
          <Button
            style={{ marginLeft: 20, marginTop: 20, float: 'left' }}
            variant="contained"
            onClick={handleCancel}
            className="margin-left-10 margin-top-20 pull-left"
          >
            Cancel
          </Button>
          <Button
            style={{ marginLeft: 20, marginTop: 20, float: 'right' }}
            variant="contained"
            color="primary"
            onClick={handleNext}
            disabled={nextDisabled}
          >
            Next
          </Button>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper className={classes.paper}>
                {uploadButton}
                <div style={{ textAlign: 'left' }}>{fileDetails}</div>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    </>
  );
}
