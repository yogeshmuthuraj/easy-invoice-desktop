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

import InvoiceItemsTable from './table/InvoiceItemsTable';

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

function pdfReturn(orderRows, uniqueCarrier) {
  const classes = useStyles();

  const taxInvoiceText = 'TAX INVOICE';
  const gstText = 'GST : ';
  const gstin = '33AAHCP7548N1ZT';
  const invoiceText = 'Invoice : ';
  const dateText = 'Date : '
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
  const senderEmail = 'email: warehouse@pasway.in';

  const shippingAddressText = 'Shipping Address :'

  const declarationText1 = 'Declaration: We Declare that this Invoice shows the actual price of the goods described';
  const declarationText2 = 'and that all particulars are true and correct';
  const goodsText = 'Goods once sold cannot be Returned';
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

  const document = (
    <Document author={developer} creator={developer} producer={developer}>
      {filteredRows.map((orderRow, index) => {
        const paymentMethod = orderRow['Payment Method'] == 'Cash on Delivery' ? 'COD' : 'Prepaid';
        const amountInWords = toTitleCase(numberToWords.toWords(orderRow['Total'])) + ' only';

        // Tax
        const items = orderRow['More Details'];

        const totalItems = orderRow['Shipping'] == 0 ? items.length : items.length + 1;

        const taxRate = orderRow['Taxes'] / totalItems;

        let cgst = 0;
        let sgst = 0;
        let igst = 0;

        if (orderRow['Tax 1 Name'] == 'CGST 2.5%') {
          cgst = sgst = orderRow['Taxes'] / 2;
        } else if (orderRow['Tax 1 Name'] == 'IGST 5%') {
          igst = orderRow['Taxes'];
        }

        const taxes = {
          cgst,
          sgst,
          igst,
          taxRate
        };

        return (
          <Page key={index} size={paperSize}
            style={{ fontSize: 6, padding: 5 }}>
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
            <Text style={{ textAlign: 'left' }}>{senderEmail}</Text>

            <Text style={{ fontSize: 6, fontWeight: 'bold', top: 8, textAlign: 'right', position: 'absolute' }}>
            {gstText}<Text>{gstin}</Text>
            </Text>

            <View fixed style={{ fontSize: 8, paddingTop: 5, textAlign: 'right', top: 12, position: 'absolute' }}>
              <Text>
                {invoiceText}
              </Text>
              <Text style={{ fontSize: 15 }}>{orderRow['Name']}</Text>
            </View>

            <Text style={{ fontSize: 8, paddingTop: 5, fontStyle: 'bold', textAlign: 'right', top: 45, position: 'absolute' }}>
              {dateText}<Text>{moment(orderRow.['Created at']).format('ll')}</Text>
            </Text>


            <Text style={{ fontSize: 11, paddingTop: 10, textAlign: 'right', top: 60,  position: 'absolute' }}>{orderRow['Carrier']}</Text>
            <Text style={{ fontSize: 11, paddingTop: 10, textAlign: 'right', top: 75,  position: 'absolute' }}>AWB: {orderRow['AWB']}</Text>


            <Text style={{ fontSize: 19, paddingTop: 5, textAlign: 'right', top: 100,  position: 'absolute' }}>{paymentMethod}</Text>

            <Text style={{ fontSize: 8, paddingTop: 5, textAlign: 'right', top: 130, position: 'absolute' }}>{`${orderRow['Currency'] }`} <Text style={{ fontSize: 19, paddingTop: 5, textAlign: 'right', top: 115, position: 'absolute' }}>{orderRow['Outstanding Balance']}</Text></Text>

            <View style={{ textAlign: 'left', fontSize: 8, paddingTop: 12, width: 170 }} className="shipping-details">
              <Text>{shippingAddressText}</Text>
              <Text style={{ paddingTop: 3 }}>{orderRow['Shipping Name']}</Text>
              <Text>{orderRow['Shipping Address1']}</Text>
              <Text>{orderRow['Shipping Address2']}</Text>
              <Text>{orderRow['Shipping City']} - {orderRow['Shipping Zip'].replace(/'/g, '')}</Text>
              <Text>{orderRow['Shipping Province']}</Text>
              <Text>Ph: {orderRow['Shipping Phone']}</Text>
            </View>

            <View className="invoice-table" style={{ fontSize: 5 }}>
              <InvoiceItemsTable
                items={items}
                grandTotal={orderRow['Total']}
                shipping={orderRow['Shipping']}
                amountInWords={amountInWords}
                taxes={taxes}
              />
            </View>

            <View style={{
                fontSize: 5,
                textAlign: 'left',
                position: 'absolute',
                bottom: 10,
                marginLeft: 5
              }}
              wrap={false}>
              <Text>
                {forSignaturePath}
              </Text>

              <Text style={{ paddingTop: 4 }}>
                {declarationText1}
              </Text>

              <Text>
                {declarationText2}
              </Text>

              <Text style={{
                  color: 'grey',
                  paddingTop: 4
                }}
              >
                {goodsText}
              </Text>

              <Text style={{
                  color: 'grey',
                  paddingTop: 4
                }}
              >
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

  const fileName = uniqueCarrier + '_' + (moment().format('llll')).replace(/ /g, '_').replace(/,/g, '_');

  return (
    <div style={{ marginLeft: 20, marginRight: 20, paddingTop: 20, paddingBottom: 20, fontSize: 15 }} key={fileName} >
      <PDFDownloadLink document={document} style={{ marginRight: 30, textDecoration: 'none', color: '#4159AF'  }} fileName={fileName + '.pdf'}>
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

  let pdfLinkList = uniqueCarriers.map((uniqueCarrier) => {
    return pdfReturn(orderRows, uniqueCarrier)
  });

  function handleCancel() {
    history.push('/');

    // console.log(Bartest());
  }

  function handleBack() {
    history.goBack();
  }

  function closeApp() {
    window.close();
  }

  function Bartest() {
    console.log('Bartest');
    console.log('in test', document.getElementById('bardiv'))
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
