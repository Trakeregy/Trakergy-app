import { Flex, Text } from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import COLORS from '../../../theme/_colors.scss';

const PieChart = ({ data, title, percentage = false }) => {
  const chartMargin = 40;

  if (!data || data.length === 0) return <></>;

  let dataToDisplay = [...data];
  if (percentage) {
    const sum = data.map((i) => i.value).reduce((acc, a) => acc + a, 0);
    dataToDisplay = data.map((i) => {
      const newValue = Math.round((i.value / sum) * 100 * 100) / 100;
      return {
        ...i,
        value: newValue,
      };
    });
  }

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
      <Flex w='100%' h={300}>
        <ResponsivePie
          data={dataToDisplay}
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
          arcLabel={(d) => `${d.value}${percentage ? '%' : ''}`}
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
