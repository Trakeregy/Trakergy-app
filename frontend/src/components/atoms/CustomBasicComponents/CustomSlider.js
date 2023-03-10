import React, { useState } from 'react';
import {
  Box,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Tooltip,
} from '@chakra-ui/react';

function CustomSlider({
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
    <Slider
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
        bg='primary.500'
        color='white'
        placement='auto'
        isOpen={showTooltip}
        label={`${sliderValue}%`}
      >
        <SliderThumb boxSize={5}>
          <Box color='primary.500' as={icon} />
        </SliderThumb>
      </Tooltip>
    </Slider>
  );
}

export default CustomSlider;
