import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ForbiddenAnimation } from '../animations';
import { useNavigate } from 'react-router';
import ROUTES from '../../utils/routes';
import { CustomButton } from './CustomBasicComponents';
import { useTranslation } from 'react-i18next';

function Forbidden() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <Flex
      flexDir='column'
      w='fit-content'
      align='center'
      mx='auto'
      borderRadius={20}
      p={10}
      gap={5}
      justify='center'
    >
      <Box w={300}>
        <ForbiddenAnimation />
      </Box>
      <Flex flexDir='column' justify='center' align='center'>
        <Text fontSize={48} fontWeight='bold' color='secondary.300'>
          {t('forbidden')}
        </Text>
        <Text textAlign='center'>{t('forbidden-sorry')}</Text>
        <CustomButton
          onClick={() => navigate(ROUTES.TRIPS)}
          text={t('return-to-trips')}
          w='fit-content'
          mt={5}
        />
      </Flex>
    </Flex>
  );
}

export default Forbidden;
