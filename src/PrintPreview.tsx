import React from 'react';
import ReactDOM from 'react-dom';

import { LoadingIndicator } from "./LoadingIndicator";
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';

import moment from 'moment';
import numberToWords from 'number-to-words';

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

// import SaveAsPng from 'save-svg-as-png';
//
// import Barcode from './Barcode';

import InvoiceItemsTable from './tables/itemsInvoice/InvoiceItemsTable';
import TaxItemsTable from './tables/itemsTax/TaxItemsTable';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'left',
    color: theme.palette.text.secondary,
  },
  input: {
    display: 'none',
  },
}));

function toTitleCase(str) {
  str = str.replace(/_/g, ' ');
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

function pdfReturn(orderRows, uniqueCarrier, pdfDocumentCount) {
  const classes = useStyles();

  const taxInvoiceText = 'TAX INVOICE';
  const gstText = 'GST: ';
  const gstin = '33AAHCP7548N1ZT';
  const invoiceNoText = 'Invoice No: ';
  const invoiceDateText = 'Invoice Date: ';
  const orderDateText = 'Order Date: ';
  const senderLogoPath = '../assets/crazy_punch_logo.png';

  const serailNumberText = 'S.No';
  const itemDescriptionText = 'Item Description';
  const skuText = 'SKU';
  const quantityText = 'Qty';
  const unitPriceText = 'Unit Price';
  const taxTypeText = 'Tax Type';
  const taxAmountText = 'Tax Amount';
  const netAmountText = 'Net Amount';
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

  const declarationText1 = 'We Declare that this Invoice shows the actual price of the goods described and that all particulars are true and correct';
  const jurisdictionText = 'All disputes are Subject to Chennai Jurisdiction';
  const forSignatureText = 'For PASWAY CLOTHING PVT LTD';
  const forSignaturePath = 'This is a computer generated invoice and does not require any stamp or signature';
  const authorisedSignatoryText = 'Authorized Signatory';

  const paperSize = 'A6';

  const developer = "https://github.com/yogeshmuthuraj";

  let filteredRows = [];

  orderRows.forEach((orderRow) => {
    if (orderRow.Carrier == uniqueCarrier) {
      filteredRows.push(orderRow);
    }
  });

  if (filteredRows.length == 0) {
    return;
  }

  const document = (
    <Document author={developer} creator={developer} producer={developer}>
      {filteredRows.map((orderRow, index) => {
        const orderNumber = orderRow['Name'];
        let paymentMethodDisplay;
        let outstandingAmount;
        const paymentMethod = orderRow['Payment Method'];
        const currency = orderRow['Currency'] == 'INR' ? 'Rs.' : orderRow['Currency'];

        if (paymentMethod == 'Cash on Delivery') {
          outstandingAmount = <Text style={{ fontSize: 8, paddingTop: 5, textAlign: 'right', top: 130, position: 'absolute' }}>{`${currency}`} <Text style={{ fontSize: 19, paddingTop: 5, textAlign: 'right', top: 140, position: 'absolute' }}>{orderRow['Outstanding Balance']}</Text></Text>;
          paymentMethodDisplay = {
            value: 'COD',
            metaValue: paymentMethod
          }
        } else {
          paymentMethodDisplay = {
            value: 'Prepaid',
            metaValue: paymentMethod
          }
        }

        const discount = {
          code: orderRow['Discount Code'],
          value: orderRow['Discount Amount']
        }

        const amountInWords = toTitleCase(numberToWords.toWords(orderRow['Total'])) + ' only';

        const items = orderRow['More Details'];

        const taxes = [
          {
            name: orderRow['Tax 1 Name'],
            value: orderRow['Tax 1 Value'],
          },
          {
            name: orderRow['Tax 2 Name'],
            value: orderRow['Tax 2 Value'],
          },
          {
            name: orderRow['Tax 3 Name'],
            value: orderRow['Tax 3 Value'],
          },
        ];

        return (
          <Page key={index + orderNumber} size={paperSize}
            style={{ fontSize: 6, paddingTop: 1, paddingLeft: 3 }}>
            <Text style={{ textAlign: 'center' }}>
              {taxInvoiceText}
            </Text>

            <View fixed>
              <Image fixed src={senderLogoPath} style={{ height: 40, width: 45.5, textAlign: 'left' }} />
            </View>
            <Text style={{ textAlign: 'left', paddingTop: 5 }}>{senderName}</Text>
            <Text style={{ textAlign: 'left' }}>{senderAddress1}</Text>
            <Text style={{ textAlign: 'left' }}>{senderAddress2}</Text>
            <Text style={{ textAlign: 'left' }}>{senderStreet}</Text>
            <Text style={{ textAlign: 'left' }}>{senderCity} - {senderZip}</Text>

            <Text style={{ fontSize: 6, fontWeight: 'bold', top: 8, textAlign: 'right', position: 'absolute' }}>
            {gstText}<Text>{gstin}</Text>
            </Text>

            <View fixed style={{ fontSize: 8, paddingTop: 5, textAlign: 'right', top: 16, position: 'absolute' }}>
              <Text>
                {invoiceNoText}
              </Text>
              <Text style={{ fontSize: 15 }}>{orderNumber}</Text>
            </View>

            <Text style={{ fontSize: 8, paddingTop: 5, fontStyle: 'bold', textAlign: 'right', top: 50, position: 'absolute' }}>
              {invoiceDateText}<Text>{moment().format('DD-MMM-YYYY')}</Text>
            </Text>

            <Text style={{ fontSize: 11, paddingTop: 10, textAlign: 'right', top: 60,  position: 'absolute' }}>{orderRow['Carrier']}</Text>
            <Text style={{ fontSize: 6, paddingTop: 10, textAlign: 'right', top: 75,  position: 'absolute' }}>AWB No: {orderRow['AWB']}</Text>

            <Text style={{ fontSize: 19, paddingTop: 5, textAlign: 'right', top: 95, position: 'absolute' }}>
              {paymentMethodDisplay['value']}
            </Text>
            <Text style={{ fontSize: 6, paddingTop: 5, textAlign: 'right', top: 115, position: 'absolute' }}>({paymentMethodDisplay['metaValue']})</Text>

            {outstandingAmount}

            <Text style={{ fontSize: 8, paddingTop: 5, fontStyle: 'bold', textAlign: 'right', top: 158, position: 'absolute' }}>
              {orderDateText}<Text>{moment(orderRow.['Created at']).format('DD-MMM-YYYY')}</Text>
            </Text>

            <View style={{ textAlign: 'left', fontSize: 8, paddingTop: 12, width: 130 }} className="shipping-details">
              <Text>{shippingAddressText}</Text>
              <Text style={{ paddingTop: 3 }}>{orderRow['Shipping Name']}</Text>
              <Text>{orderRow['Shipping Address1']}</Text>
              <Text>{orderRow['Shipping Address2']}</Text>
              <Text>{orderRow['Shipping City']} - {orderRow['Shipping Zip'].replace(/'/g, '')}</Text>
              <Text>{orderRow['Shipping Province']}</Text>
              <Text>Ph: {orderRow['Shipping Phone']}</Text>
            </View>

            <View className="invoice-table" style={{ fontSize: 5, paddingRight: 2, paddingTop: 19 }}>
              <InvoiceItemsTable
                items={items}
                grandTotal={orderRow['Total']}
                discount={discount}
                shipping={orderRow['Shipping']}
                amountInWords={amountInWords}
                currency={currency}
              />
            </View>

            <View className="tax-table" style={{ fontSize: 5, paddingRight: 2, paddingTop: 1 }}>
              <TaxItemsTable
                items={taxes}
                grandTotal={orderRow['Taxes']}
                currency={currency}
              />
            </View>

            <View style={{
                fontSize: 5,
                textAlign: 'left',
                position: 'absolute',
                bottom: 2,
                marginLeft: 5
              }}
              wrap={false}>
              <Text>
                {forSignaturePath}
              </Text>

              <Text>
                {declarationText1}
              </Text>

              <Text>
                {jurisdictionText}
              </Text>
            </View>
          </Page>
        );
      })}
    </Document>
  );

  const history = useHistory();

  function handleCancel() {
    history.push('/');
  }

  const fileName = uniqueCarrier + '_' + (moment().format('llll')).replace(/ /g, '_').replace(/,/g, '_') + '_' + pdfDocumentCount + '.pdf';

  return (
    <div style={{ marginLeft: 20, marginRight: 20, paddingTop: 20, paddingBottom: 20, fontSize: 15 }} key={fileName} >
      <PDFDownloadLink
        document={document}
        style={{ marginRight: 30, textDecoration: 'none', color: '#4159AF'  }}
        fileName={fileName}>
        {({ blob, url, loading, error }) => {
          if (blob || url) {
            return fileName;
          } else if (error){
            return (
              <Alert severity="error" style={{ fontSize: 15 }}>
                <AlertTitle style={{ fontSize: 20 }}>
                  Error
                </AlertTitle>
                Click START AGAIN
              </Alert>
            );
          } else {
          return (
            <LoadingIndicator />
          );
        }
      }}
      </PDFDownloadLink>
    </div>
  );
}

export default function PrintPreview() {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();

  if (location.state == undefined) {
    return (
      <div style={{ padding: 10, backgroundColor: 'gainsboro', borderWidth: 0, borderColor: 'grey', borderStyle: 'solid', borderRadius: '10px', overflow: 'hidden' }}>
        <div className={classes.root}>
          <Button
            fullWidth
            style={{ marginTop: 20 }}
            variant="contained"
            color="secondary"
            onClick={handleCancel}
            className="margin-top-20"
          >
            ET wants to go Home...
          </Button>
        </div>
      </div>
    );
  }

  const { orderRows } = location.state;

  const uniqueCarriers = orderRows.filter(
    (v, i, a) => a.findIndex((t) => t.Carrier === v.Carrier) === i
  ).map(orderRow => orderRow.Carrier);

  const arraySplitValue = 200;

  const chunkedArrayofOrderRows = new Array(Math.ceil(orderRows.length / arraySplitValue)).fill().map(_ => orderRows.splice(0, arraySplitValue));

  let pdfLinkList = uniqueCarriers.map((uniqueCarrier) => {
    return chunkedArrayofOrderRows.map((orderRows, index) => {
      return pdfReturn(orderRows, uniqueCarrier, (index + 1));
    });
  });

  function handleCancel() {
    history.push('/');
  }

  function handleBack() {
    history.goBack();
  }

  function closeApp() {
    window.close();
  }

  function Bartest() {
    return SaveAsPng.svgAsPngUri(document.getElementById('bardiv')).then((uri) => {
      return uri;
    });
  }

  return (
    <div style={{ padding: 10, backgroundColor: 'gainsboro', borderWidth: 0, borderColor: 'grey', borderStyle: 'solid', borderRadius: '10px', overflow: 'hidden' }}>
      <div style={{ paddingBottom: 20, fontSize: 20 }} className="pad-bottom-20">PDF</div>
      <div className={classes.root}>
        <Button
          style={{ marginTop: 20, float: 'left' }}
          variant="contained"
          color="primary"
          onClick={handleCancel}
        >
          Start Again
        </Button>
        <Button
          style={{ marginLeft: 20, marginTop: 20, float: 'left' }}
          variant="contained"
          onClick={closeApp}
          className="margin-top-20 pull-left"
        >
          Close
        </Button>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper className={classes.paper}>{pdfLinkList}</Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
