import React from "react";
import { Form } from "@patternfly/react-core";

import PageBase from "./PageBase1";

export default class SubPage extends PageBase {
  constructor(props) {
    super(props);

    this.state = {
      jsonForm: this.props.jsonForm,
      pageNumber: this.props.pageNumber,
      children: this.props.children,
      objectMap: new Map(),
      objectCntMap: new Map(),
      pageDef: this.props.pageDef
    };
  }

  // componentDidMount() {
  //   this.renderComponents();
  //   console.log(this.state.pageNumber);
  //   console.log(this.state.children);
  //   console.log(this.props.children);
  //   console.log("Swati");
  // }

  render() {
    return <div>{this.state.children}</div>;
  }
}
