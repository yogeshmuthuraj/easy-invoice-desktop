import React from 'react';
import ReactDOM from 'react-dom';

import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { LoadingIndicator } from "./LoadingIndicator";
import Link from '@material-ui/core/Link';

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
  Image,
  Font,
  PDFViewer
} from '@react-pdf/renderer';

import ReactPDF from '@react-pdf/renderer';

import Barcode from './Barcode';

import SVGtoPDF from 'svg-to-pdfkit';

import InvoiceItemsTable from './table/InvoiceItemsTable';

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

Font.register({
  family: 'Roboto',
  fonts: [
    {
      src: `../assets/fonts/Roboto-Regular.ttf`
    },
    {
      src: `../assets/fonts/Roboto-Bold.ttf`,
      fontWeight: 'bold'
    },
    {
      src: `../assets/fonts/Roboto-Italic.ttf`,
      fontWeight: 'normal',
      fontStyle: 'italic'
    },
    {
      src: `../assets/fonts/Roboto-BoldItalic.ttf`,
      fontWeight: 'bold',
      fontStyle: 'italic'
    }
  ]
});

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

  const filteredRowsLength = filteredRows.length;

  const document = (
    <Document author={developer} creator={developer} producer={developer}>
      {filteredRows.map((orderRow, index) => {
        const paymentMethod = orderRow['Payment Method'] == 'Cash on Delivery' ? 'COD' : 'Prepaid';
        const amountInWords = toTitleCase(numberToWords.toWords(orderRow['Total'])) + ' only';

        let cgst = 0;
        let sgst = 0;
        let igst = 0;

        if (orderRow['Tax 1 Name'] == 'CGST 2.5%') {
          cgst = orderRow['Tax 1 Value'];
          sgst = orderRow['Tax 2 Value'];
        } else if (orderRow['Tax 1 Name'] == 'IGST 5%') {
          igst = orderRow['Tax 1 Value'];
        }

        const taxes = {
          cgst,
          sgst,
          igst,
        };

        return (
          <Page key={index} size={paperSize}
            style={{ fontSize: 6, padding: 5 }}>
            <Text style={{ textAlign: 'center' }}>
              {taxInvoiceText}
            </Text>

            <View className="sender-details">
              <Image src={senderLogoPath} style={{ height: 40, width: 45.5, textAlign: 'left' }} />
              <Text style={{ textAlign: 'left', paddingTop: 5 }}>{senderName}</Text>
              <Text style={{ textAlign: 'left' }}>{senderAddress1}</Text>
              <Text style={{ textAlign: 'left' }}>{senderAddress2}</Text>
              <Text style={{ textAlign: 'left' }}>{senderStreet}</Text>
              <Text style={{ textAlign: 'left' }}>{senderCity} - {senderZip}</Text>
              <Text style={{ textAlign: 'left' }}>{senderEmail}</Text>
            </View>

            <View className="invoice-details" style={{
                position: 'absolute',
                fontSize: 5,
                top: 15,
                textAlign: 'right',
              }}
            >
              <Text style={{ fontSize: 7, fontFamily: 'Roboto', fontWeight: 'bold' }}>
              {gstText}<Text>{gstin}</Text>
              </Text>
              <Text style={{ fontSize: 8, paddingTop: 5, fontStyle: 'bold' }}>
                {dateText}<Text style={{ fontWeight: 200 }}>{moment(orderRow.['Created at']).format('ll')}</Text>
              </Text>

              <Text style={{ fontSize: 8, paddingTop: 5, fontStyle: 'bold' }}>
                {invoiceText}
              </Text>

              <Text style={{ fontSize: 18 }}>{orderRow['Name']}</Text>

              <Text style={{ fontSize: 11, paddingTop: 10 }}>{orderRow['Carrier']}</Text>

              <Text style={{ fontSize: 19, paddingTop: 5 }}>{paymentMethod}</Text>

              <Text style={{ fontSize: 8, paddingTop: 5 }}>{orderRow['Currency']} <Text style={{ fontSize: 19, paddingTop: 5 }}>{orderRow['Outstanding Balance']}</Text></Text>
            </View>

            <View style={{ textAlign: 'left', fontSize: 8, paddingTop: 12, width: 150 }} className="shipping-details">
              <Text>{shippingAddressText}</Text>
              <Text style={{ paddingTop: 3 }}>{orderRow['Shipping Name']}</Text>
              <Text>{orderRow['Shipping Address1']}</Text>
              <Text>{orderRow['Shipping Address2']}</Text>
              <Text>{orderRow['Shipping City']} - {orderRow['Shipping Zip'].replace(/'/g, '')}</Text>
              <Text>{orderRow['Shipping Province']}</Text>
            </View>

            <View className="invoice-table" style={{ fontSize: 5 }}>
              <InvoiceItemsTable
                items={orderRow['More Details']}
                grandTotal={orderRow['Total']}
                shipping={orderRow['Shipping']}
                amountInWords={amountInWords}
                taxes={taxes}
              />
            </View>

            <Text style={{
              position: 'absolute',
              fontSize: 5,
              bottom: 32,
              textAlign: 'left',
              marginLeft: 5
              }}
            >
              {forSignaturePath}
            </Text>

            <Text fixed style={{
              marginLeft: 30,
              position: 'absolute',
              fontSize: 5,
              bottom: 21,
              textAlign: 'center',
              }}
            >
              {declarationText1}
            </Text>

            <Text fixed style={{
              marginLeft: 30,
              position: 'absolute',
              fontSize: 5,
              bottom: 16,
              textAlign: 'center',
              }}
            >
              {declarationText2}
            </Text>

            <Text fixed style={{
              marginLeft: 30,
              position: 'absolute',
              fontSize: 5,
              bottom: 8,
              textAlign: 'center',
              color: 'grey'
              }}
            >
              {goodsText}
            </Text>

            <Text fixed style={{
              marginLeft: 30,
              marginLeft: 5,
              position: 'absolute',
              fontSize: 5,
              bottom: 3,
              textAlign: 'center',
              color: 'grey'
              }}
            >
              {jurisdictionText}
            </Text>
          </Page>
        );
      })}
    </Document>
  );

  const history = useHistory();

  function handleCancel() {
    history.push('/');
  }

  // const svg = <Barcode value={'12345'} />;
  //
  // const pdf = SVGtoPDF(document, svg, 200, 200, { width: '100', height: '100' });
  const fileName = uniqueCarrier + '_' + (moment().format('llll')).replace(/ /g, '_');

  return (
    <Grid container spacing={3} key={fileName}>
      <div style={{ marginLeft: 20, paddingBottom: 30, paddingTop: 30, fontSize: 15 }} key={fileName} >
        <PDFDownloadLink document={document} style={{ marginRight: 30, textDecoration: 'none', color: '#4159AF'  }} fileName={fileName + '.pdf'}>
          {({ blob, url, loading, error }) => {
            if (blob || url) {
              return fileName;
            } else if (error){
              return (
                <Alert severity="error" style={{ fontSize: '15px' }}>
                  <AlertTitle style={{ fontSize: '20px' }}>
                    Error
                  </AlertTitle>
                  Click START AGAIN
                </Alert>
              );
            } else {
            return <LoadingIndicator />;
          }
        }}
        </PDFDownloadLink>
      </div>
    </Grid>
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
  }

  function handleBack() {
    history.goBack();
  }

  function closeApp() {
    window.close();
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
