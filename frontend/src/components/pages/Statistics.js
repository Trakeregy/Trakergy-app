import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { AuthPage } from '.';
import LineChart from '../atoms/Graphs/LineChart';
import PieChart from '../atoms/Graphs/PieChart';

function Statistics() {
    const data = [
        {
            id: 'Entertainment',
            label: 'Entertainment',
            value: 70,
        },
        {
            id: 'Food',
            label: 'Food',
            value: 149,
        },
        {
            id: 'Transportation',
            label: 'Transportation',
            value: 508,
        },
        {
            id: 'Souvenirs',
            label: 'Souvenirs',
            value: 65,
        },
    ];
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

    return (
        <AuthPage>
            <Flex dir='row' gap={5}>
                <PieChart
                    data={data}
                    title='Total sum of expenses by type, 2022'
                />
                <PieChart
                    data={data}
                    title='Number of expenses by type, 2022'
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

export default Statistics;
