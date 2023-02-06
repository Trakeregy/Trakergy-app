import { Flex, IconButton } from '@chakra-ui/react';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import { getUserTrips as getUserTripsAction } from '../../state/actions/trips';
import { PlusIcon } from '../atoms/icons';
import { CustomHeading } from '../atoms/CustomBasicComponents';
import TripCreate from '../atoms/TripCreate';
import TripItem from '../atoms/TripItem';

function Trips({ getUserTrips, trips }) {
  const [openCreateTrip, setOpenCreateTrip] = useState(false);
  const onCloseTripCreate = () => setOpenCreateTrip(false);
  useEffect(() => {
    getUserTrips();
  }, [getUserTrips]);

  // show trip list
  return (
    <AuthPage>
      <Flex direction='row' gap='2' mt='2' alignItems='center'>
        <CustomHeading text={t('trips')} />
        <IconButton
          size='sm'
          borderRadius='full'
          colorScheme='primary'
          icon={<PlusIcon size='18pt' />}
          onClick={() => setOpenCreateTrip(true)}
        ></IconButton>
      </Flex>
      <Flex mt='5' direction='row' gap='5' wrap='wrap'>
        {trips.map((tr, i) => (
          <TripItem trip={tr} key={i}></TripItem>
        ))}
      </Flex>
      <TripCreate
        editMode={false}
        isOpen={openCreateTrip}
        close={onCloseTripCreate}
      />
    </AuthPage>
  );
}

const mapStateToProps = (state) => {
  return {
    trips: state.trips.trips,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUserTrips: () => dispatch(getUserTripsAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Trips);
