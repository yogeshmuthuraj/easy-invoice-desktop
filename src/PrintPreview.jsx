import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import moment from 'moment';

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

function pdfReturn(orderRows, uniqueCarriers) {
  const gstin = '33AAHCP7548N1ZT';
  const invoiceText = 'Invoice : ';
  const dateText = 'Date : '
  const senderLogoPath = '';

  const serailNumberText = 'S.No';
  const itemDescriptionText = 'Item Description';
  const skuText = 'SKU';
  const quantityText = 'Qty';
  const unitPriceText = 'Unit Price';
  const taxTypeText = 'Tax Type';
  const taxAmountText = 'Tax Amount';
  const totalAmountText = 'Total Amount';
  const totalText = 'Total';

  const senderName = 'PASWAY CLOTHING PVT LTD';
  const senderAddress1 = 'No: 10,';
  const senderAddress2 = 'Mahatma Gandhi Street,';
  const senderStreet = 'Thuraipakkam';
  const senderCity = 'Chennai';
  const senderZip = '600097';
  const senderProvince = 'TN';
  const senderCountry = 'IN';

  const shippingAddressText = 'Shipping Address :'

  const declarationText = 'Declaration: We Declare that this Invoice shows the actual price of the goods described and that all particulars are true and correct';
  const goodsText = 'Goods once sold cannot be Returned';
  const jurisdictionText = 'All disputes are Subject to Chennai Jurisdiction';
  const forSignatureText = 'For PASWAY CLOTHING PVT LTD';
  const forSignaturePath = '';
  const authorisedSignatoryText = 'Authorized Signatory';
  const amountInWordsText = 'Amount in Words : ';

  return (
    <Document>
      {orderRows.map((orderRow, index) => {
        return(
          <Page key={index} size="A6" style={styles.body}><Text style={styles.header} fixed>{orderRow.Name}</Text></Page>
        )
      })}
    </Document>
  );


  // return (
  //   <Document>
  //     <Page size="A6" style={styles.body}>
  //       <Text style={styles.header} fixed>
  //         TAX INVOICE
  //       </Text>
  //       <Text style={styles.gst} fixed>
  //         GSTIN: {gstin}
  //       </Text>
  //       <Image
  //         style={styles.logo}
  //         src="../app/img/crazy_punch_logo.png"
  //       />
  //       <div style={{ paddingTop: 5, fontSize: 5, textAlign: 'left', float: 'left' }}>
  //         <Text>Pasway</Text>
  //         <Text>Plot No:10,</Text>
  //         <Text>Mahatma Gandhi Street,</Text>
  //         <Text>Thoraipakkam</Text>
  //         <Text>Chennai - 600097</Text>
  //         <Text>Mob: 9894171779</Text>
  //         <Text>email: warehouse@pasway.in</Text>
  //       </div>
  //       <Text style={styles.shippingName} fixed>
  //         Customer 1
  //       </Text>
  //       <Text style={styles.shippingAddress}>Plot No:10,</Text>
  //       <Text style={styles.shippingAddress}>Mahatma Gandhi Street,</Text>
  //       <Text style={styles.shippingAddress}>Thoraipakkam</Text>
  //       <Text style={styles.shippingAddress}>Chennai - 600097</Text>
  //       <Text style={styles.shippingAddress}>Mob: 9894171779</Text>
  //       <Text style={styles.shippingAddress}>email: warehouse@pasway.in</Text>
  //       <Text style={styles.pageNumber} render={({ pageNumber, totalPages }) => (
  //         `Page ${pageNumber} of ${totalPages}`
  //       )} fixed />
  //     </Page>
  //   </Document>
  // );
}

function generatePdfLink(pdfContent, fileName) {
  console.log('in generatePdfLink');
  console.log(pdfContent);
  return (
    <Grid container spacing={3}>
      <div style={{ paddingBottom: 30, paddingTop: 30 }}>
        <PDFDownloadLink document={pdfContent} fileName={fileName + '.pdf'}>
          {({ blob, url, loading, error }) =>
            loading ? 'Loading document...' : fileName + '_' + (moment().format('llll')).replace(/ /g, '_')
          }
        </PDFDownloadLink>
      </div>
    </Grid>
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

  let pdfLinkList = uniqueCarriers.map((uniqueCarrier) => {
    return generatePdfLink(pdfContent, uniqueCarrier);
  });


  console.log('pdfLinkList');
  console.log(pdfLinkList);

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
        {pdfLinkList}
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
