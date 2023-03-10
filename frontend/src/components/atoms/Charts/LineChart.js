import { Box, Text } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { useEffect, useState } from 'react';

const LineChart = ({ data, title, xAxisName, yAxisName }) => {
  const [dataToDisplay, setDataToDisplay] = useState(data);
  const [dataId, setDataId] = useState(null);

  useEffect(() => {
    setDataToDisplay(data);
  }, [data]);

  const handle = (id) => {
    if (dataId === null) {
      const filteredData = data.find((item) => item.id === id);
      const newData = filteredData.data.filter((i) => i.y !== null);
      const newD = [{ id, data: newData }];
      setDataId(id);
      setDataToDisplay(newD);
    } else {
      setDataId(null);
      setDataToDisplay(data);
    }
  };

  const handleOnClick = (point, _) => {
    const pointId = point.serieId;
    handle(pointId);
  };

  const handleLegendClick = (legendItem, _) => {
    const legendId = legendItem.id;
    handle(legendId);
  };

  if (!dataToDisplay || dataToDisplay.length === 0) {
    return <></>;
  }

  return (
    <Box w='100%' bg='white' borderRadius={20} p={10}>
      <Text textAlign='center' fontSize={30}>
        {title}
      </Text>
      <Box w='100%' h={400}>
        <ResponsiveLine
          data={dataToDisplay}
          colors={{ scheme: 'pastel2' }}
          margin={{ top: 50, right: 200, bottom: 60, left: 60 }}
          xScale={{ type: 'point' }}
          yScale={{
            type: 'linear',
            min: 'auto',
            max: 'auto',
            stacked: false,
            reverse: false,
          }}
          enableArea={true}
          yFormat=' >-.0d'
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: 'bottom',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: -45,
            legend: xAxisName,
            legendOffset: 40,
            legendPosition: 'middle',
          }}
          axisLeft={{
            orient: 'left',
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: yAxisName,
            legendOffset: -40,
            legendPosition: 'middle',
          }}
          pointSize={10}
          useMesh={true}
          legends={[
            {
              anchor: 'right',
              direction: 'column',
              justify: false,
              translateX: 150,
              translateY: 0,
              itemsSpacing: 10,
              itemDirection: 'left-to-right',
              itemWidth: 100,
              itemHeight: 20,
              itemOpacity: 1,
              symbolSize: 12,
              symbolShape: 'circle',
              onClick: handleLegendClick,
            },
          ]}
          onClick={handleOnClick}
        />
      </Box>
    </Box>
  );
};

export default LineChart;
