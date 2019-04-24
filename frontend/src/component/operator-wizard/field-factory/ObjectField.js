import React from "react";
import { FieldBase } from "./FieldBase";
import { ActionGroup, Button } from "@patternfly/react-core";

import { FIELD_TYPE } from "./FieldFactory";

export class ObjectField extends FieldBase {
  constructor(props) {
    super(props);
  }

  //TODO: finish this, might be the dynamic way of adding new components, now we can do it using our factory
  doGenerateJsx() {
    var jsxArray = [];
    var fieldJsx = (
      <ActionGroup fieldid={this.fieldGroupId} key={this.fieldGroupKey}>
        <Button
          variant="secondary"
          id={this.fieldId}
          key={this.fieldKey}
          fieldnumber={this.fieldNumber}
        //onClick={this.addOneFieldForObj}
        >
          Add new {this.field.label}
        </Button>
        <Button
          variant="secondary"
          id={this.fieldId + 1}
          key={this.fieldKey + 1}
          fieldnumber={this.fieldNumber}
        //onClick={this.deleteOneFieldForObj}
        >
          Delete last {this.field.label}
        </Button>
      </ActionGroup>
    );
    jsxArray.push(fieldJsx);
    jsxArray.push(
      <div key={fieldGroupId + 1}>
        =====================================================================
      </div>
    );
  }

  supports() {
    return FIELD_TYPE.object;
  }


}
