import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './main-component/App/App';
import reportWebVitals from './reportWebVitals';
import './css/font-awesome.min.css';
import './css/themify-icons.css';
import './css/flaticon.css';
import './sass/style.scss';

import {PersistGate} from "redux-persist/integration/react";
import {store, persistor} from "./store";
import {Provider} from "react-redux";
import {GoogleOAuthProvider} from "@react-oauth/google";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <GoogleOAuthProvider clientId="612651483215-e44j1cm38pd5focclktvonseo5lnlmec.apps.googleusercontent.com">
                <App/>
            </GoogleOAuthProvider>
        </PersistGate>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
