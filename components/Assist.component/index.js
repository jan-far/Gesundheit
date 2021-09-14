import React from "react";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import Styles from "./css/assist.module.css";

import NavBar from "./components/Assist.navbar";
import AssistDialog from "./components/Assist.dialog";

import { FullScreenLoader, InlineLoader } from "../general/IsLoading";
import Progress from "./components/questions/Assist.Q_Nav_Progress";

import { go_to_previous } from "../../store/actions/assist";

const Q_Page = value => {
  const Component = dynamic(
    () => import(`./components/questions/Assist.${value}`),
    {
      loading: () => <FullScreenLoader />,
    }
  );
  return <Component />;
};

const Index = props => {
  const { go_to_previous, questionHistory, Q_isLoading } = props;
  const [loading, setLoading] = React.useState("");
  const [openDialog, setOpenDialog] = React.useState("assist_dialog");

  const [onClickNext, setOnClickNext] = React.useState(false);

  return (
    <>
      <NavBar />

      {loading && <FullScreenLoader />}
      <AssistDialog
        open={openDialog === "assist_dialog"}
        handleClose={() => setOpenDialog(null)}
        setLoading={setLoading}
      />

      <Progress
        go_to_previous={go_to_previous}
        questionHistory={questionHistory}
        setOnClickNext={setOnClickNext}
      />
      <div className={Styles.root}>
        {Q_isLoading && (
          <div>
            <InlineLoader />{" "}
          </div>
        )}
        {!Q_isLoading && <>{Q_Page(questionHistory[0])}</>}
      </div>
    </>
  );
};

const mapPropsToComponent = store => ({
  Q_isLoading: store.assist.Q_isLoading,
  questionHistory: store.assist.questionHistory,
});

export default connect(mapPropsToComponent, { go_to_previous })(Index);
