import React, { Component } from "react";

import { Wizard } from "@patternfly/react-core";

export default class OperatorWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      isFormValidA: true,
      formValueA: "Five",
      isFormValidB: true,
      formValueB: "Six",
      allStepsValid: true
    };
  }

  toggleOpen = () => {
    this.setState(({ isOpen }) => ({
      isOpen: !isOpen
    }));
  };

  onFormChangeA = (isValid, value) => {
    this.setState(
      {
        isFormValidA: isValid,
        formValueA: value
      },
      this.areAllStepsValid
    );
  };

  onFormChangeB = (isValid, value) => {
    this.setState(
      {
        isFormValidB: isValid,
        formValueB: value
      },
      this.areAllStepsValid
    );
  };

  areAllStepsValid = () => {
    this.setState({
      allStepsValid: this.state.isFormValidA && this.state.isFormValidB
    });
  };

  onNext = ({ id, name, component }, { prevId, prevName }) => {
    console.log(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
    console.log(` component: ${component}`);
    this.areAllStepsValid();
  };

  onBack = ({ id, name }, { prevId, prevName }) => {
    console.log(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
    this.areAllStepsValid();
  };

  onGoToStep = ({ id, name }, { prevId, prevName }) => {
    console.log(
      `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
    );
  };

  onSave = () => {
    console.log("Saved and closed the wizard");
    this.setState({
      isOpen: false
    });
  };

  render() {
    return (
      <Wizard
        isOpen={true}
        title="Operator GUI"
        description="KIE Operator"
        onClose={this.toggleOpen}
        onSave={this.onSave}
        steps={this.props.steps}
        onNext={this.onNext}
        onBack={this.onBack}
        onGoToStep={this.onGoToStep}
      />
    );
  }
}
