import React, { useRef } from 'react';
import Lottie from 'lottie-react';

const Animation = ({ style = {}, animationData, ...otherProps }) => {
  const lottieRef = useRef();

  return (
    <Lottie
      lottieRef={lottieRef}
      animationData={animationData}
      loop={false}
      autoplay
      style={style}
      onMouseEnter={() => {
        lottieRef.current.goToAndPlay(0);
      }}
      {...otherProps}
    />
  );
};

export default Animation;
