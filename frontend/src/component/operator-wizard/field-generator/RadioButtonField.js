import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
  FormGroup,
  Radio
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class RadioButtonField extends FieldGeneratorBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    const fieldIdTrue = this.fieldId + "-true";
    const fieldKeyTrue = this.fieldKey + "-true";
    const fieldIdFalse = this.fieldId + "-false";
    const fieldKeyFalse = this.fieldKey + "-false";
    fieldJsx = (
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
