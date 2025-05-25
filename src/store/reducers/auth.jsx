import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGOUT,
  FORGOT_REQUEST,
  FORGOT_SUCCESS,
  FORGOT_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
  VERIFY_FAILURE,
  RESET_REQUEST,
  RESET_SUCCESS,
  RESET_FAILURE,
  GOOGLE_REQUEST,
  GOOGLE_SUCCESS,
  GOOGLE_FAILURE,
} from "../actions/type";

const initialState = {
  user: null,
  loading: false,
  error: null,
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case VERIFY_REQUEST:
    case LOGIN_REQUEST:
    case GOOGLE_REQUEST:
    case FORGOT_REQUEST:
    case RESET_REQUEST:
      return { ...state, loading: true, error: null };

    case LOGIN_SUCCESS:
    case GOOGLE_SUCCESS:
      return { ...state, loading: false, user: action.payload };

    case REGISTER_SUCCESS:
    case VERIFY_SUCCESS:
    case FORGOT_SUCCESS:
    case RESET_SUCCESS:
      return { ...state, loading: false };

    case REGISTER_FAILURE:
    case VERIFY_FAILURE:
    case LOGIN_FAILURE:
    case GOOGLE_FAILURE:
    case FORGOT_FAILURE:
    case RESET_FAILURE:
      return { ...state, loading: false, error: action.error };

    case LOGOUT:
      return { ...initialState };

    default:
      return state;
  }
};

export default auth;
