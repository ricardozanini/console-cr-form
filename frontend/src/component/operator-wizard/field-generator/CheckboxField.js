import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
  FormGroup,
  Checkbox
} from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class CheckboxField extends FieldGeneratorBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    var name = "checkbox-" + this.fieldNumber;
    var isChecked = this.field.default == "true" || this.field.default == "TRUE";

    return (
      <FormGroup
        label={this.field.label}
        fieldId={this.fieldGroupId}
        key={this.fieldGroupKey}
      >
        <Checkbox
          isChecked={isChecked}
          onChange={this.onChangeCheckBox}
          id={this.fieldId}
          key={this.fieldKey}
          aria-label="checkbox yes"
          name={name}
          jsonpath={this.field.jsonPath}
        />
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.textArea;
  }

  onChangeCheckBox = (_, event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;

    this.setState({ [event.target.name]: value });
  };

}
