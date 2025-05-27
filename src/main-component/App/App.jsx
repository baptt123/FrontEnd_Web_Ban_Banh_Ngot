// import React from 'react';
// import AllRoute from '../router';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
//
// const App = () => {
//   return (
//       <div className="App" id="scrool">
//         <AllRoute />
//         <ToastContainer />
//       </div>
//   );
// };
//
// export default App;



import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom"; // ✅ Thêm dòng này
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "/src/theme.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoute from "/src/main-component/Router/index.jsx"; // Đảm bảo đường dẫn đúng

const App = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <BrowserRouter> {/* ✅ Bọc toàn bộ ứng dụng trong BrowserRouter */}
                    <div className="app" id="scrool">
                            <AllRoute />
                        <ToastContainer />
                    </div>
                </BrowserRouter>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;

