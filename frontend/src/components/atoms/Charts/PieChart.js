import { Flex, Text } from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import COLORS from '../../../theme/_colors.scss';

const PieChart = ({ data, title, labelSuffix = '' }) => {
  const chartMargin = 40;

  if (!data || data.length === 0) return <></>;

  return (
    <Flex
      flexDir='column'
      flex='1'
      h='fit-content'
      bg='white'
      borderRadius={20}
      p={5}
    >
      <Text textAlign='center' fontSize={30}>
        {title}
      </Text>
      <Flex w='100%' h={300}>
        <ResponsivePie
          data={data}
          colors={{ scheme: 'pastel2' }}
          margin={{
            top: chartMargin,
            right: 0,
            bottom: chartMargin,
            left: 0,
          }}
          innerRadius={0.3}
          padAngle={0.7}
          cornerRadius={5}
          enableArcLinkLabels={false}
          arcLabel={(d) => `${d.value}${labelSuffix}`}
          arcLabelsTextColor={{
            from: 'color',
            modifiers: [['darker', 2]],
          }}
          activeInnerRadiusOffset={4}
          activeOuterRadiusOffset={4}
          legends={[
            {
              anchor: 'bottom-left',
              direction: 'column',
              justify: false,
              translateX: 0,
              translateY: 0,
              itemsSpacing: 0,
              itemWidth: 100,
              itemHeight: 18,
              itemTextColor: COLORS.secondaryDark,
              itemDirection: 'left-to-right',
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: 'circle',
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default PieChart;
