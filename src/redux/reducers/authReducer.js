import {
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILURE,
  LOGIN_INACTIVE_ACCOUNT,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAILURE,
  VERIFY_ACCOUNT_REQUEST,
  VERIFY_ACCOUNT_SUCCESS,
  VERIFY_ACCOUNT_FAILURE
} from '../actions/authActions';

// Khởi tạo trạng thái ban đầu
const initialUser = localStorage.getItem('auth_user') 
  ? JSON.parse(localStorage.getItem('auth_user')) 
  : null;

const initialState = {
  loading: false,
  isAuthenticated: !!initialUser && !initialUser.needActivation,
  user: initialUser,
  needActivation: initialUser?.needActivation || false,
  error: null,
  verifyStatus: null
};


const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
    case LOGIN_REQUEST:
    case LOGOUT_REQUEST:
    case FORGOT_PASSWORD_REQUEST:
    case RESET_PASSWORD_REQUEST:
    case VERIFY_ACCOUNT_REQUEST:
      return {
        ...state,
        loading: true,
        error: null
      };
    
    case REGISTER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    case LOGIN_INACTIVE_ACCOUNT:
        return {
          ...state,
          loading: false,
          isAuthenticated: false,
          user: action.payload.user,
          needActivation: true,
          error: action.payload.message
        };
    
        case LOGIN_SUCCESS:
          return {
            ...state,
            loading: false,
            isAuthenticated: true,
            user: action.payload.user,
            needActivation: false,
            error: null
          };
      
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: null
      };
      
    case FORGOT_PASSWORD_SUCCESS:
    case RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };
    
    case VERIFY_ACCOUNT_SUCCESS:
      return {
        ...state,
        loading: false,
        verifyStatus: 'success',
        error: null
      };

    case REGISTER_FAILURE:
    case LOGIN_FAILURE:
    case FORGOT_PASSWORD_FAILURE:
    case RESET_PASSWORD_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    
    case LOGOUT_FAILURE:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload
      };
    
    case VERIFY_ACCOUNT_FAILURE:
      return {
        ...state,
        loading: false,
        verifyStatus: 'failure',
        error: action.payload
      };

    default:
      return state;
  }
};

export default authReducer;