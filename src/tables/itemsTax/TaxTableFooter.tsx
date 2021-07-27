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
  totalRow: {
    alignItems: 'center',
    borderBottomColor: 'grey',
    flexDirection: 'row',
    fontSize: 6,
    height: 15,
    textAlign: 'center',
  },
  grandTotal: {
    fontFamily: 'Helvetica-Bold',
  }
});

const TaxTableFooter = ({ grandTotal, discount , shipping, amountInWords, currency }) => {

  return (
    <View wrap={false}>
      <View style={styles.totalRow}>
        <Text wrap={false}>
          <Text style={styles.grandTotal}>Total </Text>
          <Text style={styles.grandTotal}>{currency}</Text>
          <Text style={styles.grandTotal}>{grandTotal}</Text>
        </Text>
      </View>
    </View>
  );
};

export default TaxTableFooter;
