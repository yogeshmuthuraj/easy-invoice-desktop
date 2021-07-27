import React, { Fragment } from 'react';
import { Font, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    alignItems: 'center',
    height: 10,
  },
  value: {
    width: '100%',
    textAlign: 'center'
  }
});

const TaxTableRow = ({ items }) => {
  const rows = items.map((item, index) => {

    if (item['name'].length != 0) {
      return (
        <View style={styles.row} key={index} wrap={false}>
        <Text style={styles.value}>{item['name']}    {item['value']}</Text>
        </View>
      );
    }
  });

  return <>{rows}</>;
};

export default TaxTableRow;
