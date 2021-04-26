import React from 'react';

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFViewer,
} from '@react-pdf/renderer';

import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { AppProvider, Card, Layout } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Orders from './OrderInput';
import OrderDisplay from './OrderDisplay';
import FetchOrders from './FetchOrders';
import Carrier from './CarrierInput';
import CarrierInput from './CarrierInput';
import PrintPreview from './PrintPreview';

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: 'row',
    backgroundColor: '#E4E4E4',
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
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
    fontSize: 8,
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
  smallHeading: {
    fontSize: 5,
    fontWeight: 'bold',
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
    fontFamily: 'Oswald',
  },
  signature: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
    fontFamily: 'Times-Roman',
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

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A6" style={styles.body}>
      <Text style={styles.header} fixed>
        TAX INVOICE
      </Text>

      <Text style={styles.gst} fixed>
        GSTIN:
      </Text>
      <Text style={styles.gst} fixed>
        Invoice:
      </Text>
      <Text style={styles.gst} fixed>
        Date:
      </Text>
      <Text style={styles.senderName} fixed>
        Pasway
      </Text>
      <Text style={styles.senderAddress}>Plot No:10,</Text>
      <Text style={styles.senderAddress}>Mahatma Gandhi Street,</Text>
      <Text style={styles.senderAddress}>Thoraipakkam</Text>
      <Text style={styles.senderAddress}>Chennai - 600097</Text>
      <Text style={styles.senderAddress}>Mob: 9894171779</Text>
      <Text style={styles.senderAddress}>email: warehouse@pasway.in</Text>

      <Text style={styles.smallHeading}>Shipping Address:</Text>
      <Text style={styles.shippingName} fixed>
        Customer 1
      </Text>
      <Text style={styles.shippingAddress}>Plot No:10,</Text>
      <Text style={styles.shippingAddress}>Mahatma Gandhi Street,</Text>
      <Text style={styles.shippingAddress}>Thoraipakkam</Text>
      <Text style={styles.shippingAddress}>Chennai - 600097</Text>
      <Text style={styles.shippingAddress}>Mob: 9894171779</Text>
      <Text style={styles.shippingAddress}>email: warehouse@pasway.in</Text>
      <Text
        style={styles.pageNumber}
        render={({ pageNumber, totalPages }) =>
          `Page ${pageNumber} of ${totalPages}`
        }
        fixed
      />
    </Page>
  </Document>
);

const Pdf = () => (
  <PDFViewer>
    <MyDocument />
  </PDFViewer>
);

const ordersd = () => <OrderDisplay />;

export default function App() {
  return (
    <Router>
      <AppProvider i18n={enTranslations}>
        <div
          style={{
            paddingTop: 100,
            paddingRight: 200,
            paddingLeft: 200,
            fontSize: '14px',
          }}
        >
          <Switch>
            <Route path="/carrier">
              <Carrier />
            </Route>
            <Route exact path="/fetchOrders">
              <FetchOrders />
            </Route>
            <Route path="/orderDisplay">
              <OrderDisplay />
            </Route>
            <Route exact path="/carrierInput">
              <CarrierInput />
            </Route>
            <Route exact path="/printPreview">
              <PrintPreview />
            </Route>
            <Route path="/">
              <Orders />
            </Route>
          </Switch>
        </div>
      </AppProvider>
    </Router>
  );
}
