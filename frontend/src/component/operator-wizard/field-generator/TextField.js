import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
  FormGroup,
  TextInput
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class TexField extends FieldGeneratorBase {
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
