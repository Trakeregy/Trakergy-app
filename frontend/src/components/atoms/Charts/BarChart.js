import { Flex, Text } from '@chakra-ui/react';
import { ResponsiveBar } from '@nivo/bar';

const BarChart = ({ data, title, keyName }) => {
  if (!data || data.length === 0) return <></>;

  let keySet = new Set();
  for (let i = 0; i < data.length; i++) {
    let d = data[i];
    const keys = Object.keys(d).filter((k) => k !== keyName);
    keys.forEach((k) => keySet.add(k));
  }

  let keyArr = Array.from(keySet);

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
      <Flex w='100%' h={500}>
        <ResponsiveBar
          data={data}
          colors={{ scheme: 'pastel2' }}
          keys={keyArr}
          indexBy={keyName}
          margin={{ top: 50, right: 130, bottom: 150, left: 60 }}
          padding={0.3}
          valueScale={{ type: 'linear' }}
          indexScale={{ type: 'band', round: true }}
          borderColor={{
            from: 'color',
            modifiers: [['darker', 1.6]],
          }}
          borderRadius={5}
          axisTop={null}
          axisRight={null}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legendPosition: 'middle',
            legendOffset: 32,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legendPosition: 'middle',
            legendOffset: -40,
          }}
          label={false}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 10,
              itemWidth: 100,
              itemHeight: 20,
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

export default BarChart;
