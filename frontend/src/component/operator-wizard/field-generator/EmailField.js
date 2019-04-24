import React from "react";
import { FieldBase } from "./FieldBase";
import validator from "validator";
import {
  FormGroup,
  TextInput
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldFactory";

export class EmailField extends FieldBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    return (<FormGroup
      label={this.field.label}
      fieldId={this.fieldGroupId}
      key={this.fieldGroupKey}
    >
      <TextInput
        type="text"
        id={this.fieldId}
        key={this.fieldKey}
        name={this.field.label}
        onChange={this.onChangeEmail}
        jsonpath={field.jsonPath}
      />
    </FormGroup>);
  }

  supports() {
    return FIELD_TYPE.email;
  }

  onChangeEmail = value => {
    if (value != null && value != "" && !validator.isEmail(value)) {
      console.log("not valid email address: " + value);
      this.setParentState({
        validationMessageEmail: "not valid email address"
      });
    } else {
      this.setParentState({
        validationMessageEmail: ""
      });
    }
  };
}
