import React from 'react';
import { FaUser } from 'react-icons/fa';

function UserIcon({ size = '20pt', ...otherProps }) {
  return <FaUser size={size} {...otherProps} />;
}

export default UserIcon;
