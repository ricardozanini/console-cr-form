import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
  FormGroup,
  TextArea
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class TextAreaField extends FieldGeneratorBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    return (
      <FormGroup
        label={this.field.label}
        isRequired
        fieldId={this.fieldGroupId}
        key={this.fieldGroupKey}
      >
        <TextArea
          value={this.field.default}
          name="horizontal-form-exp"
          id={this.fieldId}
          key={this.fieldKey}
          jsonpath={this.field.jsonPath}
        />
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.textArea;
  }
}
