import React from 'react';
import Lottie from 'lottie-react';
import forbiddenAnimation from '../../assets/animations/forbidden.json';

function ForbiddenAnimation() {
  return <Lottie animationData={forbiddenAnimation} loop={false} />;
}

export default ForbiddenAnimation;
