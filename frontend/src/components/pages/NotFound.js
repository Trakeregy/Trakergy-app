import React from 'react';
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../utils/routes';
import { NotFoundAnimation } from '../animations';
import { CustomButton } from '../atoms/CustomBasicComponents';

function NotFound() {
  const { t } = useTranslation();

  return (
    <Box w='100%' h='100%'>
      <Flex w='100%' h='20pc' align='center' justifyContent='center' pt='50pt'>
        <NotFoundAnimation style={{ height: '100%' }} />
        <VStack align='flex-start' gap='5'>
          <Text fontSize='5xl' as='b' color='primary.500'>
            {t('page-not-found')}
          </Text>
          <Text color='grey.200'>{t('page-not-found-descr')}</Text>
          <Link href={ROUTES.TRIPS}>
            <CustomButton text={t('return-to-trips')} />
          </Link>
        </VStack>
      </Flex>
    </Box>
  );
}

export default NotFound;
