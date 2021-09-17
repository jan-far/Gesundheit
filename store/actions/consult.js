import { CONSULT_TYPES } from "../types";
const { GET_FORMS, GET_A_FORM, SUBMIT_FORM } = CONSULT_TYPES;

export const ConsultForms = (data) => (dispatch) => {
  dispatch({
    type: GET_FORMS,
    payload: data,
  });
};

export const AConsultForm = (data) => (dispatch) => {
  dispatch({
    type: GET_A_FORM,
    payload: data,
  });
};
