import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    height: 13,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  sno: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 2,
    borderRightWidth: 0.5
  },
  itemName: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 3,
    paddingRight: 4,
    borderRightWidth: 0.5
  },
  sku: {
    width: '35%',
    textAlign: 'left',
    paddingRight: 3,
    paddingLeft: 3,
    borderRightWidth: 0.5
  },
  qty: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 2,
    borderRightWidth: 0.5
  },
  unitPrice: {
    width: '10%',
    textAlign: 'left',
    paddingLeft: 2,
    borderRightWidth: 0.5
  },
  subTotal: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 2
  },
});

const InvoiceTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.sno}>S.No</Text>
    <Text style={styles.itemName}>Item Description</Text>
    <Text style={styles.sku}>SKU</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.unitPrice}>Unit Price</Text>
    <Text style={styles.subTotal}>Subtotal</Text>
  </View>
);

export default InvoiceTableHeader
