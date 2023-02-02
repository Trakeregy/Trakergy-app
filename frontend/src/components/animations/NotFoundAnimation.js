import React from 'react';
import Lottie from 'lottie-react';
import notFoundAnimation from '../../assets/animations/search_empty.json';

export default function NotFoundAnimation({ style = {} }) {
  return (
    <Lottie animationData={notFoundAnimation} loop autoplay style={style} />
  );
}
