import React, { useState } from 'react';
import {
  Box,
  Slider as ChakraSlider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';

function Slider({
  orientation = 'horizontal',
  defaultValue = 0,
  min = 0,
  max = 100,
  onChange,
  icon,
}) {
  const [sliderValue, setSliderValue] = useState(defaultValue);
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <ChakraSlider
      defaultValue={defaultValue}
      orientation={orientation}
      min={min}
      max={max}
      onChange={(v) => {
        setSliderValue(v);
        onChange(v);
      }}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      w='80%'
      h='80%'
      alignSelf='center'
    >
      <SliderTrack bg='grey.100' h={1} borderRadius='full'>
        <SliderFilledTrack bg='secondary.300' />
      </SliderTrack>
      <Tooltip
        hasArrow
        bg='primary.300'
        color='white'
        placement='auto'
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb boxSize={5}>
          <Box color='primary.300' as={icon} />
        </SliderThumb>
      </Tooltip>
    </ChakraSlider>
  );
}

export default Slider;
