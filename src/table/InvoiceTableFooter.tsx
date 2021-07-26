import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

// 'Courier',
// 'Courier-Bold',
// 'Courier-Oblique',
// 'Helvetica',
// 'Helvetica-Bold',
// 'Helvetica-Oblique',
// 'Times-Roman',
// 'Times-Bold',
// 'Times-Italic',

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 10,
    fontSize: 6,
    borderBottomWidth: 0.5,
  },
  totalRow: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    height: 15,
    paddingRight: 3,
    textAlign: 'right',
    fontSize: 8,
  },
  inWordsRow: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 8,
    fontSize: 6,
  },
  taxIncludedText: {
    fontFamily: 'Times-Italic',
    fontSize: 6,
  },
  grandTotal: {
    fontFamily: 'Helvetica-Bold',
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

const InvoiceTableFooter = ({ grandTotal, shipping, amountInWords, taxes, currency }) => {

  return (
    <View wrap={false}>
      <View style={styles.row}>
        <Text style={styles.description}>Shipping</Text>
        <Text style={styles.value}>{shipping}</Text>
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
        <Text wrap={false}>
          <Text style={styles.taxIncludedText}>(Inclusive of all Taxes) </Text>
          <Text style={styles.grandTotal}>Total </Text>
          <Text style={styles.grandTotal}>{currency} </Text>
          <Text style={styles.grandTotal}>{grandTotal}</Text>
        </Text>
      </View>
      <View style={styles.inWordsRow}>
        <Text style={styles.inWordsDescription}>Amount in Words: </Text>
        <Text style={styles.inWords}>{amountInWords}</Text>
      </View>
    </View>
  );
};

export default InvoiceTableFooter;
