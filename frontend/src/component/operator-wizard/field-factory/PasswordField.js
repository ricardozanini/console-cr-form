import React from "react";
import { FieldBase } from "./FieldBase";
import { FormGroup, TextInput } from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldFactory";

export class PasswordField extends FieldBase {
  constructor(props) {
    super(props);
  }

  doGenerateJsx() {
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
