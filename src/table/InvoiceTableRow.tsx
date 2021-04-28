import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        height: 15,
        fontStyle: 'bold',
    },
    sno: {
        width: '5%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
        paddingLeft: 8,
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
        paddingLeft: 8,
        paddingRight: 8,
    },
    qty: {
        width: '5%',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
        textAlign: 'center',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 0.5,
        textAlign: 'center',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( (item, index) =>
      <View style={styles.row} key={index}>
        <Text style={styles.sno}>{index + 1}</Text>
        <Text style={styles.description}>{item['Lineitem name']}</Text>
        <Text style={styles.qty}>{item['Lineitem quantity']}</Text>
        <Text style={styles.rate}>{item['Lineitem price']}</Text>
        <Text style={styles.amount}>{(item['Lineitem quantity'] * item['Lineitem price']).toFixed(2)}</Text>
      </View>
    )
    return (<Fragment>{rows}</Fragment> )
};

export default InvoiceTableRow
