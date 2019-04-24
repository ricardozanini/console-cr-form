import React, { Component } from "react";

//import { Wizard } from "@patternfly/react-core";

import { FormJsonLoader } from "./FormJsonLoader";
import { ElementFactory } from "./ElementFactory";

export default class OperatorWizard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
    this.formJsonLoader = new FormJsonLoader({
      elementIdJson: "golang_json_form",
      elementIdJsonSchema: "golang_json_schema"
    });
  }

  componentDidMount() {
    //TODO: create the page, and then the page can create it's own components
    var pageDef = this.formJsonLoader.jsonForm.pages[0];
    var children = ElementFactory.newInstances(
      pageDef.fields,
      pageDef.buttons,
      this.formJsonLoader.jsonSchema,
      0
    );
    this.setState({ children });
  }

  render() {
    return <React.Fragment>{this.state.children}</React.Fragment>;
  }
}
