import React from "react";
import { FieldBase } from "./FieldBase";
import { FormGroup, Button } from "@patternfly/react-core";
import { PlusCircleIcon, MinusCircleIcon } from "@patternfly/react-icons";

import { FIELD_TYPE, FieldFactory } from "./FieldFactory";

export class SectionField extends FieldBase {
  constructor(props) {
    super(props);
  }

  doGenerateJsx() {
    var section = this.field.label + "section";
    var jsxArray = [];
    var iconIdPlus = section + "plus";
    var iconIdMinus = section + "minus";

    var fieldJsx = (
      <FormGroup fieldId={this.fieldGroupId} key={this.fieldGroupKey}>
        <Button
          variant="link"
          id={this.fieldId}
          key={this.fieldKey}
          fieldnumber={this.fieldNumber}
          onClick={this.expandSection}
          name={section}
          style={{ display: "inline-block" }}
        >
          {this.field.label}
          <PlusCircleIcon id={iconIdPlus} style={{ display: "block" }} />{" "}
          <MinusCircleIcon id={iconIdMinus} style={{ display: "none" }} />
        </Button>
      </FormGroup>
    );

    var children = FieldFactory.newInstances(this.field.fields, null);
    jsxArray.push(fieldJsx);
    fieldJsx = (
      <div id={section} key={section} style={{ display: "none" }}>
        {children}
      </div>
    );
    jsxArray.push(fieldJsx);
    return jsxArray;
  }

  supports() {
    return FIELD_TYPE.section;
  }

  expandSection = event => {
    const target = event.target;
    const name = target.name;

    var elem = document.getElementById(name);
    //TODO: figure out a way to not manipulate the DOM directly
    if (elem.style.display === "block") {
      elem.style.display = "none";
      document.getElementById(name + "plus").style.display = "block";
      document.getElementById(name + "minus").style.display = "none";
    } else {
      elem.style.display = "block";
      document.getElementById(name + "plus").style.display = "none";
      document.getElementById(name + "minus").style.display = "block";
    }
  };
}
