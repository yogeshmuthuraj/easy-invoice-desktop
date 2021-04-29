import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useHistory, useLocation } from 'react-router-dom';

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
        <Button variant="contained" color="primary" component="span">
          Upload
        </Button>
      </label>
    </div>
  );

  let fileReader;

  const displayFileName = (file) => {
    console.log('file');
    console.log(file);
  }

  const handleFileChosen = (file) => {
    setFileState(file);
    displayFileName(file);
  };

  const passFileToRead = () => {
    console.log('in passFileToRead')
    console.log(fileState);
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(fileState);
  }

  const handleFileRead = () => {
    const content = fileReader.result;

    const csv = require('csvtojson');

    (async () => {
      const jsonObj = await csv().fromString(content);

      handleUpload(jsonObj);
    })();
  };

  const history = useHistory();
  const location = useLocation();

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
            'Tax 1 Name': compareClonedRow['Tax 1 Name'],
            'Tax 1 Value': compareClonedRow['Tax 1 Value'],
            'Tax 2 Name': compareClonedRow['Tax 2 Name'],
            'Tax 2 Value': compareClonedRow['Tax 2 Value'],
            'Currency': compareClonedRow['Currency'],
            'Subtotal': compareClonedRow['Subtotal'],
          });
        }
      });

      groupedOrders.push({
        'Name': selectedOrderRow['Name'],
        'Taxes': selectedOrderRow['Taxes'],
        'Total': selectedOrderRow['Total'],
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
        'Shipping': selectedOrderRow['Shipping'],
        'Payment Method': selectedOrderRow['Payment Method'],
        'Currency': selectedOrderRow['Currency'],
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
      <div>
        <div><strong>Name:</strong> {file.name}</div>
        <div><strong>Path:</strong> {file.path}</div>
        <div><strong>Size:</strong> {Number.parseFloat(file.size / 1000000).toFixed(2)} MB</div>
        <div><strong>Type:</strong> {file.type}</div>
      </div>
    );
  }

  const nextDisabled = (fileState == null) ? true : false;

  const fileDetails = (fileState == null) ? <div></div> : getFileDetails();

  return (
    <div style={{ padding: 10, backgroundColor: 'gainsboro', borderWidth: 0, borderColor: 'grey', borderStyle: 'solid', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ paddingBottom: 20, fontSize: 20 }} className="pad-bottom-20">Carriers</div>
      <div className={classes.root}>
        <Button
          style={{ marginTop: 20, float: 'left' }}
          variant="outlined"
          onClick={handleBack}
          className="margin-top-20 pull-left"
        >
          Back
        </Button>
        <Button
          style={{ marginLeft: 20, marginTop: 20, float: 'left' }}
          variant="outlined"
          color="primary"
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
            <Paper className={classes.paper}>{uploadButton} <div style={{ textAlign: 'left', paddingTop: 10 }}>{fileDetails}</div></Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
