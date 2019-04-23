import React, { Component } from "react";

//import { Wizard } from "@patternfly/react-core";

import { FormJsonLoader } from "./FormJsonLoader";
import { FieldGeneratorFactory } from "./field-generator/FieldGeneratorFactory";

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
    var children = [];
    var pageDef = this.formJsonLoader.jsonForm.pages[0];
    pageDef.fields.forEach((field, fieldNumber) => {
      var fieldGenerator = FieldGeneratorFactory.newInstance(
        field,
        fieldNumber,
        0,
        this.formJsonLoader.jsonSchema
      );
      if (fieldGenerator !== null) {
        console.log("Generating a child", field);
        children.push(fieldGenerator.doGenerateField());
      }
    });
    this.setState({ children });
  }

  render() {
    return <React.Fragment>{this.state.children}</React.Fragment>;
  }
}
