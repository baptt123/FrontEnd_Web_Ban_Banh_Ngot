import {useState} from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import {GoogleLogin} from "@react-oauth/google";
import {BrowserRouter as Router, Link, Routes, Route} from "react-router-dom";
import PaypalCheckout from "src/pages/PaypalCheckout.jsx";
import AppRoutes from "src/router/RouterPages.jsx";

function App() {
    const [count, setCount] = useState(0);

    return (
        <AppRoutes>
            <div>
                {/* Logo + Count + Google Login */}
                <div>
                    <a href="https://vite.dev" target="_blank" rel="noopener noreferrer">
                        <img src={viteLogo} className="logo" alt="Vite logo"/>
                    </a>
                    <a href="https://react.dev" target="_blank" rel="noopener noreferrer">
                        <img src={reactLogo} className="logo react" alt="React logo"/>
                    </a>
                </div>
                <h1>Vite + React</h1>
                <div className="card">
                    <button onClick={() => setCount((count) => count + 1)}>
                        count is {count}
                    </button>
                </div>
                <p className="read-the-docs">
                    Click on the Vite and React logos to learn more
                </p>

                <div style={{marginTop: '20px'}}>
                    <h2>Đăng nhập với Google</h2>
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                        useOneTap
                    />
                </div>
                <div className="checkout">
                    <PaypalCheckout>

                    </PaypalCheckout>
                </div>

            </div>
        </AppRoutes>
    );
}


export default App;