import { ASSIST_TYPES } from "../types";
const {
  GO_TO_Q2,
  JUMP_TO_Q6,
  GO_TO_Q3,
  GO_TO_Q4,
  GO_TO_Q5,
  GO_TO_Q6,
  GO_TO_Q7,
  GO_TO_Q8,
  GO_TO_FEEDBACK_REPORT,
  GO_TO_PREVIOUS,
  SET_ISLOADING_TRUE,
  SET_ISLOADING_FALSE,
} = ASSIST_TYPES;

export const go_to_previous = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_PREVIOUS,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    1000
  );
};

export const jump_to_Q6 = () => dispatch => {
  // different from go_to_Q6.
  // go_to_Q6 is called directly from Q5
  // While jump_to_Q6 is triggered directly from Q2. The router the skips Q3, Q4, and Q5
  // So the dispatch JUMP_TO_Q6 tells the reduser to do the following
  // 1 ===>  push Q6 to the router history and then
  // 2 ===>  if Q3, Q4, and Q5 are already in the rooter, remove them from the router
  // 3 ===>  if Q3, Q4, and Q5 already have value in their respective arrays, remove them from the arrays, so Q3, Q4, and Q5 will have empty arrays

  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: JUMP_TO_Q6,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q2 = thisData => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  const { all, selected, J } = thisData;

  const data = [];

  all.filter(item => {
    selected.map(x => {
      if (x === item.id) data.push(item);

      return false;
    });
    return false;
  });

  if (J) {
    data.push({
      id: "J",
      name: J,
    });
  }

  dispatch({
    type: GO_TO_Q2,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q3 = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_Q3,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q4 = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_Q4,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q5 = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_Q5,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q6 = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_Q6,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q7 = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_Q7,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Q8 = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_Q8,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};

export const go_to_Feedback_Report = data => dispatch => {
  dispatch({
    type: SET_ISLOADING_TRUE,
  });

  dispatch({
    type: GO_TO_FEEDBACK_REPORT,
    payload: data,
  });

  setTimeout(
    () =>
      dispatch({
        type: SET_ISLOADING_FALSE,
      }),
    2000
  );
};
