import React from 'react';
import { BsCameraFill } from 'react-icons/bs';

function CameraIcon({ size = '20pt', ...otherProps }) {
  return <BsCameraFill size={size} {...otherProps} />;
}

export default CameraIcon;
