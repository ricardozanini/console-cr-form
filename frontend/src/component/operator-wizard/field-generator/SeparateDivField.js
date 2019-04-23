import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";

import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class SeparateDivField extends FieldGeneratorBase {
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
