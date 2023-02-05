import {
  Avatar,
  AvatarGroup,
  Box,
  Flex,
  Icon,
  IconButton,
  Image,
  Heading,
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { format } from 'date-fns';
import { t } from 'i18next';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { AuthPage } from '.';
import {
  deleteTrip,
  getTripInfo as getTripInfoAction,
  getUserTrips as getUserTripsAction,
} from '../../state/actions/trips';
import ROUTES from '../../utils/routes';
import { DEFAULT_TRIP_COVER_URL } from '../../utils/constants';
import { Forbidden } from '../atoms';
import { PieChart, LineChart, TimerangeChart, BarChart } from '../atoms/Charts';
import { CustomTable } from '../atoms/CustomBasicComponents';
import {
  ArrowLeftShortIcon,
  EditIcon,
  CalendarIcon,
  MapIcon,
  UserGroupIcon,
  OptionsVerticalIcon,
  TrashIcon,
} from '../atoms/icons';
import TripCreate from '../atoms/TripCreate';
import MemberAccess from '../atoms/MemberAccess';

function Trip({ getTripInfo, tripInfo, trips, currentUser, deleteTrip }) {
  const { tripId } = useParams();
  const { id: userId } = currentUser;
  const [forbidden, setForbidden] = useState(false);
  const [tripData, setTripData] = useState({});
  const navigate = useNavigate();

  const handleDeleteTrip = () => {
    deleteTrip(tripId);
    navigate(ROUTES.TRIPS);
  };

  useEffect(() => {
    if (trips && tripId) {
      const tripIds = trips.map((tr) => tr.id);
      const frb = tripIds.indexOf(parseInt(tripId)) === -1;
      setForbidden(frb);
      if (frb) return;

      getTripInfo(tripId);
    } else if (tripId === undefined) {
      setTripData({});
      setForbidden(false);
    }
  }, [trips, tripId]);

  useEffect(() => {
    if (tripInfo && tripId) {
      setTripData(tripInfo);
    }
  }, [tripInfo]);

  const [openEditTrip, setOpenEditTrip] = useState(false);
  const onCloseTripEdit = () => setOpenEditTrip(false);
  const [openMemberAccess, setOpenMemberAccess] = useState(false);
  const onCloseMemberAccess = () => setOpenMemberAccess(false);

  if (forbidden) {
    return (
      <AuthPage>
        <Forbidden />
      </AuthPage>
    );
  }

  const {
    name: tripName,
    from_date: startDate,
    to_date: endDate,
    image_url,
    description,
    location,
    members,
    expenses,
  } = tripData;

  const isAdmin = tripData?.admin?.id === userId;

  const tripPeriod = startDate
    ? `${format(new Date(startDate), 'E, LLL d')} - ${format(
        new Date(endDate),
        'E, LLL d'
      )}`
    : '';
  const computeTotalByType = (exps) => {
    const data = {};
    exps.forEach((e) => {
      const { tag, amount } = e;
      const { id: tagId, name: tagName } = tag;
      const value = parseFloat(amount);
      if (!(tagId in data))
        data[tagId] = {
          id: tagName,
          label: tagName,
          value: 0,
        };
      data[tagId].value += value;
    });

    const res = Object.keys(data).map((i) => {
      data[i].value = Math.round(data[i].value * 100) / 100;
      return data[i];
    });

    return res;
  };

  const computeTotalByTypeByDay = (exps) => {
    const tagData = {};
    const datesSet = new Set();
    exps.forEach((e) => {
      const { tag, date, amount } = e;
      const { name: tagName } = tag;
      const key = `${tagName}*${date}`;
      if (!(key in tagData)) tagData[key] = { tag: '', date: '', amount: 0 };
      tagData[key].tag = tagName;
      tagData[key].date = date;
      tagData[key].amount += parseFloat(amount);
      datesSet.add(date);
    });

    const dailyData = Object.keys(tagData).map((k) => tagData[k]);
    dailyData.sort((a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0));

    const datesSortedArray = Array.from(datesSet).sort();
    const dataPerTag = dailyData?.map((item) => {
      const tag = item.tag;
      const date = item.date;
      const amount = item.amount;
      return {
        id: tag,
        x: date,
        y: amount,
      };
    });

    let data = {};
    dataPerTag?.forEach((item) => {
      const { id, x, y } = item;
      if (!(id in data)) data[id] = [];
      data[id].push({ x, y });
    });

    const res = Object.keys(data).map((k) => ({
      id: k,
      data: [...datesSortedArray.map((d) => ({ x: d, y: null })), ...data[k]],
    }));

    return res;
  };

  const computeTotalByDay = (exps) => {
    const data = {};
    exps.forEach((e) => {
      const { date, amount } = e;
      if (!(date in data)) data[date] = 0;
      data[date] += parseFloat(amount);
    });
    const res = Object.keys(data).map((k) => ({
      day: k,
      value: Math.round(data[k] * 100) / 100,
    }));
    return res;
  };

  const computeTotalByTypeByUser = (exps) => {
    const data = {};
    exps.forEach((e) => {
      const { amount, tag, users_to_split: usersToSplit } = e;
      const { name: tagName } = tag;
      const splitInto = usersToSplit.length;
      const trueAmount = Math.round((amount / splitInto) * 100) / 100;

      usersToSplit.forEach((userId) => {
        if (!data[userId]) {
          data[userId] = { [tagName]: 0.0 };
        }
        if (!data[userId][tagName]) {
          data[userId][tagName] = 0.0;
        }
        data[userId][tagName] += trueAmount;
        data[userId][tagName] = Math.round(data[userId][tagName] * 100) / 100;
      });
    });

    const res = Object.keys(data).map((k) => {
      const user = members.find((m) => m.id === parseInt(k));
      const userName = user.first_name + ' ' + user.last_name;

      return {
        user: userName,
        ...data[k],
      };
    });

    return res;
  };

  const computeTotalByUser = (exps) => {
    const totalByUserByType = computeTotalByTypeByUser(exps);
    const data = totalByUserByType.map((i) => {
      const user = i.user;
      i.user = 0;
      const sum = Object.values(i).reduce((a, b) => a + b, 0);
      return {
        user,
        Total: Math.round(sum * 100) / 100,
      };
    });

    return data;
  };

  const getExpensesCols = () => {
    return ['description', 'amount', 'date', 'payer', 'tag'];
  };

  const getExpensesColNames = () => {
    return [t('description'), t('amount'), t('date'), t('payer'), t('tag')];
  };

  const getExpensesData = (exps) => {
    const data = exps.map((e) => {
      const {
        amount,
        date,
        description,
        payer: payerId,
        tag,
        users_to_split: usersToSplit,
      } = e;
      const { name: tagName } = tag;
      const payer = members.find((m) => m.id === parseInt(payerId));
      const payerName = payer?.first_name + ' ' + payer?.last_name;

      const usersToPay = usersToSplit.map((id) => {
        const user = members.find((m) => m.id === id);
        return user;
      });

      return {
        amount: parseFloat(amount),
        date,
        description,
        payer: payerName,
        tag: tagName,
        usersToPay: usersToPay,
        payerId,
      };
    });

    const isPersonal = (exp) =>
      exp.usersToPay.length === 1 && exp.usersToPay[0].id === userId;
    const isOthersPersonal = (exp) =>
      exp.usersToPay.length === 1 && exp.usersToPay[0].id !== userId;

    return {
      group: data.filter((exp) => !isPersonal(exp) && !isOthersPersonal(exp)),
      personal: data.filter(isPersonal),
    };
  };

  // show trip data
  if (tripId) {
    const totalByType = expenses ? computeTotalByType(expenses) : [];
    const totalByTypeByUser = expenses
      ? computeTotalByTypeByUser(expenses)
      : [];
    const totalByUser = expenses ? computeTotalByUser(expenses) : [];
    const totalByTypeByDay = expenses ? computeTotalByTypeByDay(expenses) : [];
    const totalByDay = expenses ? computeTotalByDay(expenses) : [];

    const expensesTableCols = getExpensesCols();
    const expensesTableColNames = getExpensesColNames();
    const expensesTableDataObj = expenses ? getExpensesData(expenses) : [];

    const { group: expensesTableData, personal: expensesTableDataPersonal } =
      expensesTableDataObj;

    return (
      <AuthPage>
        {tripData.id && (
          <TripCreate
            editMode={true}
            tripData={tripData}
            isOpen={openEditTrip}
            close={onCloseTripEdit}
          />
        )}
        {tripData.id && (
          <MemberAccess
            isOpen={openMemberAccess}
            close={onCloseMemberAccess}
            trip={tripData}
          />
        )}
        <Flex
          direction='row'
          h='calc(100vh - 40px)'
          position='relative'
          overflow='hidden'
        >
          <Box position='relative'>
            <Image
              h='100%'
              borderTopLeftRadius='10'
              borderBottomLeftRadius='10'
              w='40vw'
              objectFit='cover'
              src={image_url ?? DEFAULT_TRIP_COVER_URL}
              alt={location?.country}
            />
            <IconButton
              position='absolute'
              top='5'
              left='5'
              size='sm'
              borderRadius='full'
              colorScheme='primary'
              icon={<ArrowLeftShortIcon size='20pt' />}
              onClick={() => navigate(ROUTES.TRIPS)}
            ></IconButton>
          </Box>
          <Flex direction='column' flexGrow='1'>
            <Box
              bg='white'
              p={5}
              pl='12'
              overflowY='scroll'
              borderTopRightRadius='12'
              borderBottomRightRadius='12'
              h='100%'
            >
              <Box my='auto' mt='16'>
                <Flex direction='row'>
                  <Heading fontSize='36px' mb='5'>
                    {tripName}
                  </Heading>
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
                      {isAdmin && (
                        <MenuItem
                          colorScheme='primary'
                          fontSize='16px'
                          onClick={() => setOpenEditTrip(true)}
                          icon={<EditIcon size='16pt' />}
                        >
                          Edit trip
                        </MenuItem>
                      )}
                      <MenuItem
                        fontSize='16px'
                        icon={<UserGroupIcon size='16pt' />}
                        onClick={() => setOpenMemberAccess(true)}
                      >
                        Manage members
                      </MenuItem>
                      {isAdmin && (
                        <MenuItem
                          fontSize='16px'
                          icon={
                            <Icon as={TrashIcon} size='16pt' color='red.500' />
                          }
                          onClick={handleDeleteTrip}
                        >
                          Delete trip
                        </MenuItem>
                      )}
                    </MenuList>
                  </Menu>
                </Flex>
                <Flex direction='row' alignItems='center' gap='1' mb='2'>
                  <Icon size='18pt' as={CalendarIcon} />
                  <Text fontSize='md'>{tripPeriod}</Text>
                </Flex>
                {location && (
                  <Flex direction='row' alignItems='center' gap='1'>
                    <Icon size='18pt' as={MapIcon} />
                    <Text fontSize='md'>{location.country}</Text>
                  </Flex>
                )}

                {members?.length > 0 && (
                  <AvatarGroup mt='8' max={3}>
                    {members.map((member, i) => (
                      <Avatar
                        ml='0'
                        height='42px'
                        width='42px'
                        key={`trip-members-${i}`}
                        name={member.first_name + ' ' + member.last_name}
                        src={member.image_url}
                      />
                    ))}
                  </AvatarGroup>
                )}
              </Box>

              <Box overflowX='hidden' overflowY='auto'>
                <Tabs variant='soft-rounded' colorScheme='primary'>
                  <TabList gap={5} my={5}>
                    <Tab>{t('about')}</Tab>
                    <Tab>{t('expenses')}</Tab>
                    <Tab>{t('statistics')}</Tab>
                  </TabList>
                  <TabPanels m={0}>
                    {/* about */}
                    <TabPanel p={0} m={0}>
                      <Flex
                        bg='white'
                        borderRadius={20}
                        p='5'
                        direction='column'
                      >
                        {/* <Heading fontSize='md'>{t('about')}</Heading> */}
                        <Text fontSize='md'>{description}</Text>
                      </Flex>
                    </TabPanel>

                    {/* expenses */}
                    <TabPanel p={0} m={0}>
                      <Tabs variant='soft-rounded' colorScheme='primary'>
                        <TabList gap={5} mb={5}>
                          <Tab>{t('group-expenses')}</Tab>
                          <Tab>{t('personal-expenses')}</Tab>
                        </TabList>
                        <TabPanels m={0}>
                          <TabPanel
                            p={0}
                            m={0}
                            borderRadius={20}
                            overflow='hidden'
                          >
                            <Box bg='white'>
                              <CustomTable
                                columns={expensesTableCols}
                                columnNames={expensesTableColNames}
                                data={expensesTableData}
                              />
                            </Box>
                          </TabPanel>
                          <TabPanel
                            p={0}
                            m={0}
                            borderRadius={20}
                            overflow='hidden'
                          >
                            <Box bg='white'>
                              <CustomTable
                                columns={expensesTableCols}
                                columnNames={expensesTableColNames}
                                data={expensesTableDataPersonal}
                                expandableRows={false}
                              />
                            </Box>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                    </TabPanel>

                    {/* statistics */}
                    <TabPanel p={0} m={0}>
                      <Flex borderRadius={20} gap={5}>
                        <PieChart title={t('sum-by-type')} data={totalByType} />
                        <PieChart
                          title={t('percentage-by-type')}
                          data={totalByType}
                          percentage={true}
                        />
                      </Flex>
                      <Flex my={5} gap={5}>
                        <TimerangeChart
                          data={totalByDay}
                          title={t('total-by-day')}
                          from={startDate}
                          to={endDate}
                        />
                        <LineChart
                          data={totalByTypeByDay}
                          title={t('total-by-day-by-type')}
                        />
                      </Flex>
                      <Flex gap={5}>
                        <BarChart
                          title={t('total-by-type-by-user')}
                          data={totalByTypeByUser}
                          keyName='user'
                        />
                        <BarChart
                          title={t('total-by-user')}
                          data={totalByUser}
                          keyName='user'
                        />
                      </Flex>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </Box>
            </Box>
          </Flex>
        </Flex>
      </AuthPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tripInfo: state.trips.tripInfo,
    trips: state.trips.trips,
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTripInfo: (id) => dispatch(getTripInfoAction(id)),
    getUserTrips: () => dispatch(getUserTripsAction()),
    deleteTrip: (id) => dispatch(deleteTrip(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trip);
