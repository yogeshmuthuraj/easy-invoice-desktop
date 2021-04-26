import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import { useHistory, useLocation } from 'react-router-dom';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image
} from '@react-pdf/renderer';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    paddingLeft: 20
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

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1
  },
  gst: {
    textAlign: 'right',
    fontSize: 5,
  },
  header: {
    textAlign: 'center',
    fontSize: 6,
  },

  body: {
    paddingTop: 10,
    paddingBottom: 0,
    paddingHorizontal: 10,
  },
  logo: {
    height: 30,
    width: 34,
    fontSiz5: 8,
  },
  senderName: {
    paddingTop: 5,
    fontSize: 5,
    textAlign: 'left',
    float: 'left',
  },
  senderAddress: {
    fontSize: 5,
    textAlign: 'left',
  },
  shippingName: {
    fontSize: 5,
    textAlign: 'right',

  },
  shippingAddress: {
    fontSize: 5,
    textAlign: 'right',
  },
  gstin: {
    fontSize: 24,
    textAlign: 'center',
  },
  date: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  orderNumber: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 40,
  },
  carrierName: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  awb: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  barcode: {
    fontSize: 18,
    margin: 12,
    fontFamily: 'Oswald'
  },
  signature: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman'
  },
  rupees: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  rupeesInWords: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  tableHeader: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  items: {
    fontSize: 12,
    marginBottom: 20,
    textAlign: 'center',
    color: 'grey',
  },
  aboveSignature: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  declarationMessage: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  goodsMessage: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  jurisdictionMessage: {
    marginVertical: 15,
    marginHorizontal: 100,
  },
  pageNumber: {
    position: 'absolute',
    fontSize: 5,
    bottom: 10,
    left: 0,
    right: 10,
    textAlign: 'right',
    color: 'lightgrey',
  },
});

function pdfReturn() {
  const gstin = '123456';

  return (
    <Document>
      <Page size="A6" style={styles.body}>
        <Text style={styles.header} fixed>
          TAX INVOICE
        </Text>
        <Text style={styles.gst} fixed>
          GSTIN: {gstin}
        </Text>
        <Image
          style={styles.logo}
          src="../app/img/crazy_punch_logo.png"
        />
        <div style={{ paddingTop: 5, fontSize: 5, textAlign: 'left', float: 'left' }}>
          <Text>Pasway</Text>
          <Text>Plot No:10,</Text>
          <Text>Mahatma Gandhi Street,</Text>
          <Text>Thoraipakkam</Text>
          <Text>Chennai - 600097</Text>
          <Text>Mob: 9894171779</Text>
          <Text>email: warehouse@pasway.in</Text>
        </div>
        <Text style={styles.shippingName} fixed>
          Customer 1
        </Text>
        <Text style={styles.shippingAddress}>Plot No:10,</Text>
        <Text style={styles.shippingAddress}>Mahatma Gandhi Street,</Text>
        <Text style={styles.shippingAddress}>Thoraipakkam</Text>
        <Text style={styles.shippingAddress}>Chennai - 600097</Text>
        <Text style={styles.shippingAddress}>Mob: 9894171779</Text>
        <Text style={styles.shippingAddress}>email: warehouse@pasway.in</Text>
        <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
          `Page ${pageNumber} of ${totalPages}`
        )} fixed />
      </Page>
    </Document>
  );
}

function generatePdfLinks(pdfContent, fileName) {
  return (
    <div  style={{ paddingBottom: 30, paddingTop: 30 }}>
    <PDFDownloadLink document={pdfContent} fileName={fileName + '.pdf'}>
      {({ blob, url, loading, error }) =>
        loading ? 'Loading document...' : fileName
      }
    </PDFDownloadLink>
    </div>
  );
}

export default function PrintPreview() {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  const { orderRows } = location.state;

  const uniqueCarriers = orderRows.filter(
    (v, i, a) => a.findIndex((t) => t.Carrier === v.Carrier) === i
  ).map(orderRow => orderRow.Carrier);

  const pdfContent = pdfReturn(orderRows, uniqueCarriers);

  let pdfLinkList = generatePdfLinks(pdfContent);

  console.log('uniqueCarriers');
  console.log(uniqueCarriers);

  function handleCancel() {
    history.push('/');
  }

  function handleBack() {
    history.goBack();
  }

  return (
    <div>
      <div style={{ paddingBottom: 20 }} className="pad-bottom-20">PDF</div>
      <div className={classes.root}>
        <Grid container spacing={3}>
          {pdfLinkList}
        </Grid>
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
    </div>
  );
}
