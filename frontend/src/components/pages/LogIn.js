import React from 'react';
import {
    Flex,
    Box,
    Image,
    Stack,
    Heading,
    Text,
    useColorModeValue,
    Link,
} from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../utils/routes';
import cover from '../../assets/cover.png';
import { CustomInput, CustomButton } from '../atoms/CustomBasicComponents';

function LogIn() {
    const { t } = useTranslation();
    return (
        <Flex
            h={'100vh'}
            direction='row'
            justifyContent='flex-end'
            bg={useColorModeValue('gray.50', 'gray.800')}
        >
            <Box overflow='hidden'>
                <Image
                    objectFit='cover'
                    h='100%'
                    w='100%'
                    src={cover}
                    alt='cover'
                />
            </Box>
            <Flex
                w='50vw'
                px='28'
                justifyContent='center'
                direction='column'
                gap='12'
                bg={useColorModeValue('white', 'gray.700')}
            >
                <Stack>
                    <Heading fontSize={'xl'}>{t('welcome-back')}</Heading>
                    <Text fontSize={'md'} color={'black.600'}>
                        {t('enter-account')}
                    </Text>
                </Stack>
                <Box>
                    <Stack gap='1'>
                        <CustomInput
                            id='email'
                            isRequired
                            placeholder={t('email')}
                        />
                        <CustomInput
                            id='password'
                            isRequired
                            placeholder={t('password')}
                        />
                        <CustomButton text={t('log-in')} />
                        <Stack>
                            <Text
                                fontSize={'md'}
                                m='0'
                                color={'gray.600'}
                                textAlign='center'
                            >
                                {t('dont-have-account')}{' '}
                                <Link
                                    color={'primary.300'}
                                    href={ROUTES.SIGN_UP}
                                    fontWeight='bold'
                                >
                                    {t('sign-up')}
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
}

export default LogIn;
