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
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableFooter = ({items}) => {
    const total = items.map(item => item['Lineitem quantity'] * item['Lineitem price'])
        .reduce((accumulator, currentValue) => accumulator + currentValue , 0)
    return(
      <View style={styles.row}>
        <Text style={styles.description}>TOTAL </Text>
        <Text style={styles.total}>{Number.parseFloat(total).toFixed(2)}</Text>
      </View>
    )
};

  export default InvoiceTableFooter
