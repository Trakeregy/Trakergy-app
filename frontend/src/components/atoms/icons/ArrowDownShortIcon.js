import React from 'react';
import { BsArrowLeftShort } from 'react-icons/bs';

function ArrowDownShortIcon({ size = '20pt' }) {
  return <BsArrowLeftShort size={size} style={{ rotate: '-90deg' }} />;
}

export default ArrowDownShortIcon;
