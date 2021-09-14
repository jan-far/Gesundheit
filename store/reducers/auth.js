import { AUTH_TYPES } from "../types";

const { AUTHORIZE_USER, LOG_OUT } = AUTH_TYPES;

const DEFAULT_STATE = {
  isAuthenticated: false,
  user: {},
};

const authReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case AUTHORIZE_USER: {
      localStorage.setItem("USER_CREDENTIALS", JSON.stringify(payload));

      return {
        ...state,
        isAuthenticated: true,
        user: { ...payload },
      };
    }

    case LOG_OUT: {
      localStorage.removeItem("USER_CREDENTIALS");

      return {
        ...state,
        isAuthenticated: false,
        user: {},
      };
    }

    default:
      return state;
  }
};

export default authReducer;
