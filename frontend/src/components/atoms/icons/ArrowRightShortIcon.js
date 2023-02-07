import React from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';

function ArrowRightShortIcon({ size = '20pt' }) {
  return <BsArrowLeftShort size={size} style={{ rotate: '180deg' }} />;
}

export default ArrowRightShortIcon;
