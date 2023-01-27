import React from 'react';
import './App.scss';
import './i18n/config.js';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/routes.js';

import {
  Calendar,
  Debts,
  Home,
  Landing,
  LogIn,
  Settings,
  SignUp,
  Statistics,
} from './components/pages';
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
        <Route
          path={ROUTES.HOME}
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.STATISTICS}
          element={
            <PrivateRoute>
              <Statistics />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.CALENDAR}
          element={
            <PrivateRoute>
              <Calendar />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.DEBTS}
          element={
            <PrivateRoute>
              <Debts />
            </PrivateRoute>
          }
        />
        <Route
          path={ROUTES.SETTINGS}
          element={
            <PrivateRoute>
              <Settings />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
