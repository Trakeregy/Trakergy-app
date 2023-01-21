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
import {
    emailValidator,
    firstNameAndUsernameValidator,
    passwordValidator,
} from '../../utils/validators';
import LoadingIndicator from '../atoms/LoadingIndicator';

function SignUp({ signUp, logIn }) {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [canSubmit, setCanSubmit] = useState(false);
    const [errors, setErrors] = useState({});
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
        checked_password: '',
        username: '',
    });

    const checkNoErrors = (newErrors) => {
        const isOk =
            newErrors.first_name === '' &&
            newErrors.email === '' &&
            newErrors.username === '' &&
            newErrors.password === '' &&
            newErrors.confirm_password === '';
        setCanSubmit(isOk);
    };

    const showErrorLabels = (valid) => {
        const newErrors = {
            ...errors,
            ...valid.errors,
        };
        setErrors(newErrors);
        checkNoErrors(newErrors);
    };

    const verifyField = (e, fieldName) => {
        const newVal = e.target.value;
        setNewUser({
            ...newUser,
            [fieldName]: newVal,
        });
        let valid = {};
        switch (fieldName) {
            case 'first_name':
            case 'username':
                valid = firstNameAndUsernameValidator({
                    field: fieldName,
                    newVal,
                    t,
                });
                break;
            case 'email':
                valid = emailValidator({
                    newVal,
                    t,
                });
                break;
            case 'password':
            case 'checked_password':
                valid = passwordValidator({ newVal, t });
                showErrorLabels(valid);
                valid = {
                    canSubmit: true,
                    errors: { confirm_password: '', password: '' },
                };
                if (
                    (fieldName === 'checked_password' &&
                        newVal !== newUser.password) ||
                    (fieldName === 'password' &&
                        newVal !== newUser.checked_password)
                ) {
                    valid = {
                        canSubmit: false,
                        errors: {
                            confirm_password: t('error-passwords-dont-match'),
                        },
                    };
                }
                break;
            default:
                break;
        }

        showErrorLabels(valid);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        setLoading(true);
        const { checked_password, ..._user } = newUser;
        signUp(_user)
            .then(() => {
                logIn({ username: _user.username, password: _user.password })
                    .then(() => {
                        setLoading(false);
                        setTimeout(navigate(ROUTES.HOME), 0);
                    })
                    .catch((e) => {
                        setLoading(false);
                        setError(e?.response?.data?.detail);
                    });
            })
            .catch((e) => setLoading(false));
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
                        {error && (
                            <Text color='primary.300' fontSize='sm' px='6'>
                                {error}
                            </Text>
                        )}
                        <Flex dir='row' gap='5'>
                            <CustomInput
                                id='firstName'
                                isRequired
                                placeholder={t('first-name')}
                                value={newUser.first_name}
                                onChange={(e) => {
                                    verifyField(e, 'first_name');
                                }}
                                errorLabelText={errors.first_name}
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
                            placeholder={t('email')}
                            value={newUser.email}
                            onChange={(e) => verifyField(e, 'email')}
                            errorLabelText={errors.email}
                        />
                        <CustomInput
                            id='username'
                            isRequired
                            placeholder={t('username')}
                            value={newUser.username}
                            onChange={(e) => verifyField(e, 'username')}
                            errorLabelText={errors.username}
                        />
                        <CustomInput
                            id='password'
                            isRequired
                            placeholder={t('password')}
                            value={newUser.password}
                            onChange={(e) => verifyField(e, 'password')}
                            type='password'
                            errorLabelText={errors.password}
                        />
                        <CustomInput
                            id='confirmPassword'
                            isRequired
                            placeholder={t('confirm-password')}
                            value={newUser.checked_password}
                            onChange={(e) => verifyField(e, 'checked_password')}
                            type='password'
                            errorLabelText={errors.confirm_password}
                        />
                        <CustomButton
                            text={t('sign-up')}
                            onClick={submitHandler}
                            isDisabled={!canSubmit || loading}
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
        signUp: (user) => dispatch(signUpAction(user)),
        logIn: (user) => dispatch(logInAction(user)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
