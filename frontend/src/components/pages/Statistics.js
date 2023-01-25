import React, { useEffect, useState } from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { BarChart, LineChart, PieChart } from '../atoms/Charts';
import {
    getPersonalSumByType as getPersonalSumByTypeAction,
    getPersonalYears as getPersonalYearsAction,
} from '../../state/actions/reports';

function Statistics({
    getPersonalSumByType,
    getPersonalYears,
    years,
    sumByType,
}) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

    useEffect(() => {
        getPersonalYears();
        getPersonalSumByType(selectedYear);
    }, []);

    useEffect(() => {
        const newSelectedYear =
            years && years.length > 0 ? years[0] : new Date().getFullYear();
        handleSelectYear(newSelectedYear);
    }, [years]);

    const handleSelectYear = (newYear) => {
        setSelectedYear(newYear);
        getPersonalSumByType(newYear);
    };

    const pieData = sumByType.map((i) => {
        return {
            id: i.tag_name,
            label: i.tag_name,
            value: i.sum,
        };
    });
    const sum = pieData.map((i) => i.value).reduce((acc, a) => acc + a, 0);
    const percentagePieData = pieData.map((i) => {
        const newValue = Math.round((i.value / sum) * 100 * 100) / 100;
        return {
            ...i,
            value: newValue,
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

    return (
        <AuthPage>
            <Flex alignItems='center' mb={5}>
                <Text>Select year</Text>
                <Select
                    bg='white'
                    border='none'
                    onChange={(e) => handleSelectYear(e.target.value)}
                    defaultValue={selectedYear}
                    value={selectedYear}
                    w='fit-content'
                    mx={5}
                >
                    {years?.map((y) => (
                        <option key={y}>{y}</option>
                    ))}
                </Select>
            </Flex>
            <Flex dir='row' gap={5} flexWrap='wrap'>
                <PieChart
                    data={pieData}
                    title={'Total sum of expenses by type, ' + selectedYear}
                />
                <PieChart
                    data={percentagePieData}
                    title={
                        'Percentage (%) of expenses by type, ' + selectedYear
                    }
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
        years: state.personalReports.years,
        sumByType: state.personalReports.sumByType,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPersonalYears: () => dispatch(getPersonalYearsAction()),
        getPersonalSumByType: (y) => dispatch(getPersonalSumByTypeAction(y)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
