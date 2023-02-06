import React from 'react';
import { Flex, Text } from '@chakra-ui/react';
import DataTable from 'react-data-table-component';
import COLORS from '../../../theme/_colors.scss';
import { useTranslation } from 'react-i18next';
import { NoData } from '../';
import CustomAvatar from './CustomAvatar';

const ExpandedComponent = ({ data }) => {
  const { t } = useTranslation();
  return (
    <Flex align='flex-start' flexDir='column' mx={10} mb={5}>
      <Text fontWeight='bold'>{t('users-to-split')}:</Text>
      <Flex flexWrap='wrap' w='100%' gap={3}>
        {data.usersToPay.map((item, i) => (
          <CustomAvatar
            name={item.first_name + ' ' + item.last_name}
            src={item.image_url}
            size='sm'
          />
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
      noDataComponent={<NoData />}
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
