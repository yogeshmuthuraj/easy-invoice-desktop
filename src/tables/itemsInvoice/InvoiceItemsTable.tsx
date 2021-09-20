import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader';
import InvoiceTableRow from './InvoiceTableRow';
import InvoiceTableFooter from './InvoiceTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: 'grey',
  },
});

const InvoiceItemsTable = ({
  items,
  grandTotal,
  discount,
  shipping,
  amountInWords,
  currency,
}) => {
  return (
    <View style={styles.tableContainer}>
      <InvoiceTableHeader />
      <InvoiceTableRow items={items} />
      <InvoiceTableFooter
        grandTotal={grandTotal}
        discount={discount}
        totalQty={items.length}
        shipping={shipping}
        amountInWords={amountInWords}
        currency={currency}
      />
    </View>
  );
};

export default InvoiceItemsTable;
