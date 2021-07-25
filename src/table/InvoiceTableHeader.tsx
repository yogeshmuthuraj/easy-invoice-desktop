import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
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
    paddingLeft: 1,
  },
  itemName: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 1,
    paddingRight: 4,
  },
  sku: {
    width: '35%',
    textAlign: 'left',
    paddingRight: 5,
  },
  qty: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 2,
  },
  unitPrice: {
    width: '10%',
    textAlign: 'right',
    paddingLeft: 2,
  },
  subTotal: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 3,
  },
});

const InvoiceTableHeader = () => (
  <View fixed style={styles.container}>
    <Text style={styles.sno}>S. No</Text>
    <Text style={styles.itemName}>Item Description</Text>
    <Text style={styles.sku}>SKU</Text>
    <Text style={styles.qty}>Qty</Text>
    <Text style={styles.unitPrice}>Unit Price</Text>
    <Text style={styles.subTotal}>Subtotal</Text>
  </View>
);

export default InvoiceTableHeader;
