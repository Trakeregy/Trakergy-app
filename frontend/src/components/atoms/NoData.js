import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { NoDataAnimation } from '../animations';

const NoData = () => {
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

export default NoData;
