import React from 'react';
import Lottie from 'lottie-react';
import loadingAnimation from '../../assets/animations/loading.json';

function LoadingAnimation() {
  return <Lottie animationData={loadingAnimation} loop={true} />;
}

export default LoadingAnimation;
