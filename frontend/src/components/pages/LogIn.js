import React, { useState } from 'react';
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
import { connect } from 'react-redux';
import ROUTES from '../../utils/routes';
import cover from '../../assets/cover.png';
import { CustomInput, CustomButton } from '../atoms/CustomBasicComponents';
import { logIn as logInAction } from '../../state/actions/auth';
import { useNavigate } from 'react-router-dom';

function LogIn({ logIn }) {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        await logIn(newUser);
        setTimeout(navigate(ROUTES.HOME), 0);
    };

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
                            id='username'
                            isRequired
                            placeholder={t('username')}
                            value={newUser.username}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    username: e.target.value,
                                })
                            }
                        />
                        <CustomInput
                            id='password'
                            isRequired
                            placeholder={t('password')}
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                })
                            }
                            type='password'
                        />
                        <CustomButton
                            text={t('log-in')}
                            onClick={submitHandler}
                        />
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

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        logIn: (user) => dispatch(logInAction(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
