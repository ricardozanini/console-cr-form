import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
  FormGroup,
  TextInput
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class PasswordField extends FieldGeneratorBase {
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
          type="password"
          id={this.fieldId}
          key={this.fieldKey}
          name={this.field.label}
          onChange={this.onChange}
          jsonpath={this.field.jsonPath}
        />
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.password;
  }


}
