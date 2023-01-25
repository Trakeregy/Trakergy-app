import React, { useEffect } from 'react';
import { Box, Flex } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { BarChart, LineChart, PieChart } from '../atoms/Charts';
import { getPersonalSumByType as getPersonalSumByTypeAction } from '../../state/actions/reports';

function Statistics({ getPersonalSumByType, sumByType }) {
    useEffect(() => {
        getPersonalSumByType(2022); // TODO: user - select year
    }, []);

    const pieData = sumByType.map((i) => {
        return {
            id: i.tag_name,
            label: i.tag_name,
            value: i.sum,
        };
    });

    const lineData = [
        {
            id: 'Souvenirs',
            data: [
                {
                    x: 'january',
                    y: 296,
                },
                {
                    x: 'february',
                    y: 21,
                },
                {
                    x: 'march',
                    y: 245,
                },
                {
                    x: 'april',
                    y: 13,
                },
                {
                    x: 'may',
                    y: 259,
                },
                {
                    x: 'june',
                    y: 99,
                },
                {
                    x: 'july',
                    y: 252,
                },
                {
                    x: 'august',
                    y: 171,
                },
                {
                    x: 'september',
                    y: 231,
                },
                {
                    x: 'october',
                    y: 96,
                },
                {
                    x: 'november',
                    y: 2,
                },
                {
                    x: 'december',
                    y: 146,
                },
            ],
        },
        {
            id: 'Entertainment',
            data: [
                {
                    x: 'january',
                    y: 208,
                },
                {
                    x: 'february',
                    y: 179,
                },
                {
                    x: 'march',
                    y: 29,
                },
                {
                    x: 'april',
                    y: 116,
                },
                {
                    x: 'may',
                    y: 129,
                },
                {
                    x: 'june',
                    y: 297,
                },
                {
                    x: 'july',
                    y: 178,
                },
                {
                    x: 'august',
                    y: 251,
                },
                {
                    x: 'september',
                    y: 168,
                },
                {
                    x: 'october',
                    y: 34,
                },
                {
                    x: 'november',
                    y: 201,
                },
                {
                    x: 'december',
                    y: 206,
                },
            ],
        },
        {
            id: 'Food',
            data: [
                {
                    x: 'january',
                    y: 220,
                },
                {
                    x: 'february',
                    y: 299,
                },
                {
                    x: 'march',
                    y: 245,
                },
                {
                    x: 'april',
                    y: 281,
                },
                {
                    x: 'may',
                    y: 121,
                },
                {
                    x: 'june',
                    y: 26,
                },
                {
                    x: 'july',
                    y: 276,
                },
                {
                    x: 'august',
                    y: 189,
                },
                {
                    x: 'september',
                    y: 15,
                },
                {
                    x: 'october',
                    y: 131,
                },
                {
                    x: 'november',
                    y: 76,
                },
                {
                    x: 'december',
                    y: 175,
                },
            ],
        },
        {
            id: 'Transportation',
            data: [
                {
                    x: 'january',
                    y: 249,
                },
                {
                    x: 'february',
                    y: 238,
                },
                {
                    x: 'march',
                    y: 57,
                },
                {
                    x: 'april',
                    y: 256,
                },
                {
                    x: 'may',
                    y: 190,
                },
                {
                    x: 'june',
                    y: 247,
                },
                {
                    x: 'july',
                    y: 193,
                },
                {
                    x: 'august',
                    y: 194,
                },
                {
                    x: 'september',
                    y: 249,
                },
                {
                    x: 'october',
                    y: 22,
                },
                {
                    x: 'november',
                    y: 161,
                },
                {
                    x: 'december',
                    y: 262,
                },
            ],
        },
    ];
    const barData = [
        {
            year: '2018',
            Souvenirs: 34,
            Entertainment: 145,
            Food: 17,
            Transportation: 77,
        },
        {
            year: '2019',
            Souvenirs: 12,
            Entertainment: 25,
            Food: 65,
            Transportation: 67,
        },
        {
            year: '2020',
            Souvenirs: 49,
            Entertainment: 223,
            Food: 67,
            Transportation: 11,
        },
        {
            year: '2021',
            Souvenirs: 25,
            Entertainment: 67,
            Food: 56,
            Transportation: 95,
        },
        {
            year: '2022',
            Souvenirs: 12,
            Entertainment: 67,
            Food: 232,
            Transportation: 97,
        },
    ];

    const sum = pieData.map((i) => i.value).reduce((acc, a) => acc + a, 0);
    const percentagePieData = pieData.map((i) => {
        const newValue = Math.round((i.value / sum) * 100 * 100) / 100;
        return {
            ...i,
            value: newValue,
        };
    });

    return (
        <AuthPage>
            <Flex dir='row' gap={5} flexWrap='wrap'>
                <PieChart
                    data={pieData}
                    title='Total sum of expenses by type, 2022'
                />
                <PieChart
                    data={percentagePieData}
                    title='Percentage (%) of expenses by type, 2022'
                    labelSuffix='%'
                />
                <BarChart
                    data={barData}
                    title='Total of expenses by type, all years'
                    keyName='year'
                />
            </Flex>
            <Box mt={5}>
                <LineChart
                    data={lineData}
                    title='Total sum of expenses by type, on each month'
                />
            </Box>
        </AuthPage>
    );
}

const mapStateToProps = (state) => {
    return {
        sumByType: state.personalReports.sumByType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPersonalSumByType: (y) => dispatch(getPersonalSumByTypeAction(y)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
