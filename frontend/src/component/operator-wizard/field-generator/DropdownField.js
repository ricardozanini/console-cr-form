import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
  FormGroup,
  FormSelectOption,
  FormSelect
} from "@patternfly/react-core";

import * as utils from "../../common/CommonUtils";
import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class DropdownField extends FieldGeneratorBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    var options = [];
    const tmpJsonPath = utils.getJsonSchemaPathForJsonPath(this.field.jsonPath);
    const optionValues = this.findValueFromSchema(tmpJsonPath + ".enum");
    if (optionValues !== undefined) {
      optionValues.forEach(option => {
        const oneOption = {
          label: option,
          value: option
        };
        options.push(oneOption);
      });
    }
    const helpText = this.findValueFromSchema(tmpJsonPath + ".description");

    return (
      <FormGroup
        label={this.field.label}
        fieldId={this.fieldGroupId}
        key={this.fieldGroupKey}
        helperText={helpText}
      >
        <FormSelect
          id={this.fieldId}
          key={this.fieldKey}
          name={this.field.label}
          jsonpath={this.field.jsonPath}
        >
          {options.map((option, index) => (
            <FormSelectOption
              isDisabled={option.disabled}
              id={this.fieldId + index}
              key={this.fieldKey + index}
              value={option.value}
              label={option.label}
            />
          ))}
        </FormSelect>
      </FormGroup>
    );
  }

  supports() {
    return FIELD_TYPE.dropdown;
  }
}
