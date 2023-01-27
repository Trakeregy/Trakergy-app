import React, { useEffect, useMemo, useState } from 'react';
import { Box, Flex, Select, Text } from '@chakra-ui/react';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { BarChart, LineChart, PieChart } from '../atoms/Charts';
import {
  getPersonalYears as getPersonalYearsAction,
  getPersonalSumByTypeLastXYears as getPersonalSumByTypeLastXYearsAction,
  getPersonalSumByTypeByMonth as getPersonalSumByTypeByMonthAction,
} from '../../state/actions/reports';
import { getMonthName } from '../../utils/functions';
import { useTranslation } from 'react-i18next';

function Statistics({
  getPersonalYears,
  getPersonalSumByTypeLastXYears,
  getPersonalSumByTypeByMonth,
  years,
  expensesPerYear,
  sumByTypeByMonth,
}) {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [lastNYears, setLastNYears] = useState(10);
  const [lastNYearsData, setLastNYearsData] = useState();
  const [sumByType, setSumByType] = useState([]);
  const [monthlyData, setMonthlyData] = useState();
  const y = useMemo(() => years, [years]);

  useEffect(() => {
    getPersonalYears();
    getPersonalSumByTypeLastXYears(lastNYears); // 10
    getPersonalSumByTypeByMonth();
  }, []);

  useEffect(() => {
    if (expensesPerYear) {
      handleSelectYear(y[0]);
      setLastNYearsData(expensesPerYear);
      setLastNYears(10);
    }
  }, [expensesPerYear]);

  useEffect(() => {
    if (!years) return;
    else handleSelectYear(years[0]);
  }, [y]);

  const handleSelectYear = (yr) => {
    const newYear = parseInt(yr);
    setSelectedYear(newYear);
    if (!expensesPerYear || !sumByTypeByMonth) return;

    const filtered = expensesPerYear.filter((i) => i.year === newYear);
    if (filtered.length > 0) {
      const yearObject = filtered[0];
      const amounts = yearObject.amounts;
      setSumByType(amounts);
    }

    const monthlyData = sumByTypeByMonth[newYear];

    const dataPerTag = monthlyData.map((item) => {
      const tag = item.tag_name;
      const monthIndex = item.month;
      const monthSumForTag = item.sum;
      const monthName = getMonthName(monthIndex);

      return {
        id: tag,
        x: monthName,
        y: monthSumForTag,
      };
    });

    let data = {};
    dataPerTag.forEach((item) => {
      const { id, x, y } = item;
      if (!(id in data)) data[id] = [];
      data[id].push({ x, y });
    });

    setMonthlyData(data);
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

  const lineData = monthlyData
    ? Object.keys(monthlyData).map((k) => ({ id: k, data: monthlyData[k] }))
    : [];

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
  const barData2 = lastNYearsData
    ? lastNYearsData.map((i) => {
        const year = i.year;
        const amounts = i.amounts;
        const values = amounts.map((am) => am.sum);
        const totalSum = values.reduce((sum, amount) => sum + amount, 0);
        const newObj = totalSum
          ? {
              year,
              Total: Math.round(totalSum * 100) / 100,
            }
          : {
              year,
            };
        return newObj;
      })
    : [];

  return (
    <AuthPage>
      <Flex alignItems='center' mb={5}>
        {years && years.length > 0 && (
          <>
            <Text>{t('select-year')}</Text>
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

      <Flex flexDir='row' gap={5} flexWrap='wrap'>
        <PieChart
          data={pieData}
          title={`${t('sum-by-type')}, ${selectedYear}`}
        />
        <PieChart
          data={percentagePieData}
          title={`${t('percentage-by-type')}, ${selectedYear}`}
          labelSuffix='%'
        />
      </Flex>

      <Box mt={5}>
        <LineChart data={lineData} title={t('sum-by-type-monthly')} />
      </Box>

      <Flex flex='1' flexDir='column' bg='white' borderRadius={20} my={5}>
        <Flex
          alignItems='center'
          mb={5}
          px={10}
          pt={10}
          justifyContent='flex-end'
        >
          <Text>{t('select-number-of-years')}</Text>
          <Select
            bg='grey.100'
            border='none'
            onChange={(e) => handleSelectLastNYears(e.target.value)}
            value={lastNYears}
            w='fit-content'
            mx={5}
          >
            {[2, 3, 5, 8, 10].map((y) => (
              <option key={y}>{y}</option>
            ))}
          </Select>
        </Flex>
        {counter !== number ? (
          <Flex flexDir='row' gap={5} flexWrap='wrap'>
            <BarChart
              data={barData}
              title={`${t('sum-by-type')}, ${t('last')} ${lastNYears} ${t(
                'years'
              )}`}
              keyName='year'
            />
            <BarChart
              data={barData2}
              title={`${t('total-expenses')}, ${t('last')} ${lastNYears} ${t(
                'years'
              )}`}
              keyName='year'
            />
          </Flex>
        ) : (
          <Text px={10} pb={10} textAlign='center'>
            {`${t('no-expenses')} (${t('last')} ${lastNYears} ${t('years')})`}
          </Text>
        )}
      </Flex>
    </AuthPage>
  );
}

const mapStateToProps = (state) => {
  return {
    years: state.personalReports.years,
    expensesPerYear: state.personalReports.expensesPerYear,
    sumByTypeByMonth: state.personalReports.sumByTypeByMonth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getPersonalYears: () => dispatch(getPersonalYearsAction()),
    getPersonalSumByTypeLastXYears: (ny) =>
      dispatch(getPersonalSumByTypeLastXYearsAction(ny)),
    getPersonalSumByTypeByMonth: (y) =>
      dispatch(getPersonalSumByTypeByMonthAction(y)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
