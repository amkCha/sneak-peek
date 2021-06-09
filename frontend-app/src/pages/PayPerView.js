// Library
import React from "react";
import PropTypes from "prop-types";
// Component 
import QuestionToggle from "../components/QuestionToggle"
import LogoAppBar from "../components/LogoAppBar"

export const PayPerView = ({match}) => {
  const { userName } = match.params;
  
  return (
    <>
    <LogoAppBar />
    <QuestionToggle userName={userName} />
    </>
  );
};

PayPerView.propTypes = {
  match: PropTypes.object.isRequired
};

export default PayPerView;
