import React from "react";
import { FieldBase } from "./FieldBase";
import { FormGroup, Radio } from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldFactory";

export class RadioButtonField extends FieldBase {
  constructor(props) {
    super(props);
  }

  doGenerateJsx() {
    const fieldIdTrue = this.fieldId + "-true";
    const fieldKeyTrue = this.fieldKey + "-true";
    const fieldIdFalse = this.fieldId + "-false";
    const fieldKeyFalse = this.fieldKey + "-false";
    return (
      <FormGroup
        label={this.field.label}
        fieldId={this.fieldGroupId}
        key={this.fieldGroupKey}
      >
        <Radio
          label="Yes"
          aria-label="radio yes"
          id={fieldIdTrue}
          key={fieldKeyTrue}
          name="horizontal-radios"
          jsonpath={this.field.jsonPath}
        />
        <Radio
          label="No"
          aria-label="radio no"
          id={fieldIdFalse}
          key={fieldKeyFalse}
          name="horizontal-radios"
          jsonpath={this.field.jsonPath}
        />
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.radioButton;
  }
}
