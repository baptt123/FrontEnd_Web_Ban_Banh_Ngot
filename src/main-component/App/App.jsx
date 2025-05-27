// import React, {useState} from "react";
// import {BrowserRouter} from "react-router-dom"; // ✅ Thêm dòng này
// import {CssBaseline, ThemeProvider} from "@mui/material";
// import {ColorModeContext, useMode} from "/src/theme.jsx";
// import {ToastContainer} from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import AllRoute from "/src/main-component/Router/index.jsx";
// import {Provider} from "/src/components/ui/provider.jsx"
//
// const App = () => {
//     const [theme, colorMode] = useMode();
//     const [isSidebar, setIsSidebar] = useState(true);
//
//     return (
//         <ColorModeContext.Provider value={colorMode}>
//             <ThemeProvider theme={theme}>
//                 <CssBaseline/>
//                 <Provider>
//                     <BrowserRouter>
//                         <div className="app" id="scrool">
//                             <AllRoute/>
//                             <ToastContainer/>
//                         </div>
//                     </BrowserRouter>
//                 </Provider>
//             </ThemeProvider>
//         </ColorModeContext.Provider>
//     );
// };
//
// export default App;
//



import React, { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "/src/theme.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AllRoute from "/src/main-component/Router/index.jsx";
import { Provider } from "/src/components/ui/provider.jsx";
import SimpleBar from 'simplebar-react';
import 'simplebar-react/dist/simplebar.min.css';
import { ChakraProvider } from '@chakra-ui/react';
import { theme as chakraTheme } from '/src/components/helpers/index.jsx';

const App = () => {
    const [theme, colorMode] = useMode();
    const [isSidebar, setIsSidebar] = useState(true);

    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <Provider>
                    <ChakraProvider theme={chakraTheme}>
                        <SimpleBar style={{ maxHeight: '100vh' }}>
                            <BrowserRouter>
                                <div className="app" id="scroll">
                                    <AllRoute />
                                    <ToastContainer />
                                </div>
                            </BrowserRouter>
                        </SimpleBar>
                    </ChakraProvider>
                </Provider>
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
};

export default App;
