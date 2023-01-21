import React from 'react';
import { connect } from 'react-redux';
import { CustomButton } from '../atoms/CustomBasicComponents';
import { logOut as logOutAction } from '../../state/actions/auth';

function Home({ logOut }) {
    return (
        <div>
            Home
            <CustomButton text='Log out' onClick={logOut} />
        </div>
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
