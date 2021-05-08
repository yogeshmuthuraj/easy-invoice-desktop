import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 8,
    fontSize: 6,
    fontStyle: 'bold',
    borderBottomWidth: 0.5,
  },
  totalRow: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 10,
    fontSize: 6,
    fontStyle: 'bold',
    borderBottomWidth: 0.5,
  },
  inWordsRow: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 8,
    fontSize: 6,
    fontStyle: 'bold',
  },
  totalDescription: {
    width: '90%',
    textAlign: 'right',
    fontSize: 7,
  },
  grandTotal: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 3,
    fontSize: 7,
  },
  inWordsDescription: {
    width: '18%',
    textAlign: 'left',
    paddingLeft: 2,
  },
  inWords: {
    width: '82%',
    textAlign: 'left',
    fontSize: 6,
  },
  description: {
    width: '90%',
    textAlign: 'right',
  },
  value: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 3,
  },
});

const InvoiceTableFooter = ({ grandTotal, shipping, amountInWords, taxes }) => {
  const shippingCharges =
    shipping > 0 ? (shipping - taxes.taxRate).toFixed(2) : shipping;

  return (
    <View wrap={false}>
      <View style={styles.row}>
        <Text style={styles.description}>Shipping</Text>
        <Text style={styles.value}>{shippingCharges}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>CGST 2.5%</Text>
        <Text style={styles.value}>{parseFloat(taxes.cgst).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>SGST 2.5%</Text>
        <Text style={styles.value}>{parseFloat(taxes.sgst).toFixed(2)}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>IGST 5%</Text>
        <Text style={styles.value}>{parseFloat(taxes.igst).toFixed(2)}</Text>
      </View>
      <View style={styles.totalRow}>
        <Text style={styles.totalDescription}>Total</Text>
        <Text wrap={false} style={styles.grandTotal}>
          {grandTotal}
        </Text>
      </View>
      <View style={styles.inWordsRow}>
        <Text style={styles.inWordsDescription}>Amount in Words :</Text>
        <Text style={styles.inWords}>{amountInWords}</Text>
      </View>
    </View>
  );
};

export default InvoiceTableFooter;
