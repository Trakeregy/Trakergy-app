import React from 'react';
import {
  Box,
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
  ArrowDownShortIcon,
  ArrowUpShortIcon,
  BellIcon,
  CalendarIcon,
  CancelIcon,
  DoneIcon,
  MoneyIcon,
  OptionsVerticalIcon,
  TripIcon,
} from './icons';
import { useTranslation } from 'react-i18next';
import { completePayment as completePaymentAction } from '../../state/actions/payments';
import COLORS from '../../theme/_colors.scss';

function Debt({ debt, currentUser, completePayment }) {
  const { t } = useTranslation();
  const { id: userId } = currentUser;
  const { expense, from, to, amount, trip, is_paid: isPaid } = debt;
  const { description, date, id: expenseId } = expense;
  const { name: tripName } = trip;
  const {
    id: payerId,
    first_name: payerFirstName,
    last_name: payerLastName,
    image_url: payerImageUrl,
  } = to;
  const {
    id: userToPayId,
    first_name: userToPayFirstName,
    last_name: userToPayLastName,
    image_url: userImageUrl,
  } = from;

  const payerName = `${payerFirstName} ${payerLastName}`;
  const userToPayName = `${userToPayFirstName} ${userToPayLastName}`;
  const expenseDate = date ? `${format(new Date(date), 'E, LLL d, yyyy')}` : '';

  const mustPay = payerId !== userId;

  const handleCompletePayment = () => {
    completePayment({ expenseId, userId: userToPayId, isPaid: true });
  };

  const handleCancelPayment = () => {
    completePayment({ expenseId, userId: userToPayId, isPaid: false });
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
    <Flex
      flexDir='row'
      gap={5}
      bg='white'
      p={5}
      pr={10}
      borderRadius={20}
      w={500}
    >
      <Box
        h='full'
        w={2}
        borderRadius='full'
        bg={mustPay ? COLORS.red : COLORS.green}
      />

      <Flex flex={1} pr={5} w='full' flexDir='column'>
        <Flex gap={3} mb={5} flex={1}>
          <Flex>
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
                  {!isPaid ? (
                    <MenuItem
                      colorScheme='primary'
                      fontSize='16px'
                      onClick={handleCompletePayment}
                      icon={<DoneIcon size='16pt' />}
                    >
                      {t('complete-payment')}
                    </MenuItem>
                  ) : (
                    <MenuItem
                      colorScheme='primary'
                      fontSize='16px'
                      onClick={handleCancelPayment}
                      icon={<CancelIcon size='16pt' />}
                    >
                      {t('cancel-payment')}
                    </MenuItem>
                  )}
                  {!isPaid && (
                    <MenuItem
                      colorScheme='primary'
                      fontSize='16px'
                      onClick={handleNotify}
                      icon={<BellIcon size='16pt' />}
                    >
                      {t('remind')}
                    </MenuItem>
                  )}
                </MenuList>
              </Menu>
            )}
          </Flex>
          <Text fontSize={24} fontWeight='bold'>
            {description}
          </Text>
        </Flex>

        <Flex flexDir='column' fontSize={16} gap={1}>
          <Flex align='center' gap={2}>
            <CalendarIcon size='14pt' />
            <Text>{expenseDate}</Text>
          </Flex>
          <Flex align='center' gap={2}>
            <TripIcon size='14pt' />
            <Text>{tripName}</Text>
          </Flex>
        </Flex>
      </Flex>

      <Flex
        align='center'
        gap={2}
        flexDir='column'
        justifyContent='center'
        w='20%'
      >
        <Flex align='center' gap={1}>
          <MoneyIcon size='14pt' />
          <Text fontWeight='bold'>{amount}</Text>
        </Flex>
        {mustPay ? <ArrowDownShortIcon /> : <ArrowUpShortIcon />}
        {mustPay ? (
          <CustomAvatar name={payerName} src={payerImageUrl} size='sm' />
        ) : (
          <CustomAvatar name={userToPayName} src={userImageUrl} size='sm' />
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

const mapDispatchToProps = (dispatch) => {
  return {
    completePayment: (obj) => dispatch(completePaymentAction(obj)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Debt);
