import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // mặc định sử dụng localStorage
import rootReducer from "./reducers/rootReducer";

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['authData'] // chỉ lưu trữ authData reducer
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = createStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export const persistor = persistStore(store);