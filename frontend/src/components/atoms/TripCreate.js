import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
  Textarea,
  Stack,
} from '@chakra-ui/react';
import Select from 'react-select';
import { connect } from 'react-redux';
import {
  editTrip,
  addTrip,
  getAllLocations,
  getRandomPhotoLocation,
} from '../../state/actions/trips';
import { getAllUsers } from '../../state/actions/users';
import { CustomAvatar } from './CustomBasicComponents';

const TripCreate = ({
  isOpen,
  close,
  addTrip,
  editTrip,
  editMode,
  tripData,
}) => {
  const { t } = useTranslation();
  const [locations, setLocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [trip, setTrip] = useState({});
  const [step, setStep] = useState(1);

  useEffect(() => {
    async function fetchLocations() {
      const response = await getAllLocations();
      setLocations(
        response.map((location) => ({
          value: location.id,
          label: location.country,
        }))
      );
    }
    async function fetchUsers() {
      const response = await getAllUsers();
      setUsers(
        response.map((user) => ({
          value: user.id,
          label: `${user.first_name} ${user.last_name}`,
          image_url: user.image_url,
        }))
      );
    }
    fetchLocations();
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isOpen) {
      if (tripData) {
        setTrip({
          ...tripData,
          location: {
            value: tripData.location.id,
            label: tripData.location.country,
          },
          members: tripData.members.map((user) => ({
            value: user.id,
            label: `${user.first_name} ${user.last_name}`,
            image_url: user.image_url,
          })),
        });
      }
    }
  }, [isOpen]);

  const isDataValid = trip.name?.length >= 3;
  const handleTripCreate = async () => {
    const photo = await getRandomPhotoLocation(trip.location.label);
    console.log(photo?.results[0]?.urls?.regular);
    await addTrip({
      ...trip,
      image_url: photo?.results[0]?.urls?.regular,
      location: trip.location.value,
      members: trip.members.map((member) => member.value),
    });
    setTrip({});
    close();
  };

  const handleTripEdit = async () => {
    await editTrip({
      ...trip,
      location: trip.location.value,
      members: trip.members.map((member) => member.value),
    });
    setTrip({});
    close();
  };

  const nextStep = () => setStep(2);

  const handleClose = () => {
    setTrip({});
    setStep(1);
    close();
  };
  const memberOption = ({ value, label, image_url }) => (
    <Flex direction='row' gap='2' alignItems='center'>
      <CustomAvatar size='sm' src={image_url} name={label} />
      <div>{label}</div>
    </Flex>
  );

  return (
    <>
      <Modal size='xl' isOpen={isOpen} onClose={handleClose} isCentered={true}>
        <ModalOverlay />
        <ModalContent borderRadius='16' boxShadow='xl'>
          <ModalHeader mt='2' pb='0' fontSize='23'>
            {editMode ? t('trip-edit-title') : t('trip-create-title')}
          </ModalHeader>
          <ModalCloseButton borderRadius='full' size='md' />
          <ModalBody>
            <Text fontSize='md'>
              {editMode ? t('trip-edit-subtitle') : t('trip-create-subtitle')}
            </Text>
            <Stack gap='6' mt='8'>
              {step === 1 ? (
                <>
                  <FormControl id='name' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('trip-name-label')}
                    </FormLabel>
                    <Input
                      size='md'
                      borderRadius='xl'
                      value={trip.name}
                      onChange={(e) =>
                        setTrip({
                          ...trip,
                          name: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl id='description' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('trip-description-label')}
                    </FormLabel>
                    <Textarea
                      value={trip.description}
                      borderRadius='xl'
                      onChange={(e) =>
                        setTrip({
                          ...trip,
                          description: e.target.value,
                        })
                      }
                      size='md'
                    />
                  </FormControl>
                  <FormControl id='from_date' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('start-date-label')}
                    </FormLabel>
                    <Input
                      size='md'
                      type='date'
                      borderRadius='xl'
                      value={trip.from_date}
                      onChange={(e) =>
                        setTrip({
                          ...trip,
                          from_date: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                  <FormControl id='to_date' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('end-date-label')}
                    </FormLabel>
                    <Input
                      size='md'
                      type='date'
                      borderRadius='xl'
                      value={trip.to_date}
                      onChange={(e) =>
                        setTrip({
                          ...trip,
                          to_date: e.target.value,
                        })
                      }
                    />
                  </FormControl>
                </>
              ) : (
                <>
                  <FormControl id='location' isRequired>
                    <FormLabel fontSize={'md'} color='gray.600'>
                      {t('location-label')}
                    </FormLabel>
                    <Select
                      aria-labelledby='aria-label'
                      inputId='aria-location-input'
                      name='aria-locations'
                      options={locations}
                      onChange={(newValue) =>
                        setTrip({ ...trip, location: newValue })
                      }
                      value={trip.location}
                    />
                  </FormControl>
                  {!editMode && (
                    <FormControl id='members' isRequired>
                      <FormLabel fontSize={'md'} color='gray.600'>
                        {t('members-label')}
                      </FormLabel>
                      <Select
                        isMulti
                        aria-labelledby='aria-label'
                        inputId='aria-members-input'
                        name='aria-members'
                        options={users}
                        formatOptionLabel={memberOption}
                        onChange={(newValue) =>
                          setTrip({ ...trip, members: newValue })
                        }
                        value={trip.members}
                      />
                    </FormControl>
                  )}
                </>
              )}
            </Stack>
          </ModalBody>
          <ModalFooter>
            {step !== 1 ? (
              <>
                <Button variant='ghost' mr={3} onClick={handleClose}>
                  {t('dismiss')}
                </Button>

                <Button
                  colorScheme='primary'
                  borderRadius='lg'
                  onClick={editMode ? handleTripEdit : handleTripCreate}
                >
                  {editMode ? t('edit') : t('create')}
                </Button>
              </>
            ) : (
              <Button
                isDisabled={!isDataValid}
                colorScheme='primary'
                borderRadius='lg'
                onClick={nextStep}
              >
                {t('next')}
              </Button>
            )}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    addTrip: (trip) => dispatch(addTrip(trip)),
    editTrip: (trip) => dispatch(editTrip(trip)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TripCreate);
