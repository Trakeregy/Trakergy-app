import { Link } from '@chakra-ui/react';
import React from 'react';
import ROUTES from '../../utils/routes';
import { CustomButton } from '../atoms/CustomBasicComponents';

function Landing() {
    return (
        <div>
            Welcome!
            <Link href={ROUTES.LOGIN} fontWeight='bold'>
                <CustomButton text={'Log in'} />
            </Link>
            <Link href={ROUTES.SIGN_UP} fontWeight='bold'>
                <CustomButton text={'Sign up'} />
            </Link>
        </div>
    );
}

export default Landing;
