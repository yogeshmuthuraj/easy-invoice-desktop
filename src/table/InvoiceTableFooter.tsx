import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        alignItems: 'center',
        height: 15,
        fontSize: 5,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
        paddingRight: 2,
    },
    grandTotal: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 2,
    },
  });


const InvoiceTableFooter = ({items, grandTotal, shipping}) => {
  return(
    <View>
      <View style={styles.row}>
        <Text style={styles.description}>Shipping</Text>
        <Text style={styles.grandTotal}>{shipping}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL</Text>
        <Text style={styles.grandTotal}>{grandTotal}</Text>
      </View>
    </View>
  )
};

  export default InvoiceTableFooter
