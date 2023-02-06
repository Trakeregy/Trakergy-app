import React from 'react';
import {
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { connect } from 'react-redux';
import { CustomAvatar } from './CustomBasicComponents';
import {
  ArrowRightShortIcon,
  BellIcon,
  CalendarIcon,
  DoneIcon,
  MoneyIcon,
  OptionsVerticalIcon,
  TripIcon,
  UserIcon,
} from './icons';
import { useTranslation } from 'react-i18next';

function Debt({ debt, currentUser }) {
  const { t } = useTranslation();
  const { id: userId } = currentUser;
  const { expense, from, to, amount, trip } = debt;
  const { description, date } = expense;
  const { name: tripName } = trip;
  const {
    id: payerId,
    first_name: payerFirstName,
    last_name: payerLastName,
  } = to;
  const {
    id: userToPayId,
    first_name: userToPayFirstName,
    last_name: userToPayLastName,
  } = from;

  const payerName = `${payerFirstName} ${payerLastName}`;
  const userToPayName = `${userToPayFirstName} ${userToPayLastName}`;
  const expenseDate = date ? `${format(new Date(date), 'E, LLL d')}` : '';

  const mustPay = payerId !== userId;

  // TODO
  const handleCompletePayment = () => {
    console.log('payment to complete:', description);
  };

  // TODO
  const handleNotify = () => {
    console.log(
      'payment to notify about, and user to notify:',
      description,
      userToPayId
    );
  };

  return (
    <Flex flexDir='column' gap={3} bg='white' p={10} w='23%' borderRadius={20}>
      <Flex>
        <Text fontSize={24} fontWeight='bold' flex={1}>
          {description}
        </Text>

        {!mustPay && (
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label='Options'
              borderRadius='full'
              colorScheme='primary'
              icon={<OptionsVerticalIcon size='12pt' />}
              variant='ghost'
            />
            <MenuList>
              <MenuItem
                colorScheme='primary'
                fontSize='16px'
                onClick={handleCompletePayment}
                icon={<DoneIcon size='16pt' />}
              >
                {t('complete-payment')}
              </MenuItem>
              <MenuItem
                colorScheme='primary'
                fontSize='16px'
                onClick={handleNotify}
                icon={<BellIcon size='16pt' />}
              >
                {t('remind')}
              </MenuItem>
            </MenuList>
          </Menu>
        )}
      </Flex>

      <Flex gap={3}>
        <CalendarIcon />
        <Text>{expenseDate}</Text>
      </Flex>
      <Flex gap={3}>
        <TripIcon />
        <Text>{tripName}</Text>
      </Flex>
      <Flex gap={3} color={mustPay ? 'red.500' : 'green.400'}>
        <MoneyIcon />
        <Text fontWeight='bold'>{amount}</Text>
        {mustPay ? (
          <>
            <Text>{t('to')}</Text>
            <CustomAvatar name={payerName} size='sm' />
          </>
        ) : (
          <>
            <Text>{t('from')}</Text>
            <CustomAvatar name={userToPayName} size='sm' />
          </>
        )}
      </Flex>
    </Flex>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

export default connect(mapStateToProps)(Debt);
