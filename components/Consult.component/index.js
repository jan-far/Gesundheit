import React, { useCallback } from "react";
import AuthWrapper from "../HOC/AuthWrapper";
import Navbar from "../Profile.component/Profile.navbar";
import { connect } from "react-redux";
import { getConsultFormIds } from "./utils";

const Index = (props) => {
  const { consultForms, loadingForm } = props;
  // const ids = getConsultFormIds(consultForms);
  console.log(consultForms);

  return (
    <>
      <Navbar />
      <div>Consult page</div>
      <div>
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
      </div>
    </>
  );
};

const mapStateToProps = (store) => ({
  laodingForm: store.consult.loadingForm,
  consultForms: store.consult.consultForms,
});

export default AuthWrapper(connect(mapStateToProps)(Index), "/login", "private");
