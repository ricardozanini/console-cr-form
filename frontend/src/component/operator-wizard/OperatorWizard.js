import React, { Component } from "react";

//import { Wizard } from "@patternfly/react-core";

import { FormJsonLoader } from "./FormJsonLoader";
import { FieldFactory } from "./field-generator/FieldFactory";

export default class OperatorWizard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            children: []
        };
        this.formJsonLoader = new FormJsonLoader({
            elementIdJson: "golang_json_form",
            elementIdJsonSchema: "golang_json_schema"
        });
    }

    componentDidMount() {
        //TODO: create the page, and then the page can create it's own components
        var pageDef = this.formJsonLoader.jsonForm.pages[0];
        var children = FieldFactory.newInstances(pageDef.fields, this.formJsonLoader.jsonSchema);
        this.setState({ children });
    }

    render() {
        return <React.Fragment>{this.state.children}</React.Fragment>;
    }
}
