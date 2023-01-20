import React from 'react';
import './App.css';
import './i18n/config.js';
import { Route, Routes } from 'react-router-dom';
import ROUTES from './utils/routes.js';

import { Landing, Login, SignUp } from './components/pages';

function App() {
    return (
        <div className='App'>
            <Routes>
                <Route path={ROUTES.LANDING} element={<Landing />} />
                <Route path={ROUTES.SIGN_UP} element={<SignUp />} />
                <Route path={ROUTES.LOGIN} element={<Login />} />
            </Routes>
        </div>
    );
}

export default App;
