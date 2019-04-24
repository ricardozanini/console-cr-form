import React from "react";
import { FieldBase } from "./FieldBase";
import { FormGroup, TextInput } from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldFactory";

export class DefaultTextField extends FieldBase {
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
          isRequired
          type="text"
          id={this.fieldId}
          key={this.fieldKey}
          aria-describedby="horizontal-form-name-helper"
          name={this.field.label}
          onChange={this.onChange}
          jsonpath={this.field.jsonPath}
          {...this.attrs}
        />
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.text;
  }
}
