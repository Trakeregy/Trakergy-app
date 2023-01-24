import { Box, Text } from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import COLORS from '../../../theme/_colors.scss';

const PieChart = ({ data, title }) => {
    const chartMargin = 80;
    return (
        <Box
            w={{ base: '100%', lg: '30%' }}
            h='fit-content'
            bg='white'
            borderRadius={20}
            p={5}
        >
            <Text textAlign='center' fontSize={30}>
                {title}
            </Text>
            <Box w='100%' h={400}>
                <ResponsivePie
                    data={data}
                    colors={{ scheme: 'pastel2' }}
                    margin={{
                        top: chartMargin,
                        right: chartMargin,
                        bottom: chartMargin,
                        left: chartMargin,
                    }}
                    innerRadius={0.3}
                    padAngle={0.7}
                    cornerRadius={10}
                    arcLinkLabelsTextColor={COLORS.secondaryDark}
                    arcLinkLabelsThickness={2}
                    arcLinkLabelsColor={{ from: 'color' }}
                    arcLabelsTextColor={{
                        from: 'color',
                        modifiers: [['darker', 2]],
                    }}
                    activeInnerRadiusOffset={4}
                    activeOuterRadiusOffset={4}
                />
            </Box>
        </Box>
    );
};

export default PieChart;
