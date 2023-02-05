import React, { useState } from 'react';
import { Box, Flex, Input, Text, useToast } from '@chakra-ui/react';
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
  uploadProfileImage as uploadProfileImageAction,
} from '../../state/actions/user';
import { getCurrentUser as getCurrentUserAction } from '../../state/actions/auth';
import { LoadingAnimation } from '../animations';

function Settings({
  updatePassword,
  updateUserInfo,
  uploadProfileImage,
  getCurrentUser,
  currentUser,
}) {
  const { t } = useTranslation();
  const toast = useToast();
  const {
    id: userId,
    first_name: firstName,
    last_name: lastName,
    username,
    email,
    image_url: imageUrl,
  } = currentUser;
  const userName = `${firstName} ${lastName}`;
  const [showAvatarHover, setShowAvatarHover] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [userInfoLoading, setUserInfoLoading] = useState(false);
  const [imageInputRef, setImageInputRef] = useState();
  const [imageName, setImageName] = useState('');
  const [imageToPost, setImageToPost] = useState(null);
  const [loadingImage, setLoadingImage] = useState(false);
  const [newUserInfo, setNewUserInfo] = useState({
    firstName,
    lastName,
    username,
    email,
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const successToast = (text) => {
    toast({
      containerStyle: { color: 'white' },
      description: text,
      status: 'success',
      duration: 5000,
    });
  };

  const errorToast = (text) => {
    toast({
      containerStyle: { color: 'white' },
      description: text,
      status: 'error',
      duration: 5000,
    });
  };

  const handleSelectImage = () => {
    imageInputRef.click();
  };

  const handleChangeValue = (e, keyName) => {
    setNewUserInfo({ ...newUserInfo, [keyName]: e.target.value });
  };

  const handleChangePassword = () => {
    setPasswordLoading(true);
    const { oldPassword, newPassword, confirmNewPassword } = newUserInfo;
    updatePassword({
      oldPassword,
      newPassword,
      confirmNewPassword,
    })
      .then((_) => {
        setPasswordLoading(false);
        successToast(t('password-updated-successfully'));
      })
      .catch((e) => {
        setPasswordLoading(false);
        errorToast(e.response.data.message);
      });
  };

  const handleChangeUserInfo = () => {
    setUserInfoLoading(true);
    const { firstName, lastName, username, email } = newUserInfo;
    updateUserInfo({
      firstName,
      lastName,
      username,
      email,
    })
      .then((_) => {
        setUserInfoLoading(false);
        getCurrentUser();
        successToast(t('user-updated-successfully'));
      })
      .catch((e) => {
        setUserInfoLoading(false);
        errorToast(e.response.data.message);
      });
  };

  const handleChangeImage = (e) => {
    const file = e.target.files[0];
    const newFileName = `${userId}--${file.name}`;
    const newFile = new File([file], newFileName);
    setImageName(file.name);
    setImageToPost(newFile);
  };

  const handleUploadImage = () => {
    setLoadingImage(true);
    uploadProfileImage(imageToPost)
      .then((_) => {
        getCurrentUser();
        setImageToPost(null);
        setImageName('');
        setLoadingImage(false);
        successToast(t('image-uploaded-successfully'));
      })
      .catch((e) => {
        setImageToPost(null);
        setImageName('');
        setLoadingImage(false);
        errorToast(e.response.data.image[0]);
      });
  };

  return (
    <AuthPage>
      <CustomHeading text={t('settings')} />

      <Flex
        align={{ base: 'flex-start', md: 'center', lg: 'center' }}
        w='full'
        bg='white'
        p={10}
        borderRadius={20}
        mt={5}
        justifyContent='space-between'
        flexDir={{ base: 'column', md: 'row', lg: 'row' }}
        gap={5}
      >
        <Flex align='center' gap={5}>
          <Input
            type='file'
            name='image'
            onChange={handleChangeImage}
            id='post-image'
            accept='image/*'
            ref={(input) => setImageInputRef(input)}
            hidden
          />
          <Box
            _hover={{ cursor: 'pointer' }}
            onMouseEnter={() => setShowAvatarHover(true)}
            onMouseLeave={() => setShowAvatarHover(false)}
            position='relative'
            onClick={handleSelectImage}
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

        {imageToPost && (
          <Flex w='30%' justifyContent='flex-end' alignSelf='flex-end'>
            {loadingImage && (
              <Box w='100px'>
                <LoadingAnimation />
              </Box>
            )}
            <Flex flexDir='row' alignItems='center' justifyContent='flex-end'>
              <Flex flexDir='column' alignItems='flex-end' gap={1}>
                <CustomButton text={t('upload')} onClick={handleUploadImage} />
                <Text
                  noOfLines={1}
                  textAlign='end'
                  fontSize={14}
                  color='primary.500'
                >
                  {imageName}
                </Text>
              </Flex>
            </Flex>
          </Flex>
        )}
      </Flex>

      <Flex
        gap={5}
        flexDir={{
          base: 'column',
          md: 'row',
          lg: 'row',
        }}
      >
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
    uploadProfileImage: (image) => dispatch(uploadProfileImageAction(image)),
    getCurrentUser: () => dispatch(getCurrentUserAction()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
