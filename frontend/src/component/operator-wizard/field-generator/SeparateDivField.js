import React from "react";
import { FieldBase } from "./FieldBase";

import { FIELD_TYPE } from "./FieldFactory";

export class SeparateDivField extends FieldBase {
  constructor(props) {
    super(props);
  }

  doGenerateField() {
    return (
      <div key={this.fieldKey}>
        ------------------------------------------------------------------------------------------------------------------
      </div>
    );
  }

  supports() {
    return FIELD_TYPE.seperateObjDiv;
  }
}
