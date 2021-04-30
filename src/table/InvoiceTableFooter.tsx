import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 8,
    fontSize: 5,
    fontStyle: 'bold',
    borderBottomWidth: 0.5
  },
  inWordsRow: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    alignItems: 'center',
    height: 8,
    fontSize: 5,
    fontStyle: 'bold',
  },
  totalDescription: {
    width: '90%',
    textAlign: 'right',
    fontSize: 6
  },
  grandTotal: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 2,
    fontSize: 6
  },
  inWordsDescription: {
    width: '18%',
    textAlign: 'left',
    paddingLeft: 2,
  },
  inWords: {
    width: '82%',
    textAlign: 'left',
    fontSize: 6
  },
  description: {
    width: '90%',
    textAlign: 'right',
  },
  value: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 2,
  },
});


const InvoiceTableFooter = ({items, grandTotal, shipping, amountInWords, taxes}) => {
  return(
    <View>
      <View style={styles.row}>
        <Text style={styles.description}>Shipping</Text>
        <Text style={styles.value}>{shipping}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>CGST 2.5%</Text>
        <Text style={styles.value}>{taxes.cgst}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>SGST 2.5%</Text>
        <Text style={styles.value}>{taxes.sgst}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>IGST 5%</Text>
        <Text style={styles.value}>{taxes.igst}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.totalDescription}>Total</Text>
        <Text style={styles.grandTotal}>{grandTotal}</Text>
      </View>
      <View style={styles.inWordsRow}>
        <Text style={styles.inWordsDescription}>Amount in Words :</Text>
        <Text style={styles.inWords}>{amountInWords}</Text>
      </View>
    </View>
  )
};

  export default InvoiceTableFooter
