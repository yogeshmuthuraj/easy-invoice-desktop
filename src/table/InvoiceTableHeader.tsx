import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        height: 112,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    sno: {
        width: '5%',
        paddingLeft: 2,
        paddingRight: 2,
    },
    lineItemName: {
        width: '60%',
        textAlign: 'left',
        paddingLeft: 2,
        paddingRight: 2,
    },
    qty: {
        width: '5%',
        textAlign: 'right',
        paddingLeft: 2,
        paddingRight: 2,
    },
    lineItemPrice: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 2,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 2,
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
      <Text style={styles.sno}>S.No</Text>
      <Text style={styles.lineItemName}>Item Description</Text>
      <Text style={styles.qty}>Qty</Text>
      <Text style={styles.lineItemPrice}>Unit Price</Text>
      <Text style={styles.amount}>Amount</Text>
    </View>
  );

  export default InvoiceTableHeader
