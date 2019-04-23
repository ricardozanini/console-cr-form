import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import validator from "validator";
import {
  FormGroup,
  TextInput
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class UrlField extends FieldGeneratorBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    return (
      <FormGroup
        label={this.field.label}
        fieldId={this.fieldGroupId}
        key={this.fieldGroupKey}
      >
        <TextInput
          type="text"
          id={this.fieldId}
          key={this.fieldKey}
          name={this.field.label}
          onChange={this.onChangeUrl}
          jsonpath={this.field.jsonPath}
        />
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.url;
  }

  onChangeUrl = value => {
    if (value != null && value != "" && !validator.isURL(value)) {
      console.log("not valid URL " + value);
      this.setState({
        validationMessageUrl: "not valid URL"
      });
    } else {
      this.setState({
        validationMessageUrl: ""
      });
    }
  };
}
