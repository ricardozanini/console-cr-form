import React from "react";
import ReactDOM from "react-dom";
import "@patternfly/react-core/dist/styles/base.css";
//import MainPage from "./component/MainPage_hc";
import OperatorWizard from "./component/operator-wizard/OperatorWizard";

document.addEventListener("DOMContentLoaded", function() {
  ReactDOM.render(
    React.createElement(OperatorWizard),
    document.getElementById("mount")
  );
});
