import React from 'react';
import { BsShieldLockFill } from 'react-icons/bs';

function LockIcon({ size = '20pt', ...otherProps }) {
  return <BsShieldLockFill size={size} {...otherProps} />;
}

export default LockIcon;
