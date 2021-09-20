import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import TaxTableHeader from './TaxTableHeader';
import TaxTableRow from './TaxTableRow';
import TaxTableFooter from './TaxTableFooter';

const styles = StyleSheet.create({
  tableContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
    borderWidth: 0.5,
    borderTopWidth: 0,
    borderColor: 'grey',
    width: 50,
  },
});

const TaxItemsTable = ({ items, grandTotal, currency }) => {
  return (
    <View style={styles.tableContainer} wrap={false}>
      <TaxTableHeader />
      <TaxTableRow items={items} />
      <TaxTableFooter grandTotal={grandTotal} currency={currency} />
    </View>
  );
};

export default TaxItemsTable;
