import React from 'react';
import PropTypes from 'prop-types';

import { DataGrid } from '@material-ui/data-grid';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useLocation, useHistory } from 'react-router-dom';

function toTitleCase(str) {
  str = str.replace(/_/g, ' ');
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

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

export default function OrderDisplay(props) {
  const classes = useStyles();
  const location = useLocation();
  const columns = [];
  let rows;
  let columnHeaders;

  if (location.state == undefined) {
    return (
      <Button
      style={{ marginTop: 20, float: 'left' }}
      variant="outlined"
      onClick={handleCancel}
      className="margin-top-20 pull-left"
      >
        ET wants to go Home...
      </Button>
    );
  }

  if (props.from == 'fetchOrders') {
    rows = props.rows;
    columnHeaders = Object.keys(rows[0]);

    columnHeaders.map((columnHeader) => {
      columns.push({
        field: columnHeader,
        headerName: toTitleCase(columnHeader),
        sortable: true,
        width: 200,
      });
    });
  } else {
    const modifiedRows = [];

    rows = location.state.rows;
    columnHeaders = Object.keys(rows[0]);

    columnHeaders.map((columnHeader) => {
      columns.push({
        field: columnHeader,
        headerName: toTitleCase(columnHeader),
        sortable: true,
        width: 200,
      });
    });

    rows.map((row, index) => {
      modifiedRows.push(
        Object.assign(row, { id: `${`${index}_${row.Name}`}` })
      );
    });

    rows = modifiedRows;
  }

  const [selectionModel, setSelectionModel] = React.useState([]);

  const nextDisabled = !(selectionModel.length > 0);

  const history = useHistory();

  function handleNext() {
    history.push({
      pathname: '/carrierInput',
      state: {
        selectedRowIds: selectionModel,
        rows,
      },
    });
  }

  function handleCancel() {
    history.push('/');
  }

  function handleBack() {
    history.goBack();
  }

  return (
    <div>
      <div style={{ paddingBottom: 20, fontSize: 20 }} className="pad-bottom-20">
        Select orders
      </div>
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
          <Paper className={classes.paper}>
            <div style={{ height: 500, width: '100%', fontSize: 30 }}>
              <DataGrid
                autoPageSize
                className="font-size-14"
                rows={rows}
                columns={columns}
                pageSize={10}
                checkboxSelection
                onSelectionModelChange={(newSelection) => {
                  setSelectionModel(newSelection.selectionModel);
                }}
                selectionModel={selectionModel}
              />
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
}
