import React, { Fragment } from 'react';
import { Font, Text, View, StyleSheet } from '@react-pdf/renderer';

Font.registerHyphenationCallback(word => {
  // Return entire word as unique part
  return [word];
});

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
    width: '30%',
    textAlign: 'left',
    paddingLeft: 1,
    paddingRight: 4,
  },
  sku: {
    fontSize: 8,
    paddingRight: 5,
    textAlign: 'left',
    width: '40%',
  },
  qty: {
    fontSize: 8,
    paddingLeft: 3,
    textAlign: 'right',
    width: '5%',
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

const InvoiceTableRow = ({ items }) => {
  const rows = items.map((item, index) => {
    const unitPrice = parseFloat(item['Lineitem price']);

    let sku = item['Lineitem sku'];

    if (sku.length > 26) {
      // Split by 26 characters
      // filter(O=>O) for speed
      var splitWords = sku.split(/(.{26})/).filter(O=>O);
      sku = splitWords.join('\n');
    }

    return (
      <View style={styles.row} key={index} wrap={false}>
        <Text style={styles.sno}>{index + 1}.</Text>
        <Text style={styles.itemName}>{item['Lineitem name']}</Text>
        <Text wrap={false} style={styles.sku}>{sku}</Text>
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
