import React, { useEffect, useState } from 'react';
import {
  Button,
  IconButton,
  Text,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  ModalBody,
  ModalCloseButton,
  ModalFooter,
  Flex,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import { connect } from 'react-redux';
import { CustomAvatar } from './CustomBasicComponents';
import { TrashIcon } from './icons';
import { getAllUsers } from '../../state/actions/users';
import { updateMembers } from '../../state/actions/trips';

const MemberAccess = ({ isOpen, close, trip, updateMembers }) => {
  const { t } = useTranslation();
  const [users, setUsers] = useState([]);
  const [members, setMembers] = useState([]);
  const [value, setValue] = useState(null);

  const isAdmin = (userId) => userId === trip?.admin?.id;

  useEffect(() => {
    async function fetchUsers() {
      const response = await getAllUsers();
      const _users = response.map((user) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
        image_url: user.image_url,
      }));
      setUsers(_users);
    }
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isOpen) {
      const formMembers = trip.members.map((user) => ({
        value: user.id,
        label: `${user.first_name} ${user.last_name}`,
        image_url: user.image_url,
      }));
      setMembers(formMembers);
    }
  }, [isOpen, trip.members]);

  const handleClose = () => close();

  const memberOption = ({ value, label, image_url }) => (
    <Flex direction='row' gap='2' alignItems='center'>
      <CustomAvatar size='sm' src={image_url} name={label} />
      <div>{label}</div>
    </Flex>
  );

  const handleSelectMember = (newValue) => {
    setValue(null);
    setMembers([...members, newValue]);
  };

  const removeMember = (member) => {
    setMembers(members.filter((_member) => _member.value !== member.value));
  };

  const changeMemberAccess = () => {
    updateMembers(
      trip.id,
      members.map((_member) => _member.value)
    );
    handleClose();
  };

  return (
    <Modal size='xl' isOpen={isOpen} onClose={handleClose} isCentered={true}>
      <ModalOverlay />
      <ModalContent borderRadius='16' boxShadow='xl'>
        <ModalHeader mt='2' pb='0' fontSize='23'>
          {t('members-access-title')}
        </ModalHeader>
        <ModalCloseButton borderRadius='full' size='md' />
        <ModalBody>
          <Text mb='6' fontSize='md'>
            {t('member-access-subtitle')}
          </Text>
          <Select
            placeholder='Search for members'
            aria-labelledby='aria-label'
            inputId='aria-members-input'
            name='aria-members'
            options={users.filter(
              (_user) =>
                members.findIndex(
                  (_member) => _member.value === _user.value
                ) === -1
            )}
            formatOptionLabel={memberOption}
            onChange={handleSelectMember}
            value={value}
          />
          <Flex direction='column' gap='4' mt='6'>
            {members.map((member, id) => (
              <Flex
                direction='row'
                gap='2'
                alignItems='center'
                mx='2'
                key={`member-${id}`}
              >
                <CustomAvatar
                  size='sm'
                  src={member.image_url}
                  name={member.label}
                />
                <div>{member.label}</div>
                {!isAdmin(member.value) && (
                  <IconButton
                    ml='auto'
                    size='sm'
                    borderRadius='full'
                    colorScheme='red'
                    variant='ghost'
                    icon={<TrashIcon size='16pt' />}
                    onClick={() => removeMember(member)}
                  ></IconButton>
                )}
              </Flex>
            ))}
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button variant='ghost' mr={3} onClick={handleClose}>
            {t('dismiss')}
          </Button>

          <Button
            colorScheme='primary'
            borderRadius='lg'
            onClick={changeMemberAccess}
          >
            {t('save')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
    updateMembers: (tripId, members) =>
      dispatch(updateMembers(tripId, members)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MemberAccess);
