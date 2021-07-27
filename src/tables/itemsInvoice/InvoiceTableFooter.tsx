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
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    fontSize: 6,
    height: 10,
    paddingRight: 3,
    textAlign: 'right',
  },
  totalRow: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    fontSize: 8,
    height: 15,
    paddingRight: 3,
    textAlign: 'right',
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
});

const InvoiceTableFooter = ({ grandTotal, discount , shipping, amountInWords, currency }) => {

  const displayDiscount = discount['code'].length > 0;

  return (
    <View wrap={false}>
      <View style={styles.row}>
        <Text wrap={false}>
          <Text>Shipping   </Text>
          <Text>{shipping}</Text>
        </Text>
      </View>
      {displayDiscount ? (
        <View style={styles.row}>
          <Text wrap={false}>
            <Text>Discount Code: {discount['code']}    </Text>
            <Text>Discount   {discount['value']}</Text>
          </Text>
        </View>
      ): null}
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
