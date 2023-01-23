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
import { LoadingIndicator } from '../atoms';

function LogIn({ logIn }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [error, setError] = useState();
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const [newUser, setNewUser] = useState({
        username: '',
        password: '',
    });

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        setError();
        logIn(newUser)
            .then(() => {
                setLoading(false);
                setTimeout(navigate(ROUTES.HOME), 0);
            })
            .catch((e) => {
                setLoading(false);
                if (e.response.status === 400) {
                    const usernameErrors = e.response.data.username;
                    const passwordErrors = e.response.data.password;

                    let newErrors = {};
                    if (usernameErrors) {
                        newErrors.username = usernameErrors.join(', ');
                    } else {
                        newErrors.username = '';
                    }
                    if (passwordErrors) {
                        newErrors.password = passwordErrors.join(', ');
                    } else {
                        newErrors.password = '';
                    }
                    setErrors(newErrors);
                } else if (e.response.status === 401) {
                    setError(e.response.data.detail);
                }
            });
    };

    return (
        <Flex
            h={'100vh'}
            direction='row'
            justifyContent='flex-end'
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
                bg='white'
            >
                <Stack>
                    <Heading fontSize={'xl'}>{t('welcome-back')}</Heading>
                    <Text fontSize={'md'} color={'black.600'}>
                        {t('enter-account')}
                    </Text>
                </Stack>
                <Box>
                    <Stack gap='1'>
                        {error && (
                            <Text color='primary.300' fontSize='sm' px='6'>
                                {error}
                            </Text>
                        )}
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
                            errorLabelText={errors.username}
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
                            errorLabelText={errors.password}
                        />
                        <CustomButton
                            text={t('log-in')}
                            onClick={submitHandler}
                            isDisabled={loading}
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
                    <Flex h='100px' justifyContent='center' dir='row'>
                        {loading && <LoadingIndicator />}
                    </Flex>
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
