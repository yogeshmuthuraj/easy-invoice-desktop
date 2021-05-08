import React, { Fragment } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    height: 30,
    fontStyle: 'bold',
  },
  nextPageFirstRow: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    height: 30,
    fontStyle: 'bold',
    marginTop: 20,
  },
  sno: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 1,
  },
  itemName: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 1,
    paddingRight: 4,
  },
  sku: {
    width: '35%',
    textAlign: 'left',
    paddingRight: 5,
  },
  qty: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 2,
  },
  unitPrice: {
    width: '10%',
    textAlign: 'right',
    paddingLeft: 2,
  },
  subTotal: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 2,
  },
});

const InvoiceTableRow = ({ items, taxRate }) => {
  const rows = items.map((item, index) => {
    const unitPrice = parseFloat(item['Lineitem price']) - taxRate;

    return (
      <View style={styles.row} key={index} wrap={false}>
        <Text style={styles.sno}>{index + 1}.</Text>
        <Text style={styles.itemName}>{item['Lineitem name']}</Text>
        <Text style={styles.sku}>{item['Lineitem sku']}</Text>
        <Text style={styles.qty}>{item['Lineitem quantity']}</Text>
        <Text style={styles.unitPrice}>{unitPrice.toFixed(2)}</Text>
        <Text style={styles.subTotal}>
          {(item['Lineitem quantity'] * unitPrice).toFixed(2)}
        </Text>
      </View>
    );
  });

  return <>{rows}</>;
};

export default InvoiceTableRow;
