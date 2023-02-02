import { Flex, Text } from '@chakra-ui/react';
import { ResponsiveTimeRange } from '@nivo/calendar';

const TimerangeChart = ({ data, title, from, to }) => {
  if (!data || data.length === 0) return <></>;

  return (
    <Flex
      flexDir='column'
      minH='fit-content'
      w='fit-content'
      bg='white'
      borderRadius={20}
      p={10}
    >
      <Text textAlign='center' fontSize={30}>
        {title}
      </Text>
      <Flex w='100%' h={300}>
        <ResponsiveTimeRange
          data={data}
          from={from}
          to={to}
          emptyColor='#eeeeee'
          colors={['#61cdbb', '#97e3d5', '#e8c1a0', '#f47560']}
          margin={{ top: 50, right: 0, bottom: 70, left: 0 }}
          dayBorderWidth={2}
          dayBorderColor='#ffffff'
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              justify: false,
              itemCount: 4,
              itemWidth: 50,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'left-to-right',
              translateX: 0,
              translateY: -60,
              symbolSize: 20,
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default TimerangeChart;
