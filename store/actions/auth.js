import { AUTH_TYPES } from "../types";
const { AUTHORIZE_USER, LOG_OUT } = AUTH_TYPES;

export const authorizeUser = data => dispatch => {
  dispatch({
    type: AUTHORIZE_USER,
    payload: data,
  });
};

export const logout = () => dispatch => {
  dispatch({
    type: LOG_OUT,
  });
};
