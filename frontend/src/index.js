import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
// UI
import { ChakraProvider } from '@chakra-ui/react';
import theme from './theme';
import './index.css';
// redux
import { Provider } from 'react-redux';
import { store, persistor } from './state/index.js';
import { PersistGate } from 'redux-persist/integration/react';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </ChakraProvider>
);

reportWebVitals();
