import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
  shippingRow: {
      flexDirection: 'row',
      borderBottomColor: 'grey',
      alignItems: 'center',
      height: 15,
      fontSize: 5,
      fontStyle: 'bold',
      borderBottomWidth: 0.5
  },
  totalRow: {
      flexDirection: 'row',
      borderBottomColor: 'grey',
      alignItems: 'center',
      height: 15,
      fontSize: 5,
      fontStyle: 'bold',
      borderBottomWidth: 0.5
  },
  inWordsRow: {
      flexDirection: 'row',
      borderBottomColor: 'grey',
      alignItems: 'center',
      height: 15,
      fontSize: 5,
      fontStyle: 'bold',
  },
  totalDescription: {
      width: '85%',
      textAlign: 'right',
      fontSize: 6
  },
  grandTotal: {
      width: '15%',
      textAlign: 'right',
      paddingRight: 2,
      fontSize: 6
  },
  inWordsDescription: {
      width: '20%',
      textAlign: 'left',
      paddingLeft: 2,
  },
  inWords: {
      width: '80%',
      textAlign: 'left',
      fontSize: 6
  },
  shippingDescription: {
      width: '85%',
      textAlign: 'right',
  },
  shippingRate: {
      width: '15%',
      textAlign: 'right',
      paddingRight: 2,
  },

});


const InvoiceTableFooter = ({items, grandTotal, shipping, amountInWords}) => {
  return(
    <View>
      <View style={styles.shippingRow}>
        <Text style={styles.shippingDescription}>Shipping</Text>
        <Text style={styles.shippingRate}>{shipping}</Text>
      </View>
      <View style={styles.totalRow}>
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
