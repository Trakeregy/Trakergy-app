import React, { useEffect, useMemo, useState } from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { BarChart, LineChart, PieChart } from '../atoms/Charts';
import {
    getPersonalYears as getPersonalYearsAction,
    getPersonalSumByTypeLastXYears as getPersonalSumByTypeLastXYearsAction,
} from '../../state/actions/reports';

function Statistics({
    getPersonalYears,
    getPersonalSumByTypeLastXYears,
    years,
    expensesPerYear,
}) {
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [lastNYears, setLastNYears] = useState(10);
    const [lastNYearsData, setLastNYearsData] = useState();
    const [sumByType, setSumByType] = useState([]);
    const y = useMemo(() => years, [years]);

    useEffect(() => {
        getPersonalYears();
        getPersonalSumByTypeLastXYears(lastNYears); // 10
    }, []);

    useEffect(() => {
        if (expensesPerYear) {
            handleSelectYear(y[0]);
            setLastNYearsData(expensesPerYear);
            setLastNYears(10);
        }
    }, [expensesPerYear]);

    useEffect(() => {
        if (!years) return
        else handleSelectYear(years[0]);
    }, [y]);

    const handleSelectYear = (yr) => {
        const newYear = parseInt(yr);
        setSelectedYear(newYear);
        if (!expensesPerYear) return;

        const filtered = expensesPerYear.filter((i) => i.year === newYear);
        if (filtered.length > 0) {
            const yearObject = filtered[0];
            const amounts = yearObject.amounts;
            setSumByType(amounts);
        }
    };

    const handleSelectLastNYears = (newVal) => {
        const newExpenses = expensesPerYear.slice(-newVal);
        setLastNYearsData(newExpenses);
        setLastNYears(newVal);
    };

    const pieData = sumByType.map((i) => {
        return {
            id: i.tag_name,
            label: i.tag_name,
            value: Math.round(i.sum * 100) / 100,
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

    let counter = 0;
    let number = lastNYearsData ? lastNYearsData.length : 0;
    const barData = lastNYearsData
        ? lastNYearsData.map((i) => {
              let tags = [];
              if (i.amounts?.length > 0) {
                  i.amounts.map((am) => {
                      tags[am.tag_name] = Math.round(am.sum * 100) / 100;
                      return null;
                  });
              }
              const newObj = {
                  year: i.year,
                  ...tags,
              };
              const noOfKeys = Object.keys(newObj).length;
              if (noOfKeys === 1) counter++;
              return newObj;
          })
        : [];

    return (
        <AuthPage>
            <Flex alignItems='center' mb={5}>
                {years && years.length > 0 && (
                    <>
                        <Text>Select year</Text>
                        <Select
                            bg='white'
                            border='none'
                            onChange={(e) => handleSelectYear(e.target.value)}
                            value={selectedYear}
                            w='fit-content'
                            mx={5}
                        >
                            {years.map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </Select>
                    </>
                )}
            </Flex>

            <Flex flexDir={{base: 'row', sm:'column', md:'column', lg:'row'}} gap={5} flexWrap='wrap'>
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
            </Flex>
            
                <Flex
                    flex='1'
                    flexDir='column'
                    bg='white'
                    borderRadius={20}
                    my={5}
                >
                    <Flex
                        alignItems='center'
                        mb={5}
                        px={10}
                        pt={10}
                        justifyContent='flex-end'
                    >
                        <Text>Select number of years</Text>
                        <Select
                            bg='grey.100'
                            border='none'
                            onChange={(e) =>
                                handleSelectLastNYears(e.target.value)
                            }
                            value={lastNYears}
                            w='fit-content'
                            mx={5}
                        >
                            {[2, 3, 5, 8, 10].map((y) => (
                                <option key={y}>{y}</option>
                            ))}
                        </Select>
                    </Flex>
                    {counter !== number ? (<BarChart
                        data={barData}
                        title='Total of expenses by type, all years'
                        keyName='year'
                    />
                    ) : <Text px={10} pb={10} textAlign='center'>No expenses in the last {lastNYears} years</Text>}
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
        expensesPerYear: state.personalReports.expensesPerYear,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getPersonalYears: () => dispatch(getPersonalYearsAction()),
        getPersonalSumByTypeLastXYears: (ny) =>
            dispatch(getPersonalSumByTypeLastXYearsAction(ny)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
