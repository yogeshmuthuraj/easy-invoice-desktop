import React from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    alignItems: 'center',
    height: 10,
    textAlign: 'center',
    fontStyle: 'bold',
    flexGrow: 1,
  },
  taxBreakup: {
    width: '100%',
    textAlign: 'center'
  }
});

const TaxTableHeader = () => (
  <View style={styles.container}>
    <Text style={styles.taxBreakup}>Tax Breakup</Text>
  </View>
);

export default TaxTableHeader;
