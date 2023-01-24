import { Flex, Text } from '@chakra-ui/react';
import { ResponsivePie } from '@nivo/pie';
import COLORS from '../../../theme/_colors.scss';

const PieChart = ({ data, title }) => {
    const chartMargin = 80;
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
            <Flex w='100%' h={400}>
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
            </Flex>
        </Flex>
    );
};

export default PieChart;
