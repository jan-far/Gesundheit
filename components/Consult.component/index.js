import React, { useCallback } from "react";
import axios from "axios";
import Link from "next/link";
import AuthWrapper from "../HOC/AuthWrapper";
import Navbar from "../Profile.component/Profile.navbar";
import { connect } from "react-redux";
import { getConsultFormIds } from "./utils";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import Stepper from "./Stepper";

import PropTypes from "prop-types";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Dialog from "@material-ui/core/Dialog";
import PersonIcon from "@material-ui/icons/Person";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import { blue } from "@material-ui/core/colors";

import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";

const useStyles = makeStyles(theme => ({
  active: {
    backgroundColor: "#4054b2",
  },
  normal: {
    backgroundColor: "#fff",
    border: "3px solid #e0e0e0",
    color: "#9e9e9e",
  },
  btn: { borderRadius: 0, padding: "16px 20px", margin: "40px auto" },
}));

const PTSD_FORM_TWO = {
  id: "3l28561eeryaawm",
  name: "Primary Care PTSD Screen for DSM-5 (PC-PTSD-5)",
  description:
    "The Primary Care PTSD Screen for DSM-5 (PC-PTSD-5) is a screening tool designed to identify persons with probable PTSD. Available data suggest the PC-PTS-5 screen should be considered 'positive' if the respondent answers 'yes' to any 3 items in the questi",
  category: "general",
  specialty: "general",
  icon: null,
  created_by: null,
  questions: [
    {
      id: 1,
      hint: "null",
      text:
        "Had nightmares about the event(s) or thought about the event(s) when you did not want to?",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 0, value: "No", next_question: 2 },
        { id: 1, value: "Yes", next_question: 2 },
      ],
      next_question: 2,
    },
    {
      id: 2,
      hint: "null",
      text:
        "Tried hard not to think about the event(s) or went out of your way to avoid situations that reminded you of the event(s)?",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 0, value: "No", next_question: 3 },
        { id: 1, value: "Yes", next_question: 3 },
      ],
      next_question: 3,
    },
    {
      id: 3,
      hint: "null",
      text: "Been constantly on guard, watchful, or easily startled?",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 0, value: "No", next_question: 4 },
        { id: 1, value: "Yes", next_question: 4 },
      ],
      next_question: 4,
    },
    {
      id: 4,
      hint: "null",
      text:
        "Felt numb or detached from people, activities, or your surroundings?",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 0, value: "No", next_question: 5 },
        { id: 1, value: "Yes", next_question: 5 },
      ],
      next_question: 5,
    },
    {
      id: 5,
      hint: "null",
      text:
        "Felt guilty or unable to stop blaming yourself or others for the events(s) or any problems the event(s) may have caused?",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 0, value: "No" },
        { id: 1, value: "Yes" },
      ],
    },
  ],
  num_of_questions: 5,
  updated_by: null,
  treatment_plan: null,
  created_at: "2021-07-22T15:34:08.000Z",
  updated_at: "2021-08-17T06:54:56.000Z",
};

const DEPRESSION = {
  id: "f4jw2s037rbujbj",
  name: "Patient Health Questionnaire-9 (PHQ-9)",
  description:
    " The PHQ-9 is a multipurpose instrument for screening, diagnosing, monitoring and measuring the severity of depression.",
  category: "general",
  specialty: "general",
  icon: null,
  created_by: null,
  questions: [
    {
      id: 1,
      hint: "null",
      text: "Little interest or pleasure in doing things",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 2 },
        { id: 2, value: "Several days", next_question: 2 },
        { id: 3, value: "More than half the days", next_question: 2 },
        { id: 4, value: "Nearly every day", next_question: 2 },
      ],
      next_question: 2,
    },
    {
      id: 2,
      hint: "null",
      text: "Feeling down, depressed or hopeless",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 3 },
        { id: 2, value: "Several days", next_question: 3 },
        { id: 3, value: "More than half the days", next_question: 3 },
        { id: 4, value: "Nearly every day", next_question: 3 },
      ],
      next_question: 3,
    },
    {
      id: 3,
      hint: "null",
      text: "Trouble falling asleep, staying asleep, or sleeping too much",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 4 },
        { id: 2, value: "Several days", next_question: 4 },
        { id: 3, value: "More than half the days", next_question: 4 },
        { id: 4, value: "Nearly every day", next_question: 4 },
      ],
      next_question: 4,
    },
    {
      id: 4,
      hint: "null",
      text: "Feeling tired or having little energy",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 5 },
        { id: 2, value: "Several days", next_question: 5 },
        { id: 3, value: "More than half the days", next_question: 5 },
        { id: 4, value: "Nearly every day", next_question: 5 },
      ],
      next_question: 5,
    },
    {
      id: 5,
      hint: "null",
      text: "Poor appetite or overeating",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 6 },
        { id: 2, value: "Several days", next_question: 6 },
        { id: 3, value: "More than half the days", next_question: 6 },
        { id: 4, value: "Nearly every day", next_question: 6 },
      ],
      next_question: 6,
    },
    {
      id: 6,
      hint: "null",
      text:
        "Feeling bad about yourself - or that you’re a failure or have let yourself or your family down",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 7 },
        { id: 2, value: "Several days", next_question: 7 },
        { id: 3, value: "More than half the days", next_question: 7 },
        { id: 4, value: "Nearly every day", next_question: 7 },
      ],
      next_question: 7,
    },
    {
      id: 7,
      hint: "null",
      text:
        "Trouble concentrating on things, such as reading the newspaper or watching television",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 8 },
        { id: 2, value: "Several days", next_question: 8 },
        { id: 3, value: "More than half the days", next_question: 8 },
        { id: 4, value: "Nearly every day", next_question: 8 },
      ],
      next_question: 8,
    },

    {
      id: 8,
      hint: "null",
      text:
        "Moving or speaking so slowly that other people could have noticed. Or, the opposite - being so fidgety or restless that you have been moving around a lot more than usual",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all", next_question: 9 },
        { id: 2, value: "Several days", next_question: 9 },
        { id: 3, value: "More than half the days", next_question: 9 },
        { id: 4, value: "Nearly every day", next_question: 9 },
      ],
      next_question: 9,
    },
    {
      id: 9,
      hint: "null",
      text:
        "Thoughts that you would be better off dead or of hurting yourself in some way",
      type: "select_one",
      symptom: "null",
      required: true,
      response: [
        { id: 1, value: "Not at all" },
        { id: 2, value: "Several days" },
        { id: 3, value: "More than half the days" },
        { id: 4, value: "Nearly every day" },
      ],
    },
  ],
  num_of_questions: 9,
  updated_by: null,
  treatment_plan: null,
  created_at: "2021-06-30T08:27:09.000Z",
  updated_at: "2021-08-17T06:54:56.000Z",
};

const _axs = {
  1: "A",
  2: "B",
  3: "C",
  4: "D",
  5: "E",
  6: "F",
  7: "G",
  8: "H",
};

const SingleQuestion = ({ set, item, n, selectedAnswers, on_select }) => {
  const classes = useStyles();
  const selected = selectedAnswers[set].questions[item.id];

  const [open, setOpen] = React.useState(false);

  console.log({ selected });
  return (
    <>
      <div className="q_body">
        <div className="q_1">
          <small>Question {n}</small>
          <span> {item.text}</span>
        </div>

        {item.response &&
          item.response.map((x, y) => (
            <div
              className={selected !== x.id ? "q_2" : "q_2 q_2_x"}
              key={y + 1}
              onClick={() => {
                console.log({ selectedAnswers, on_select });
                on_select(x.id, item.id);
              }}
            >
              <Avatar
                className={
                  item.selectedAnswer === x.id ? classes.active : classes.normal
                }
              >
                {_axs[y + 1]}
              </Avatar>

              <span>{x.value}</span>
            </div>
          ))}
      </div>

      <style jsx>{`
        h6 {
          font-size: 15px;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.6em;
          text-transform: uppercase;
          font-weight: 900;
          letter-spacing: 1.4px;
          font-weight: 400;
          font-family: "Poppins";
        }

        .q_body {
          width: 98%;
          max-width: 900px;
          margin: 0 auto;
          background: #fff;
          margin-top: 60px;
          box-shadow: 0 0 12px 0 #f1f3f4;
          padding: 0;
        }

        .q_1 {
          width: 100%;
          display: flex;
          flex-direction: column;
          border-bottom: 0.1rem solid #e0e0e0;
          position: relative;
          padding: 30px;
        }

        .q_2 {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;
          border-bottom: 0.1rem solid #e0e0e0;
          position: relative;
          padding: 20px 30px;
          cursor: pointer;
        }

        .q_2_x {
          background: #61616110;
        }

        .q_2:hover {
          background: #61616110;
        }

        .q_2 span {
          color: #616161;
          margin-left: 20px;
        }

        .q_1 small {
          font-weight: 400;
          font-size: 1rem;
          color: rgba(0, 0, 0, 0.5);
          line-height: 2.4rem;
          margin-bottom: 0.8rem;
        }

        .q_1 span {
          font-weight: 400;
          font-size: 1.15rem;
          color: rgba(0, 0, 0, 1);
          line-height: 2.4rem;
          margin-bottom: 0.8rem;
        }
      `}</style>
    </>
  );
};

const Index = props => {
  const { consultForms, loadingForm } = props;
  const ids = getConsultFormIds(consultForms);
  console.log("qwdwd", consultForms);
  const [loading, setloading] = React.useState(true);
  const [loadingx, setloadingx] = React.useState(false);
  const [success, setsuccess] = React.useState(false);
  const [view, setView] = React.useState(1);

  const [selectedAnswers, setselectedAnswers] = React.useState({
    1: {
      questions: {},
    },
    2: {
      questions: {},
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const getFormResponses = {
    patient: "5ngaxg9x4ls2i8x",
    form: "3l28561eeryaawm",
    responses: [
      {
        question: 1,
        response: 1,
        value: "No",
      },
      {
        question: 2,
        response: 1,
        value: "Yes",
      },

      {
        question: 3,
        response: 1,
        value: "Yes",
      },

      {
        question: 4,
        response: 1,
        value: "Yes",
      },

      {
        question: 5,
        response: 1,
        value: "Yes",
      },
    ],
  };

  const sendReq = async () => {
    const createPatienData = {
      first_name: "Chikwe",
      last_name: "Ihekweazu",
      email: "josiaharkson@pneuma.care",
      phone: "22222222",
      dob: "12/12/1991",
      gender: "male",
      address: {
        street_line_one: "No, 20 Aso Villa",
        street_line_two: "Off Mambila Barracks",
        post_code: "900990",
        city: "Abuja",
        state: "FCT",
        country: "Nigeria",
      },
    };
    setloadingx(true);

    try {
      const res = await axios.post(
        "https://demo-api.pneumahealth.co/telehealth/forms/answer",
        getFormResponses,
        // "https://demo-api.pneumahealth.co/patients/",
        // createPatienData,
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_PNEUMACARE_TOKEN}`,
          },
        }
      );

      console.log(res.data);
      setloadingx(false);
      setsuccess(true);
    } catch (e) {
      console.log(e?.response?.data);
      setsuccess(true);
      setloadingx(false);
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, []);

  React.useEffect(() => {
    setloading(true);

    setTimeout(() => {
      setloading(false);
    }, 2000);
  }, [view]);

  return (
    <>
      <Navbar />

      <div className="rootx">
        <div className="ddd">
          <h1>
            Consult page -{" "}
            <span style={{ fontSize: "76%" }}>
              Associated with Depression and PTSD
            </span>
          </h1>
          <h2>
            <span style={{ fontSize: 20 }}>Powered by</span> :{" "}
            <a
              href="https://www.pneuma.care/"
              target="_blank"
              style={{ color: "blue" }}
            >
              Pneumacare Telehealth Forms
            </a>
          </h2>
          {/* <div>
        {loadingForm ? (
          <p>loading...</p>
        ) : (
          consultForms?.map((form) => {
            <div key={form.id}>
              <h5>{form.name}</h5>
              <sub>{form.description}</sub>
              <hr />
              <select>
                {form.questions.map((q) => {
                  <option>{q.text}</option>;
                })}
              </select>
            </div>;
          })
        )}
      </div> */}

          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Confirmation </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                {success && "Submission was successful!"}
                {!success && "Confirm Submision?"}
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              {!success && (
                <>
                  {" "}
                  <Button
                    onClick={handleClose}
                    color="primary"
                    disabled={loadingx}
                  >
                    Disagree
                  </Button>
                  <Button
                    onClick={sendReq}
                    color="primary"
                    disabled={loadingx}
                    autoFocus
                    color="primary"
                    variant="contained"
                  >
                    {loadingx && <CircularProgress />}

                    {!loadingx && "Agree"}
                  </Button>{" "}
                </>
              )}
              {success && (
                <Link href="/profile">
                  <Button
                    color="primary"
                    disabled={loadingx}
                    autoFocus
                    color="primary"
                    variant="contained"
                  >
                    Continue
                  </Button>
                </Link>
              )}
            </DialogActions>
          </Dialog>

          <Stepper
            steps={[{ id: 1 }, { id: 2 }]}
            activeStep={view}
            setview={setView}
          />
          {loading ? (
            <div
              style={{
                width: "100%",
                display: "flex",
                height: 200,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CircularProgress />
            </div>
          ) : (
            <>
              {view === 1 && (
                <>
                  <div
                    style={{
                      fontSize: 22,
                      textAlign: "center",
                      fontWeight: 900,
                      color: "#00000090",
                      fontFamily: "Poppins",
                      marginTop: 20,
                    }}
                  >
                    Title -{" "}
                  </div>{" "}
                  <div className="a">{DEPRESSION.name}</div>
                  <div
                    style={{
                      fontSize: 22,
                      textAlign: "center",
                      fontWeight: 900,
                      fontFamily: "Poppins",
                      color: "#00000090",
                    }}
                  >
                    Description -
                  </div>{" "}
                  <div className="a">{DEPRESSION.description}</div>
                  {DEPRESSION.questions.map((item, n) => {
                    return (
                      <SingleQuestion
                        set={1}
                        item={item}
                        n={n + 1}
                        selectedAnswers={selectedAnswers}
                        on_select={(x, y) =>
                          setselectedAnswers({
                            ...selectedAnswers,
                            1: {
                              questions: {
                                ...selectedAnswers?.[1].questions,
                                [y]: x,
                              },
                            },
                          })
                        }
                      />
                    );
                  })}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      fontFamily: "Poppins",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{ margin: "30px auto" }}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        setView(2);
                      }}
                    >
                      Go To Next
                    </Button>
                  </div>
                </>
              )}

              {view === 2 && (
                <>
                  <div
                    style={{
                      fontSize: 22,
                      textAlign: "center",
                      fontWeight: 900,
                      color: "#00000090",
                      fontFamily: "Poppins",
                      marginTop: 20,
                    }}
                  >
                    Title -{" "}
                  </div>{" "}
                  <div className="a">{PTSD_FORM_TWO.name}</div>
                  <div
                    style={{
                      fontSize: 22,
                      textAlign: "center",
                      fontWeight: 900,
                      color: "#00000090",
                      fontFamily: "Poppins",
                    }}
                  >
                    Description -
                  </div>{" "}
                  <div className="a">{PTSD_FORM_TWO.description}</div>
                  {PTSD_FORM_TWO.questions.map((item, n) => {
                    return (
                      <SingleQuestion
                        set={2}
                        item={item}
                        n={n + 1}
                        selectedAnswers={selectedAnswers}
                        on_select={(x, y) =>
                          setselectedAnswers({
                            ...selectedAnswers,
                            1: {
                              questions: {
                                ...selectedAnswers?.[2].questions,
                                [y]: x,
                              },
                            },
                          })
                        }
                      />
                    );
                  })}
                  <div
                    style={{
                      width: "100%",
                      display: "flex",
                      fontFamily: "Poppins",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      style={{ margin: "30px auto" }}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        setView(1);
                      }}
                    >
                      Go To Previous
                    </Button>

                    <Button
                      style={{ margin: "30px auto" }}
                      color="primary"
                      variant="outlined"
                      onClick={() => {
                        handleClickOpen();
                      }}
                    >
                      PROCEED{" "}
                    </Button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
      <style jsx>{`
        .rootx {
          padding: 0 70px;
          margin: 0;
          padding-top: 100px;
          background: #00000010;
          width: 100%;
        }

        .ddd {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
        }
        .a {
          font-size: 13px;
          font-style: normal;
          font-stretch: normal;
          line-height: 1.6em;

          font-weight: 900;
          letter-spacing: 1.4px;
          font-weight: 600;
          font-family: "Poppins";
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
        }
        .b {
          font-size: 15px;
          font-style: normal;
          font-stretch: normal;
          font-weight: 900;
          letter-spacing: 1.4px;
          font-weight: 600;
          font-family: "Poppins";
          max-width: 700px;
          margin: 0 auto;
        }
      `}</style>
    </>
  );
};

const mapStateToProps = store => ({
  laodingForm: store.consult.loadingForm,
  consultForms: store.consult.consultForms,
});

export default AuthWrapper(
  connect(mapStateToProps)(Index),
  "/login",
  "private"
);
