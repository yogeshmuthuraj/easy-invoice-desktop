import React from 'react';

import { HashRouter as Router, Switch, Route, Link } from 'react-router-dom';

import { AppProvider, Card, Layout } from '@shopify/polaris';
import enTranslations from '@shopify/polaris/locales/en.json';

import Orders from './OrderInput';
import OrderDisplay from './OrderDisplay';
import FetchOrders from './FetchOrders';
import Carrier from './CarrierInput';
import CarrierInput from './CarrierInput';
import PrintPreview from './PrintPreview';

import '../assets/orders.css';
import './App.global.css';

export default function App() {
  return (
    <Router>
      <AppProvider i18n={enTranslations}>
        <div
          style={{
            paddingTop: 100,
            paddingRight: 200,
            paddingLeft: 200,
            fontSize: 14,
            fontFamily: 'Roboto !important'
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
