import { Flex, Text } from '@chakra-ui/react';
import { ResponsiveCalendar } from '@nivo/calendar';

const CalendarChart = ({ data, title, from, to }) => {
  if (!data || data.length === 0) return <></>;

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
      <Flex w='100%' h={200}>
        <ResponsiveCalendar
          data={data}
          from={from}
          to={to}
          emptyColor='#eeeeee'
          colors={['#97e3d5', '#61cdbb', '#f0b460', '#f47560']}
          margin={{ top: 40, right: 0, bottom: 50, left: 0 }}
          yearSpacing={40}
          monthBorderColor='#ffffff'
          dayBorderWidth={2}
          dayBorderColor='#ffffff'
          legends={[
            {
              anchor: 'bottom',
              direction: 'row',
              translateY: -40,
              itemCount: 4,
              itemWidth: 42,
              itemHeight: 36,
              itemsSpacing: 14,
              itemDirection: 'right-to-left',
            },
          ]}
        />
      </Flex>
    </Flex>
  );
};

export default CalendarChart;
