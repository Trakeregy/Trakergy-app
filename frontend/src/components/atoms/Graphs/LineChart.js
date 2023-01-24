import { Box, Text } from '@chakra-ui/react';
import { ResponsiveLine } from '@nivo/line';
import { useState } from 'react';

const LineChart = ({ data, title, xAxisName, yAxisName }) => {
    const [dataToDisplay, setDataToDisplay] = useState(data);
    const [dataId, setDataId] = useState(null);

    const handleOnClick = (point, _) => {
        const pointId = point.serieId;

        if (dataId === null) {
            const newData = data.filter((item) => item.id === pointId);
            setDataId(pointId);
            setDataToDisplay(newData);
        } else {
            setDataId(null);
            setDataToDisplay(data);
        }
    };

    return (
        <Box w='100%' h='fit-content' bg='white' borderRadius={20} p={5}>
            <Text textAlign='center' fontSize={30}>
                {title}
            </Text>
            <Box w='100%' h={400}>
                <ResponsiveLine
                    data={dataToDisplay}
                    colors={{ scheme: 'pastel2' }}
                    margin={{ top: 50, right: 200, bottom: 50, left: 60 }}
                    xScale={{ type: 'point' }}
                    yScale={{
                        type: 'linear',
                        min: 'auto',
                        max: 'auto',
                        stacked: false,
                        reverse: false,
                    }}
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
                        },
                    ]}
                    onClick={handleOnClick}
                />
            </Box>
        </Box>
    );
};

export default LineChart;
