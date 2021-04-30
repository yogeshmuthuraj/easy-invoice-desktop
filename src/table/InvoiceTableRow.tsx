import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'grey'
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    height: 30,
    fontStyle: 'bold',
  },
  sno: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 2,
    borderRightWidth: 0.5
  },
  itemName: {
    width: '35%',
    textAlign: 'left',
    paddingLeft: 3,
    paddingRight: 4,
    borderRightWidth: 0.5
  },
  sku: {
    width: '35%',
    textAlign: 'left',
    paddingRight: 3,
    paddingLeft: 3,
    borderRightWidth: 0.5
  },
  qty: {
    width: '5%',
    textAlign: 'center',
    paddingLeft: 2,
    borderRightWidth: 0.5
  },
  unitPrice: {
    width: '10%',
    textAlign: 'left',
    paddingLeft: 2,
    borderRightWidth: 0.5
  },
  subTotal: {
    width: '10%',
    textAlign: 'right',
    paddingRight: 2
  },
});

const InvoiceTableRow = ({items}) => {
  const rows = items.map((item, index) => {
    // if (index > 3) {
    //   console.log('in if');
    //   return (
    //     <View key={index} style={styles.row} break>
    //       <Text style={styles.sno}>{index + 1}</Text>
    //       <Text style={styles.itemName}>{item['Lineitem name']}</Text>
    //       <Text style={styles.qty}>{item['Lineitem quantity']}</Text>
    //       <Text style={styles.unitPrice}>{item['Lineitem price']}</Text>
    //       <Text style={styles.subTotal}>{(item['Lineitem quantity'] * item['Lineitem price']).toFixed(2)}</Text>
    //     </View>
    //   );
    // } else {
    //   console.log('Else');
      return (
        <View style={styles.row} key={index} wrap={false}>
          <Text style={styles.sno}>{index + 1}.</Text>
          <Text style={styles.itemName}>{item['Lineitem name']}</Text>
          <Text style={styles.sku}>{item['Lineitem sku']}</Text>
          <Text style={styles.qty}>{item['Lineitem quantity']}</Text>
          <Text style={styles.unitPrice}>{item['Lineitem price']}</Text>
          <Text style={styles.subTotal}>{(item['Lineitem quantity'] * item['Lineitem price']).toFixed(2)}</Text>
        </View>
      )
    // }
  });
  return (<Fragment>{rows}</Fragment> )
};

export default InvoiceTableRow
