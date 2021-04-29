import React from 'react';

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

const borderColor = 'grey';
const borderStyle = 'normal';
const col1Width = 10;
const COLN_WIDTH = (100 - col1Width) / 3;

const styles = StyleSheet.create({
  table: {
    display: "table",
    width: "auto",
    borderStyle: borderStyle,
    borderColor: borderColor,
    borderTopWidth: 0.5,
    borderLeftWidth: 0.5,
    marginTop: 15,
    marginRight: 10,
  },
  colSno: {
    width: 10,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colItemDes: {
    width: 70,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colSku: {
    width: 50,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colQty: {
    width: 10,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colUnitPrice: {
    width: 15,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colNetPrice: {
    width: 15,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colTaxType: {
    width: 15,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colTaxAmount: {
    width: 15,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  colTotalAmount: {
    width: 30,
    borderBottomWidth: 0.5,
    borderRightWidth: 0.5,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row",
  },
  tableCell: {
    // margin: 5,
    fontSize: 7
  }
});

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
  const amountInWordsText = 'Amount in Words : ';

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

        console.log('in doc start: ', index);

        return (
          <Page key={index} size={paperSize}
            style={{
            paddingTop: 10, paddingLeft: 12, fontSize: 6 }}>
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
              <Text style={{ fontSize: 7, fontStyle: 'bold' }}>
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

            <View style={{ textAlign: 'left', fontSize: 8, paddingTop: 10, width: 150 }} className="shipping-details">
              <Text style={{ marginTop: 20 }}><strong>{shippingAddressText}</strong></Text>
              <Text>{orderRow['Shipping Name']}</Text>
              <Text>{orderRow['Shipping Address1']}</Text>
              <Text>{orderRow['Shipping Address2']}</Text>
              <Text>{orderRow['Shipping City']} - {orderRow['Shipping Zip'].replace(/'/g, '')}</Text>
              <Text>{orderRow['Shipping Province']}</Text>
            </View>

            <View className="invoice-table" style={{ fontSize: 5, paddingRight: 10 }}>
              <InvoiceItemsTable items={orderRow['More Details']} grandTotal={orderRow['Total']} shipping={orderRow['Shipping']} />
            </View>

            <Text style={{
                position: 'absolute',
                fontSize: 5,
                bottom: 50,
                textAlign: 'right',
              }}
            >
              {forSignaturePath}
            </Text>

            <Text style={{
                marginLeft: 30,
                position: 'absolute',
                fontSize: 5,
                bottom: 30,
                textAlign: 'center',
              }}
            >
              {declarationText1}
            </Text>

            <Text style={{
                marginLeft: 30,
                position: 'absolute',
                fontSize: 5,
                bottom: 25,
                textAlign: 'center',
              }}
            >
              {declarationText2}
            </Text>

            <Text style={{
              marginLeft: 30,
              position: 'absolute',
              fontSize: 5,
              bottom: 20,
              textAlign: 'center',
              color: 'grey'
              }}
            >
              {goodsText}
            </Text>

            <Text style={{
              marginLeft: 30,
              position: 'absolute',
              fontSize: 5,
              bottom: 15,
              textAlign: 'center',
              color: 'grey'
              }}
            >
              {jurisdictionText}
            </Text>
          </Page>
        );

        console.log('%cTEST');
      })}
    </Document>
  )


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
      <div style={{ marginLeft: 20, marginRight: 20, paddingBottom: 30, paddingTop: 30, fontSize: 15 }} key={fileName} >
        <PDFDownloadLink document={document} style={{ textDecoration: 'none', color: '#4159AF'  }} fileName={fileName + '.pdf'}>
          {({ blob, url, loading, error }) => {
            if (blob || url) {
              console.log('in if pdf link');
              return fileName;
            } else if (error){
              console.log('else if');
              return (
                <Alert severity="error" style={{ fontSize: '20px' }}>
                  <AlertTitle style={{ fontSize: '20px' }}>
                    Error
                  </AlertTitle>
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
                  </div>
                </Alert>
              );
            } else {
              console.log('else');
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
