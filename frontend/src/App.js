import React from 'react';
import './App.css';
import './i18n/config.js';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/routes.js';

import { Home, Landing, LogIn, SignUp } from './components/pages';
import { PrivateRoute, UnauthRoute } from './components/atoms/RoutePermissions';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route
                    path={ROUTES.LANDING}
                    element={
                        <UnauthRoute>
                            <Landing />
                        </UnauthRoute>
                    }
                />
                <Route
                    path={ROUTES.HOME}
                    element={
                        <PrivateRoute>
                            <Home />
                        </PrivateRoute>
                    }
                />
                <Route
                    path={ROUTES.SIGN_UP}
                    element={
                        <UnauthRoute>
                            <SignUp />
                        </UnauthRoute>
                    }
                />
                <Route
                    path={ROUTES.LOGIN}
                    element={
                        <UnauthRoute>
                            <LogIn />
                        </UnauthRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
