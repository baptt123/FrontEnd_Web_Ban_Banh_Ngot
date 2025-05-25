import { combineReducers } from "redux";
import productReducer from "./products";
import { cartReducer } from "./cart";
import { wishListReducer } from "./wishList";
import compareListReducer from "./compare";
import authReducer from "./auth";

const rootReducer = combineReducers({
  data: productReducer,
  cartList: cartReducer,
  wishList: wishListReducer,
  compareList: compareListReducer,
  auth: authReducer,
});

export default rootReducer;
