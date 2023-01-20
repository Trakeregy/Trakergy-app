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
import { connect } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ROUTES from '../../utils/routes';
import cover from '../../assets/cover.png';
import { CustomInput, CustomButton } from '../atoms/CustomBasicComponents';
import { signUp as signUpAction } from '../../state/actions/auth.js';
import { logIn as logInAction } from '../../state/actions/auth.js';
import { useNavigate } from 'react-router-dom';

function SignUp({ signUp, logIn }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        checkedPassword: '',
        username: '',
    });

    const canSubmit =
        newUser.password === newUser.checkedPassword &&
        newUser.password !== '' &&
        newUser.checkedPassword !== '';

    const submitHandler = async (e) => {
        e.preventDefault();
        const { checkedPassword, ..._user } = newUser;
        await signUp(_user);
        await logIn({ username: _user.username, password: _user.password });
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
                                value={newUser.first_name}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        first_name: e.target.value,
                                    })
                                }
                            />
                            <CustomInput
                                id='lastName'
                                placeholder={t('last-name')}
                                value={newUser.last_name}
                                onChange={(e) =>
                                    setNewUser({
                                        ...newUser,
                                        last_name: e.target.value,
                                    })
                                }
                            />
                        </Flex>
                        <CustomInput
                            id='email'
                            isRequired
                            placeholder={t('email') + ' *'}
                            value={newUser.email}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    email: e.target.value,
                                })
                            }
                        />
                        <CustomInput
                            id='username'
                            isRequired
                            placeholder={t('username') + ' *'}
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
                            placeholder={t('password') + ' *'}
                            value={newUser.password}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    password: e.target.value,
                                })
                            }
                            type='password'
                        />
                        <CustomInput
                            id='confirmPassword'
                            isRequired
                            placeholder={t('confirm-password') + ' *'}
                            value={newUser.checkedPassword}
                            onChange={(e) =>
                                setNewUser({
                                    ...newUser,
                                    checkedPassword: e.target.value,
                                })
                            }
                            type='password'
                        />
                        <CustomButton
                            text={t('sign-up')}
                            onClick={submitHandler}
                            isDisabled={!canSubmit}
                        />
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

const mapStateToProps = (state) => {
    return {
        authenticated: state.auth.authenticated,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        signUp: (user) => dispatch(signUpAction(user)),
        logIn: (user) => dispatch(logInAction(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
