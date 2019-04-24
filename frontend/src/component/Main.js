import React, { Component } from "react";
import { FormJsonLoader } from "./operator-wizard/FormJsonLoader";
import { PageFactory } from "./operator-wizard/page-factory/PageFactory";
import OperatorWizard from "./operator-wizard/OperatorWizard";

export default class Main extends Component {
  formJsonLoader;

  constructor(props) {
    super(props);
    this.state = {
      steps: [
        {
          id: 0,
          name: "Loading",
          component: <div>Loading</div>,
          enableNext: true
        }
      ]
    };
  }

  componentDidMount() {
    this.formJsonLoader = new FormJsonLoader({
      elementIdJson: "golang_json_form",
      elementIdJsonSchema: "golang_json_schema"
    });
    this.createSteps();
  }

  createSteps() {
    //TODO: move to stepbuilder
    var steps = [];
    var pages = this.formJsonLoader.jsonForm.pages;
    var children = PageFactory.newInstances(
      pages,
      this.formJsonLoader.jsonSchema
    );
    children.forEach((page, count) => {
      var step = {
        id: count + 1,
        name: "Page " + count + 1,
        component: page.getJsx(),
        enableNext: true //need to add logic
      };
      if (page.getSubPages().length > 0) {
        step.steps = [];
        page.getSubPages().forEach((subPage, subPageCount) => {
          console.log("this is the subpage", subPage);
          step.steps.push({
            id: count + "" + subPageCount,
            name: "SubPage " + subPageCount + 1,
            component: subPage.getJsx(),
            enableNext: true
          });
        });
      }

      steps.push(step);
    });
    console.log("Here the steps: ", steps);
    this.setState({ steps });
  }

  render() {
    return (
      <React.Fragment>
        <OperatorWizard steps={this.state.steps} />
      </React.Fragment>
    );
  }
}
