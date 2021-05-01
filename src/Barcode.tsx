import React from 'react';
import { useBarcode } from 'react-barcodes';

function Barcode(value) {
  console.log('in barcode');
  console.log(value);

  const { inputRef } = useBarcode({
    value: value,
    options: {
      background: '#ffff00',
    }
  });

  return <svg ref={inputRef} />;
};

export default Barcode;
