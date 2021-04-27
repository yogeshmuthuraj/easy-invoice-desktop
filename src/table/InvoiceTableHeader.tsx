import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        height: 15,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
    },
    sno: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
    },
    qty: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
    },
    amount: {
        width: '15%'
    },
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.sno}>S.No</Text>
        <Text style={styles.description}>Item Description</Text>
        <Text style={styles.qty}>Qty</Text>
        <Text style={styles.rate}>Unit Price</Text>
        <Text style={styles.amount}>Amount</Text>
    </View>
  );

  export default InvoiceTableHeader
