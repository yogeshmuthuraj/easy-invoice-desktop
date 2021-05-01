import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from './InvoiceTableHeader'
import InvoiceTableRow from './InvoiceTableRow'
import InvoiceTableBlankSpace from './InvoiceTableBlankSpace'
import InvoiceTableFooter from './InvoiceTableFooter'

const tableRowsCount = 11;

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

const InvoiceItemsTable = (({items, grandTotal, shipping, amountInWords, taxes}) => {
    return (
      <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={items} taxRate={taxes.taxRate} />
        <InvoiceTableFooter items={items} grandTotal={grandTotal} shipping={shipping} amountInWords={amountInWords} taxes={taxes} />
      </View>
    )
  }
);

export default InvoiceItemsTable
