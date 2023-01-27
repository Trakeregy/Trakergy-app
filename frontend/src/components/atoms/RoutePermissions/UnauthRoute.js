import React from 'react';
import { connect } from 'react-redux';
import { Navigate } from 'react-router-dom';
import ROUTES from '../../../utils/routes';

function UnauthRoute({ authenticated, children }) {
  return !authenticated ? children : <Navigate to={ROUTES.HOME} />;
}

const mapStateToProps = (state) => {
  return {
    authenticated: state.auth.authenticated,
  };
};

export default connect(mapStateToProps)(UnauthRoute);
