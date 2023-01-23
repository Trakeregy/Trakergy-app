import React from 'react';
import { connect } from 'react-redux';
import { CustomButton } from '../atoms/CustomBasicComponents';
import { logOut as logOutAction } from '../../state/actions/auth';
import { AuthPage } from '.';

function Home({ logOut }) {
    return (
        <AuthPage>
            Home
            <CustomButton text='Log out' onClick={logOut} />
        </AuthPage>
    );
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        logOut: () => dispatch(logOutAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
