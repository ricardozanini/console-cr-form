import React from "react";
import { FieldGeneratorBase } from "./FieldGeneratorBase";
import {
    Radio,
    Button
} from "@patternfly/react-core";

import { FIELD_TYPE, FieldGeneratorFactory } from "./FieldGeneratorFactory";

export class SectionRadioField extends FieldGeneratorBase {
    constructor(props) {
        super(props);
    }

    doGenerateField() {
        var section = this.field.label + "section";
        var jsxArray = [];
        var isCheckedRadio = this.getParentState().ssoORldap === section;

        var fieldJsx = (
            <Radio
                value={section}
                isChecked={isCheckedRadio}
                name="ssoOrldap"
                onChange={this.handleChangeRadio}
                label={this.field.label}
                id={this.field.label}
            />
        );
        //TODO: this code is a copy and paste from SectionField. Replace it!
        var children = FieldGeneratorFactory.newInstances(this.field.fields, null);
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
        return FIELD_TYPE.section_radio;
    }

    handleChangeRadio = (checked, event) => {
        const value = event.currentTarget.value;
        this.setParentState({ ssoORldap: value });

        if (value == "LDAPsection") {
            document.getElementById("SSOsection").style.display = "none";
            document.getElementById("LDAPsection").style.display = "block";
        } else {
            document.getElementById("LDAPsection").style.display = "none";
            document.getElementById("SSOsection").style.display = "block";
        }
    };

}