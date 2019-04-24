import React from "react";
import { FieldBase } from "./FieldBase";
import { FormGroup, TextArea } from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldFactory";

export class TextAreaField extends FieldBase {
  constructor(props) {
    super(props);
  }

  doGenerateJsx() {
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
