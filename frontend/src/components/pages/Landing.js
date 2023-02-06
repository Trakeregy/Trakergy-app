import React from 'react';
import {
  Box,
  Button,
  Flex,
  Heading,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Stack,
  Text,
} from '@chakra-ui/react';
import ROUTES from '../../utils/routes';
import { useNavigate } from 'react-router-dom';
import { CustomButton } from '../atoms/CustomBasicComponents';
import { useTranslation } from 'react-i18next';
import {
  ArrowRightShortIcon,
  CalendarIcon,
  ChartIcon,
  DoneIcon,
  LanguageIcon,
  MoneyIcon,
  UserGroupIcon,
} from '../atoms/icons';
import Fade from 'react-reveal/Fade';
import Zoom from 'react-reveal/Zoom';
import '../../theme/blob.scss';
import { Animation, ANIMATION_DATA } from '../animations';
import { LOCAL_STORAGE_KEYS } from '../../utils/constants';
import { BiUser } from 'react-icons/bi';

function Landing() {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const GettingStartedButton = (
    <CustomButton
      as='b'
      px={6}
      colorScheme='secondary'
      onClick={() => navigate(ROUTES.SIGN_UP)}
      alignSelf='center'
      rightIcon={<ArrowRightShortIcon />}
      text={t('get-started')}
    />
  );

  const presentationItems = [
    {
      title: t('pres-item-title-1'),
      descr: t('pres-item-desc-1'),
      animationData: ANIMATION_DATA.EXPENSES,
      width: '35%',
    },
    {
      title: t('pres-item-title-2'),
      descr: t('pres-item-desc-2'),
      animationData: ANIMATION_DATA.STATISTICS,
      width: '40%',
    },
    {
      title: t('pres-item-title-3'),
      descr: t('pres-item-desc-3'),
      animationData: ANIMATION_DATA.CALENDAR,
      width: '45%',
    },
  ];

  const mainFeatures = [
    {
      title: t('expense-tracking'),
      icon: MoneyIcon,
    },
    {
      title: t('group-expenses'),
      icon: UserGroupIcon,
    },
    {
      title: t('calendar-view'),
      icon: CalendarIcon,
    },
    {
      title: t('debts-tracking'),
      icon: MoneyIcon,
    },
    {
      title: t('trip-statistics'),
      icon: ChartIcon,
    },
  ];

  const sideFeatures = [
    {
      title: t('complete-payment'),
      desc: t('complete-payment-desc'),
      icon: DoneIcon,
    },
    {
      title: t('add-group-personal-expense'),
      desc: t('add-group-personal-expense-desc'),
      icon: BiUser,
    },
    {
      title: t('analyze-expenses'),
      desc: t('analyze-expenses-desc'),
      icon: ChartIcon,
    },
  ];

  const changeLang = (lang) => {
    localStorage.setItem(LOCAL_STORAGE_KEYS.LANGUAGE, lang);
    i18n.changeLanguage(lang);
  };

  const getLang = () => {
    const savedLang = localStorage.getItem(LOCAL_STORAGE_KEYS.LANGUAGE);
    let lang = '';
    if (savedLang === 'en') lang = 'English';
    else if (savedLang === 'ro') lang = 'Romana';
    return lang;
  };

  return (
    <Box w='100%' bgColor='white.300' minH='100vh' h='100%' m='0'>
      {/* Header */}
      <Flex
        h={{ base: '100pt', md: '50pt', lg: '50pt' }}
        bgColor='white.300'
        alignItems='center'
        position='sticky'
        top='0'
        zIndex={100}
        w='100%'
      >
        <Flex
          h='100%'
          alignItems='center'
          w='70%'
          mx='auto'
          justifyContent='space-between'
        >
          <Flex h='100%' alignItems='center'>
            <Text fontSize='3xl' as='b' mx='2'>
              {t('app-name')}
            </Text>
          </Flex>
          <Flex
            gap={{ base: 2, md: 5, lg: 5 }}
            mx={5}
            flexDir={{ base: 'column', md: 'row', lg: 'row' }}
          >
            <CustomButton
              text={t('log-in')}
              onClick={() => navigate(ROUTES.LOGIN)}
            />
            <CustomButton
              text={t('sign-up')}
              colorScheme='primary'
              variant='outline'
              onClick={() => navigate(ROUTES.SIGN_UP)}
            />
          </Flex>
        </Flex>
      </Flex>

      <Flex flexDir='column'>
        <Box h='100%' flexGrow='1'>
          <Box mx='auto' w='70%'>
            <Stack
              align={'center'}
              py={{ base: 10, md: 20 }}
              direction={{ base: 'column', md: 'row' }}
              justifyContent='center'
              textAlign='center'
            >
              <Flex className='shape' alignItems='center' h='30pc'>
                <Stack flex={1} spacing={{ base: 5, md: 10 }}>
                  <Heading
                    lineHeight={1.1}
                    fontWeight={600}
                    fontSize={{
                      base: '3xl',
                      sm: '4xl',
                      lg: '6xl',
                    }}
                  >
                    <Text as={'span'}>{t('landing-page-title')}</Text>
                    <br />
                    <Text as='i' color={'primary.400'}>
                      {t('app-name')}
                    </Text>
                  </Heading>
                  <Text color={'gray.500'} px={30}>
                    {t('landing-page-desc')}
                  </Text>
                  {GettingStartedButton}
                </Stack>
              </Flex>
            </Stack>
          </Box>

          <Flex
            gap={{ base: 5, md: 20, lg: 20 }}
            mx='auto'
            w='70%'
            justifyContent='center'
            flexWrap='wrap'
            mb='20'
          >
            {mainFeatures.map((item, i) => {
              return (
                <Flex
                  key={i}
                  flexDir='column'
                  alignItems='center'
                  textAlign='center'
                  w='50pt'
                  px={20}
                  py={10}
                  bgColor='grey.100'
                  borderRadius={20}
                  gap={3}
                >
                  <Flex flexGrow='1' alignItems='center'>
                    <Zoom>
                      <Text as='b' color='secondary.900'>
                        {item.title}
                      </Text>
                    </Zoom>
                  </Flex>
                  <Zoom>
                    <Box color='secondary.500'>{<item.icon />}</Box>
                  </Zoom>
                </Flex>
              );
            })}
          </Flex>

          <Flex flexDir='column' w='100%' bgColor='grey.100' gap={20} pb='10'>
            {presentationItems.map((item, i) => {
              const isLeft = i % 2 !== 0;
              const animation = (
                <Animation
                  style={{ width: item.width }}
                  animationData={item.animationData}
                />
              );
              return (
                <Box
                  key={i}
                  w={{ base: '100%', md: '70%', lg: '70%' }}
                  mx='auto'
                  mt='10'
                >
                  <Fade left={isLeft} right={!isLeft}>
                    <Flex
                      justifyContent='space-between'
                      textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                      alignItems='center'
                      flexDir={{ base: 'column', md: 'row', lg: 'row' }}
                    >
                      {isLeft && animation}
                      <Box w='55%'>
                        <Text fontSize={36} as='b' color='primary.900'>
                          {item.title}
                        </Text>
                        <Text fontSize={24} color='grey.900' my='8'>
                          {item.descr}
                        </Text>
                        {GettingStartedButton}
                      </Box>
                      {!isLeft && animation}
                    </Flex>
                  </Fade>
                </Box>
              );
            })}
          </Flex>

          <Flex
            w={{ base: '100%', md: '70%', lg: '70%' }}
            mx='auto'
            justifyContent='space-between'
            flexDir={{ base: 'column', md: 'row', lg: 'row' }}
            py={20}
          >
            {sideFeatures.map((item, i) => {
              return (
                <Flex
                  key={i}
                  my={{ base: 5, md: 0, lg: 0 }}
                  flexDir='column'
                  alignItems={{
                    base: 'center',
                    md: 'flex-start',
                    lg: 'flex-start',
                  }}
                  textAlign={{ base: 'center', md: 'left', lg: 'left' }}
                  maxW={{ base: '80%', md: '25%', lg: '25%' }}
                >
                  <Zoom>
                    <Box color='primary.300' mb={3}>
                      {<item.icon size='50pt' />}
                    </Box>
                    <Text as='b' color='primary.300' fontSize='2xl' my='2'>
                      {item.title}
                    </Text>
                    <Text color='grey.500'>{item.desc}</Text>
                  </Zoom>
                </Flex>
              );
            })}
          </Flex>

          <Flex
            flexDir='column'
            w='100%'
            bgGradient='linear(90deg, primary.300, primary.900);'
            color='white.300'
            py='100'
            textAlign='center'
            minH='200pt'
            alignItems='center'
            justifyContent='center'
          >
            <Flex
              flexDir='column'
              w='70%'
              mx='auto'
              alignItems='center'
              justifyContent='center'
              gap={5}
            >
              <Text fontSize='5xl' as='b'>
                {t('ready-to-start')}
              </Text>
              <Text color='secondary.100' fontSize={26}>
                {t('track-expenses-smart')}
              </Text>
              {GettingStartedButton}
            </Flex>
          </Flex>
        </Box>

        {/* Footer  */}
        <Flex h='50pt' bgColor='white.300' w='100%'>
          <Flex
            h='100%'
            alignItems='center'
            w={{ base: '95%', md: '70%', lg: '70%' }}
            mx='auto'
            justifyContent='space-between'
            flexDir={{ base: 'column', md: 'row', lg: 'row' }}
          >
            <Flex h='100%' alignItems='center'>
              <Flex gap='1' ml='2'>
                <Text>Copyright © 2023</Text>
                <Text>{t('app-name')}</Text>
              </Flex>
            </Flex>
            <Menu>
              <MenuButton
                as={Button}
                rightIcon={<LanguageIcon size='14pt' />}
                variant='ghost'
              >
                {getLang()}
              </MenuButton>
              <MenuList>
                <MenuItem onClick={() => changeLang('en')}>English</MenuItem>
                <MenuItem onClick={() => changeLang('ro')}>Romana</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Landing;
