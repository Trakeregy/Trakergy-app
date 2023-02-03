import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import noDataAnimation from '../../assets/animations/no-data.json';

function NoDataAnimation() {
  const lottieRef = useRef();

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={noDataAnimation}
      loop={false}
      autoplay
      onMouseEnter={() => {
        lottieRef.current.goToAndPlay(0);
      }}
    />
  );
}

export default NoDataAnimation;
