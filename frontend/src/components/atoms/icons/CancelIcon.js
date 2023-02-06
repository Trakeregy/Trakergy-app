import React from 'react';
import { MdOutlineCancel } from 'react-icons/md';

function CancelIcon({ size = '20pt', ...otherProps }) {
  return <MdOutlineCancel size={size} {...otherProps} />;
}

export default CancelIcon;
