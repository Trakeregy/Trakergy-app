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

function SignUp() {
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
                    <Heading fontSize={'xl'}>{t('welcome-to-app')}</Heading>
                    <Text fontSize={'md'} color={'black.600'}>
                        {t('create-account')}
                    </Text>
                </Stack>
                <Box>
                    <Stack gap='1'>
                        <Flex dir='row' gap='5'>
                            <CustomInput
                                id='firstName'
                                isRequired
                                placeholder={t('first-name') + ' *'}
                            />
                            <CustomInput
                                id='lastName'
                                placeholder={t('last-name')}
                            />
                        </Flex>
                        <CustomInput
                            id='username'
                            isRequired
                            placeholder={t('email') + ' *'}
                        />
                        <CustomInput
                            id='password'
                            isRequired
                            placeholder={t('password') + ' *'}
                        />
                        <CustomInput
                            id='confirmPassword'
                            isRequired
                            placeholder={t('confirm-password') + ' *'}
                        />
                        <CustomButton text={t('sign-up')} />
                        <Stack>
                            <Text
                                fontSize={'md'}
                                m='0'
                                color={'gray.600'}
                                textAlign='center'
                            >
                                {t('already-have-account')}{' '}
                                <Link
                                    color={'primary.300'}
                                    href={ROUTES.LOGIN}
                                    fontWeight='bold'
                                >
                                    {t('log-in')}
                                </Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Flex>
        </Flex>
    );
}

export default SignUp;
