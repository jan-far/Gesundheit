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
  GO_TO_PREVIOUS,
  SET_ISLOADING_TRUE,
  SET_ISLOADING_FALSE,
  GO_TO_FEEDBACK_REPORT,
} = ASSIST_TYPES;

const initialState = {
  Q_isLoading: false,
  bio: {
    country: "",
  },
  substances: [
    {
      id: "A",
      name: "Tobacco products (cigarettes, chewing tobacco, cigars, etc.) ",
    },
    { id: "B", name: "Alcoholic beverages (beer, wine, spirits, etc.) " },
    { id: "C", name: "Cannabis (marijuana, pot, grass, hash, etc.)" },
    { id: "D", name: "Cocaine (coke, crack, etc.)" },
    {
      id: "E",
      name: "Amphetamine type stimulants (speed, diet pills, ecstasy, etc.)",
    },
    {
      id: "F",
      name: "Inhalants (nitrous, glue, petrol, paint thinner, etc.",
    },
    {
      id: "G",
      name: "Sedatives or Sleeping Pills (Valium, Serepax, Rohypnol, etc.)",
    },
    {
      id: "H",
      name: "Hallucinogens (LSD, acid, mushrooms, PCP, Special K, etc.)",
    },
    { id: "I", name: "Opioids (heroin, morphine, methadone, codeine, etc.)" },
  ],

  questionHistory: ["Q_1", "Home"],
  answers: {
    selectedSubstances_Q_1: [],
    selectedSubstances_Q_2: [],
    selectedSubstances_Q_3: [],
    selectedSubstances_Q_4: [],
    selectedSubstances_Q_5: [],
    selectedSubstances_Q_6: [],
    selectedSubstances_Q_7: [],
    selectedSubstances_Q_8: {
      usedDrugByInjection: "",
      patternOfInjecting: "",
    },
  },
};

const AssistReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_ISLOADING_TRUE:
      return {
        ...state,
        Q_isLoading: true,
      };

    case SET_ISLOADING_FALSE:
      return {
        ...state,
        Q_isLoading: false,
      };

    case GO_TO_PREVIOUS:
      const questionHistory = [...state.questionHistory];
      questionHistory.shift();
      return {
        ...state,

        questionHistory,
      };

    case GO_TO_Q2: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_2");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_1: payload,
        },
        questionHistory,
      };
    }

    case JUMP_TO_Q6: {
      const questionHistory = ["Q_6", "Q_2", "Q_1", "Home"];

      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_3: [],
          selectedSubstances_Q_4: [],
          selectedSubstances_Q_5: [],
        },
        questionHistory,
      };
    }

    case GO_TO_Q3: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_3");
      return {
        ...state,

        questionHistory,
        answers: {
          ...state.answers,
          selectedSubstances_Q_2: payload,
        },
      };
    }

    case GO_TO_Q4: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_4");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_3: payload,
        },
        questionHistory,
      };
    }

    case GO_TO_Q5: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_5");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_4: payload,
        },
        questionHistory,
      };
    }

    case GO_TO_Q6: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_6");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_5: payload,
        },
        questionHistory,
      };
    }

    case GO_TO_Q7: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_7");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_6: payload,
        },
        questionHistory,
      };
    }

    case GO_TO_Q8: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Q_8");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_7: payload,
        },
        questionHistory,
      };
    }

    case GO_TO_FEEDBACK_REPORT: {
      const questionHistory = [...state.questionHistory];
      questionHistory.unshift("Feedback_Report");
      return {
        ...state,

        answers: {
          ...state.answers,
          selectedSubstances_Q_8: payload,
        },
        questionHistory,
      };
    }

    default:
      return state;
  }
};

export default AssistReducer;
