import React from "react";
import {Routes, Route, BrowserRouter} from "react-router-dom";

import PaypalButton from "src/pages/PaypalCheckout.jsx";

const AppRoutes = () => {
    return (
        <BrowserRouter>
                <Routes>
                    <Route path="/" element={<PaypalButton />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
