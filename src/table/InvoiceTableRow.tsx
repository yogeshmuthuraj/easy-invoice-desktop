import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.5,
        alignItems: 'center',
        height: 20,
        fontStyle: 'bold',
    },
    sno: {
        width: '5%',
        textAlign: 'center',
        paddingLeft: 2,
        paddingRight: 2,
    },
    lineItemName: {
        width: '60%',
        textAlign: 'left',
        paddingLeft: 2,
        paddingRight: 2,
    },
    qty: {
        width: '5%',
        textAlign: 'right',
        paddingLeft: 2,
        paddingRight: 2,
    },
    lineItemPrice: {
        width: '15%',
        textAlign: 'right',
        paddingLeft: 2,
        paddingRight: 2,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingLeft: 2,
        paddingRight: 2,
    },
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( (item, index) =>
      <View style={styles.row} key={index}>
        <Text style={styles.sno}>{index + 1}</Text>
        <Text style={styles.lineItemName}>{item['Lineitem name']}</Text>
        <Text style={styles.qty}>{item['Lineitem quantity']}</Text>
        <Text style={styles.lineItemPrice}>{item['Lineitem price']}</Text>
        <Text style={styles.amount}>{(item['Lineitem quantity'] * item['Lineitem price']).toFixed(2)}</Text>
      </View>
    )
    return (<Fragment>{rows}</Fragment> )
};

export default InvoiceTableRow
