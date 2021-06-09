// Library
import React from "react";
import PropTypes from "prop-types";
// Component 
import QuestionToggle from "../components/QuestionToggle"
import LogoAppBar from "../components/LogoAppBar"

export const PayPerView = () => {

  return (
    <>
    <LogoAppBar />
    <QuestionToggle />
    </>
  );
};

PayPerView.propTypes = {};

export default PayPerView;
