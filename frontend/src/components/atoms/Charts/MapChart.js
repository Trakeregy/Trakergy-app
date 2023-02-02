import { useState } from 'react';
import { Flex, Text } from '@chakra-ui/react';
import { ResponsiveChoropleth } from '@nivo/geo';
import worldMapFeatures from '../../../assets/world_countries.json';
import { ArrowsRightLeftIcon, ArrowsUpDownIcon, ZoomIcon } from '../icons';
import { CustomSlider } from '../CustomBasicComponents';

const MapChart = ({ data, title }) => {
  const minValForZoom = 100;
  const maxValForZoom = 1000;
  const zoomSteps = (maxValForZoom - minValForZoom) / 100;
  const [zoom, setZoom] = useState(minValForZoom);
  const [zoomPercentage, setZoomPercentage] = useState(0);

  const minValForRotation = -180;
  const maxValForRotation = 180;
  const rotationSteps = (maxValForRotation - minValForRotation) / 100;
  const [rotation, setRotation] = useState(0);

  const minValForTranslation = 0 - zoomPercentage * 0.03;
  const maxValForTranslation = zoomPercentage * 0.03 + 1;
  const translationSteps = (maxValForTranslation - minValForTranslation) / 100;
  const [yTranslation, setYTranslation] = useState(0.5);

  let minValue =
    data && data.length > 0
      ? data.reduce((prev, curr) => (prev.value < curr.value ? prev : curr))
          .value
      : 0;
  minValue = Math.floor(minValue);
  let maxValue =
    data && data.length > 0
      ? data.reduce((prev, curr) => (prev.value < curr.value ? curr : prev))
          .value
      : 0;
  maxValue = Math.ceil(maxValue);

  const handleZoom = (v) => {
    const newZoomValue = zoomSteps * v + minValForZoom;
    setZoom(newZoomValue);
    setZoomPercentage(v);
  };

  const handleRotate = (v) => {
    const newRotationValue = rotationSteps * v + minValForRotation;
    setRotation(-newRotationValue);
  };

  const handleTranslate = (v) => {
    const newTranslationValue = translationSteps * v + minValForTranslation;
    setYTranslation(newTranslationValue);
  };

  return (
    <Flex
      flexDir='column'
      flex='1'
      h='fit-content'
      bg='white'
      borderRadius={20}
      p={10}
    >
      <Text textAlign='center' fontSize={30}>
        {title}
      </Text>
      <CustomSlider onChange={handleZoom} icon={ZoomIcon} />
      <Flex w='100%' h='100%'>
        <Flex flex='1' h='40rem'>
          <ResponsiveChoropleth
            data={data}
            features={worldMapFeatures.features}
            margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
            colors='BrBG'
            domain={[minValue, maxValue]}
            unknownColor='white'
            label='properties.name'
            valueFormat='.2f'
            projectionScale={zoom}
            projectionRotation={[rotation, 0, 0]}
            projectionTranslation={[0.5, yTranslation]}
            borderWidth={0.5}
            borderColor='#152538'
            legends={[
              {
                anchor: 'bottom-left',
                direction: 'column',
                justify: true,
                translateX: 20,
                translateY: -100,
                itemsSpacing: 0,
                itemWidth: 120,
                itemHeight: 18,
                itemDirection: 'left-to-right',
                itemTextColor: 'secondary.300',
                itemOpacity: 1,
                symbolSize: 18,
              },
            ]}
          />
        </Flex>
        <Flex>
          <CustomSlider
            onChange={handleTranslate}
            defaultValue={50}
            icon={ArrowsUpDownIcon}
            orientation='vertical'
          />
        </Flex>
      </Flex>
      <CustomSlider
        onChange={handleRotate}
        defaultValue={50}
        icon={ArrowsRightLeftIcon}
      />
    </Flex>
  );
};

export default MapChart;
