import { Box, Flex, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { AuthPage } from '.';
import {
  CustomAvatar,
  CustomButton,
  CustomHeading,
  CustomInput,
} from '../atoms/CustomBasicComponents';
import COLORS from '../../theme/_colors.scss';
import { CameraIcon, LockIcon, UserIcon } from '../atoms/icons';
import {
  updatePassword as updatePasswordAction,
  updateUserInfo as updateUserInfoAction,
} from '../../state/actions/user';
import { getCurrentUser as getCurrentUserAction } from '../../state/actions/auth';
import { LoadingAnimation } from '../animations';

function Settings({
  updatePassword,
  updateUserInfo,
  getCurrentUser,
  currentUser,
}) {
  const { t } = useTranslation();
  const {
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    image_url: imageUrl,
  } = currentUser;
  const userName = `${firstName} ${lastName}`;
  const [showAvatarHover, setShowAvatarHover] = useState(false);
  const [passwordError, setPasswordError] = useState();
  const [passwordSuccess, setPasswordSuccess] = useState();
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [userInfoError, setUserInfoError] = useState();
  const [userInfoSuccess, setUserInfoSuccess] = useState();
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    firstName,
    lastName,
    username,
    email,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleUploadImage = () => {
    console.log('Uploading image...');
  };

  const handleChangeValue = (e, keyName) => {
    setNewUserInfo({ ...newUserInfo, [keyName]: e.target.value });
  };

  const handleChangePassword = () => {
    setPasswordLoading(true);
    setPasswordError(null);
    setPasswordSuccess(null);
    const { oldPassword, newPassword, confirmNewPassword } = newUserInfo;
    updatePassword({
      oldPassword,
      newPassword,
      confirmNewPassword,
    })
      .then((_) => {
        setPasswordError(null);
        setPasswordSuccess(t('password-updated-successfully'));
        setPasswordLoading(false);
      })
      .catch((e) => {
        setPasswordError(e.response.data.message);
        setPasswordSuccess(null);
        setPasswordLoading(false);
      });
  };

  const handleChangeUserInfo = () => {
    setUserInfoLoading(true);
    setUserInfoError(null);
    setUserInfoSuccess(null);
    const { firstName, lastName, username, email } = newUserInfo;
    updateUserInfo({
      firstName,
      lastName,
      username,
      email,
    })
      .then((_) => {
        setUserInfoError(null);
        setUserInfoSuccess(t('user-updated-successfully'));
        setUserInfoLoading(false);
        getCurrentUser();
      })
      .catch((e) => {
        setUserInfoError(e.response.data.message);
        setUserInfoSuccess(null);
        setUserInfoLoading(false);
      });
  };

  return (
    <AuthPage>
      <CustomHeading text={t('settings')} />

      <Flex
        align='center'
        gap={5}
        w='full'
        bg='white'
        p={10}
        borderRadius={20}
        mt={5}
      >
        <Box
          _hover={{ cursor: 'pointer' }}
          onMouseEnter={() => setShowAvatarHover(true)}
          onMouseLeave={() => setShowAvatarHover(false)}
          position='relative'
          onClick={handleUploadImage}
        >
          <Box
            position='absolute'
            top={0}
            left={0}
            bg={COLORS.greyTransparent}
            w='full'
            h='full'
            borderRadius='full'
            display={showAvatarHover ? 'flex' : 'none'}
            zIndex={5}
            justifyContent='center'
            alignItems='center'
          >
            <CameraIcon color='white' />
          </Box>
          <CustomAvatar name={userName} src={imageUrl} size='xl' />
        </Box>
        <Box>
          <Text fontWeight='bold' fontSize={30} color='secondary.300'>
            {userName}
          </Text>
          <Text fontSize={18}>{email}</Text>
        </Box>
      </Flex>

      <Flex gap={5}>
        <Box w='full' bg='white' p={10} borderRadius={20} mt={5}>
          <Flex align='center' mb={5} gap={5}>
            <UserIcon size='16pt' color={COLORS.secondary} />
            <Text fontSize={26} fontWeight='bold' color='secondary.300'>
              {t('personal-info')}
            </Text>
          </Flex>
          <Flex flexDir='column' gap={5}>
            <Flex gap={5}>
              <CustomInput
                placeholder={t('first-name')}
                value={newUserInfo.firstName}
                onChange={(e) => handleChangeValue(e, 'firstName')}
                label={t('first-name')}
              />
              <CustomInput
                placeholder={t('last-name')}
                value={newUserInfo.lastName}
                onChange={(e) => handleChangeValue(e, 'lastName')}
                label={t('last-name')}
              />
            </Flex>
            <CustomInput
              placeholder={t('username')}
              value={newUserInfo.username}
              onChange={(e) => handleChangeValue(e, 'username')}
              label={t('username')}
            />
            <CustomInput
              placeholder={t('email')}
              value={newUserInfo.email}
              onChange={(e) => handleChangeValue(e, 'email')}
              label={t('email')}
            />
            {userInfoError && (
              <Text fontSize={14} color='primary.500' textAlign='center'>
                {userInfoError}
              </Text>
            )}
            {userInfoSuccess && (
              <Text fontSize={14} color='green.500' textAlign='center'>
                {userInfoSuccess}
              </Text>
            )}
            <CustomButton text={t('save')} onClick={handleChangeUserInfo} />
            {userInfoLoading && (
              <Flex h='100px' justifyContent='center' dir='row'>
                <LoadingAnimation />
              </Flex>
            )}
          </Flex>
        </Box>

        <Box w='full' bg='white' p={10} borderRadius={20} mt={5}>
          <Flex align='center' mb={5} gap={5}>
            <LockIcon size='16pt' color={COLORS.secondary} />
            <Text fontSize={26} fontWeight='bold' color='secondary.300'>
              {t('password-and-security')}
            </Text>
          </Flex>
          <Flex flexDir='column' gap={5}>
            <CustomInput
              placeholder={t('old-password')}
              value={newUserInfo.oldPassword}
              onChange={(e) =>
                setNewUserInfo({ ...newUserInfo, oldPassword: e.target.value })
              }
              label={t('old-password')}
              type='password'
              autoComplete='new-password'
            />
            <CustomInput
              placeholder={t('new-password')}
              value={newUserInfo.newPassword}
              onChange={(e) =>
                setNewUserInfo({
                  ...newUserInfo,
                  newPassword: e.target.value,
                })
              }
              label={t('new-password')}
              type='password'
              autoComplete='new-password'
            />
            <CustomInput
              placeholder={t('confirm-new-password')}
              value={newUserInfo.confirmNewPassword}
              onChange={(e) =>
                setNewUserInfo({
                  ...newUserInfo,
                  confirmNewPassword: e.target.value,
                })
              }
              label={t('confirm-new-password')}
              type='password'
              autoComplete='new-password'
            />
            {passwordError && (
              <Text fontSize={14} color='primary.500' textAlign='center'>
                {passwordError}
              </Text>
            )}
            {passwordSuccess && (
              <Text fontSize={14} color='green.500' textAlign='center'>
                {passwordSuccess}
              </Text>
            )}
            <CustomButton text={t('save')} onClick={handleChangePassword} />
            {passwordLoading && (
              <Flex h='100px' justifyContent='center' dir='row'>
                <LoadingAnimation />
              </Flex>
            )}
          </Flex>
        </Box>
      </Flex>
    </AuthPage>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.auth.currentUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePassword: (obj) => dispatch(updatePasswordAction(obj)),
    updateUserInfo: (obj) => dispatch(updateUserInfoAction(obj)),
    getCurrentUser: () => dispatch(getCurrentUserAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
