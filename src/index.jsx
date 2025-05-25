import React from "react";
import ReactDOM from "react-dom/client";
import App from "./main-component/App/App.jsx";
import reportWebVitals from "./reportWebVitals";
import { GoogleOAuthProvider } from '@react-oauth/google';
import { ParallaxProvider } from "react-scroll-parallax";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/font-awesome.min.css";
import "./css/themify-icons.css";
import "./css/animate.css";
import "./css/flaticon.css";
import "./sass/style.scss";

import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "./store/index";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <ParallaxProvider>
        <GoogleOAuthProvider clientId="612651483215-e44j1cm38pd5focclktvonseo5lnlmec.apps.googleusercontent.com">
          <App />
        </GoogleOAuthProvider>
      </ParallaxProvider>
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
