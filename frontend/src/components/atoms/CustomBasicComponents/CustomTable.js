import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import COLORS from '../../../theme/_colors.scss';
import { useTranslation } from 'react-i18next';
import { NoDataAnimation } from '../../animations';

const NoDataComponent = () => {
  const { t } = useTranslation();
  return (
    <Flex align='center' gap={5} pt={5}>
      <Box w={120}>
        <NoDataAnimation />
      </Box>
      <Text fontSize={26} mt={5}>
        {t('no-data')}
      </Text>
    </Flex>
  );
};

const ExpandedComponent = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Flex align='flex-start' flexDir='column'>
      <Text px={10} fontWeight='bold'>
        {t('users-to-split')}:
      </Text>
      <Flex flexWrap='wrap' w='100%'>
        {data.usersToPay.map((item, i) => (
          <Text key={i} px={10} py={1} fontSize={16} w='20%'>
            {item.first_name} {item.last_name}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
};

function CustomTable({
  columns = [],
  columnNames = [],
  data = [],
  expandableRows = true,
}) {
  const cols = columns.map((col, i) => {
    return {
      name: columnNames[i],
      selector: (row) => row[col],
      sortable: true,
      expandable: true,
    };
  });

  const rows = data.map((dd, i) => {
    return {
      id: i,
      ...dd,
    };
  });

  return (
    <DataTable
      columns={cols}
      data={rows}
      pagination
      striped
      expandableRows={expandableRows}
      noDataComponent={<NoDataComponent />}
      expandableRowsComponent={ExpandedComponent}
      customStyles={{
        head: {
          style: {
            fontSize: 18,
            fontWeight: 'bold',
            color: 'white',
          },
        },
        headRow: {
          style: {
            border: 'none',
            backgroundColor: COLORS.secondary,
          },
        },
        rows: {
          style: {
            fontSize: 15,
            '&:not(:last-of-type)': {
              border: 'none',
            },
          },
          stripedStyle: {
            backgroundColor: COLORS.grey,
          },
        },
      }}
    />
  );
}

export default CustomTable;
