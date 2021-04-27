import React from 'react';

import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';

import moment from 'moment';

import { useHistory, useLocation } from 'react-router-dom';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
  Image,
  Canvas
} from '@react-pdf/renderer';

import { useBarcode } from '@createnextapp/react-barcode';

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

function pdfReturn(orderRows, uniqueCarrier) {
  const taxInvoiceText = 'TAX INVOICE';
  const gstText = 'GST : ';
  const gstin = '33AAHCP7548N1ZT';
  const invoiceText = 'Invoice : ';
  const dateText = 'Date : '
  const senderLogoPath = '../app/img/crazy_punch_logo.png';

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

  const paperSize = 'A6';

  const developer = "https://github.com/yogeshmuthuraj";

  let filteredRows = [];

  orderRows.forEach((orderRow) => {
    if (orderRow.Carrier == uniqueCarrier) {
      filteredRows.push(orderRow);
    }
  });

  const document = (
    <Document author={developer} creator={developer} producer={developer}>
      {filteredRows.map((orderRow, index) => {
        return (
          <Page key={index} size={paperSize}
            style={{
            paddingTop: 10, paddingLeft: 12, paddingRight: 12, fontSize: 6 }}>
            <Text style={{ textAlign: 'center' }}>
            {taxInvoiceText}
            </Text>
            <div style={{ marginLeft: '50%' }}>
            <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 8 }}>
            {gstText}<Text style={{ fontWeight: 'normal' }}>{gstin}</Text>
            </Text>
            <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 8 }}>
            {invoiceText}<Text style={{ fontWeight: 'normal' }}>{orderRow.Name}</Text>
            </Text>
            <Text style={{ textAlign: 'right', fontWeight: 'bold', fontSize: 8 }}>
            {dateText}<Text style={{ fontWeight: 'normal' }}>{orderRow.['Created at']}</Text>
            </Text>
            </div>
            <div style={{ float: 'left' }}>
            <Image src={senderLogoPath} style={{ height: 40, width: 45.5, textAlign: 'left' }} />
            <Text style={{ textAlign: 'left' }}>{senderName}</Text>
            <Text style={{ textAlign: 'left' }}>{senderAddress1}</Text>
            <Text style={{ textAlign: 'left' }}>{senderAddress2}</Text>
            <Text style={{ textAlign: 'left' }}>{senderStreet}</Text>
            <Text style={{ textAlign: 'left' }}>{senderCity} - {senderZip}</Text>
            </div>
            <Text style={{ textAlign: 'right', fontSize: 10 }}>{orderRow.Carrier}</Text>
            <Text style={{
              position: 'absolute',
              fontSize: 5,
              bottom: 10,
              left: 0,
              right: 10,
              textAlign: 'right',
              color: 'lightgrey'
            }}
            render={({ pageNumber, totalPages }) => (
              `Page ${pageNumber} of ${totalPages}`
            )} fixed
            />
          </Page>
        )
      })}
    </Document>
  )

  const fileName = uniqueCarrier + '_' + (moment().format('llll')).replace(/ /g, '_');

  return (
    <Grid container spacing={3}>
      <div style={{ paddingBottom: 30, paddingTop: 30 }} key={fileName} >
        <PDFDownloadLink document={document} fileName={fileName + '.pdf'}>
          {({ blob, url, loading, error }) =>
            loading ? <CircularProgress color="secondary" /> : fileName
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

  let pdfLinkList = uniqueCarriers.map((uniqueCarrier) => {
    return pdfReturn(orderRows, uniqueCarrier)
  });


  console.log('pdfLinkList');
  console.log(pdfLinkList.length);

  function handleCancel() {
    history.push('/');
  }

  function handleBack() {
    history.goBack();
  }

  return (
    <div>
      <div style={{ paddingBottom: 20, fontSize: 20 }} className="pad-bottom-20">PDF</div>
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
