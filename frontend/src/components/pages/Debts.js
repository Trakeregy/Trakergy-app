import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { getUserDebts as getUserDebtsAction } from '../../state/actions/payments';
import { Debt, NoData } from '../atoms';
import { CustomHeading } from '../atoms/CustomBasicComponents';

function Debts({ getUserDebts, userDebts, currentUser }) {
  const { t } = useTranslation();
  const { id: userId } = currentUser;
  const [debtsToPay, setDebtsToPay] = useState([]);
  const [debtsToReceive, setDebtsToReceive] = useState([]);
  const [completedDebts, setCompletedDebts] = useState([]);

  useEffect(() => {
    getUserDebts();
  }, []);

  useEffect(() => {
    const toPay = userDebts.filter(
      (debt) => debt.from.id === userId && debt.is_paid === false
    );
    const toReceive = userDebts.filter(
      (debt) => debt.to.id === userId && debt.is_paid === false
    );
    const completed = userDebts.filter((debt) => debt.is_paid === true);
    setDebtsToPay(toPay);
    setDebtsToReceive(toReceive);
    setCompletedDebts(completed);
  }, [userDebts]);

  return (
    <AuthPage>
      <CustomHeading text={t('debts')} />

      <Tabs variant='soft-rounded' colorScheme='primary'>
        <TabList my={5}>
          <Tab>{t('to-pay')}</Tab>
          <Tab>{t('to-receive')}</Tab>
          <Tab>{t('completed')}</Tab>
        </TabList>

        <TabPanels>
          <TabPanel p={0} m={0}>
            {debtsToPay.length > 0 ? (
              <Flex gap={5} flexWrap='wrap' w='100%'>
                {debtsToPay.map((debt, i) => (
                  <Debt debt={debt} key={i} />
                ))}
              </Flex>
            ) : (
              <NoData />
            )}
          </TabPanel>
          <TabPanel p={0} m={0}>
            {debtsToReceive.length > 0 ? (
              <Flex gap={5} flexWrap='wrap' w='100%'>
                {debtsToReceive.map((debt, i) => (
                  <Debt debt={debt} key={i} />
                ))}
              </Flex>
            ) : (
              <NoData />
            )}
          </TabPanel>
          <TabPanel p={0} m={0}>
            {completedDebts.length > 0 ? (
              <Flex gap={5} flexWrap='wrap' w='100%'>
                {completedDebts.map((debt, i) => (
                  <Debt debt={debt} key={i} />
                ))}
              </Flex>
            ) : (
              <NoData />
            )}
          </TabPanel>
        </TabPanels>
      </Tabs>
    </AuthPage>
  );
}

const mapStateToProps = (state) => {
  return {
    userDebts: state.payments.userDebts,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserDebts: () => dispatch(getUserDebtsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Debts);
