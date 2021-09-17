import { CONSULT_TYPES } from "../types";
const { GET_FORMS, GET_A_FORM, SUBMIT_FORM } = CONSULT_TYPES;

const DEFAULT_STATE = {
  loadingForm: true,
  consultForms: [],
  aConsultForm: {},
};

const consultReducer = (state = DEFAULT_STATE, { type, payload }) => {
  switch (type) {
    case GET_FORMS: {
      return {
        ...state,
        consultForms: payload,
        laodingForm: false,
      };
    }

    case GET_A_FORM: {
      return {
        ...state,
        aConsultForm: payload,
        laodingForm: false,
      };
    }

    default:
      return state;
  }
};

export default consultReducer;
