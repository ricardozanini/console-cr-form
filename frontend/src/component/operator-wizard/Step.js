import React, { Component } from "react";

/**
 * Dynamically created from JSON. see: MockupData ("page" element) for structure reference
 */
export default class Step extends Component {
  constructor(props) {
    super(props);
    this.state = {
      children: []
    };
  }

  componentDidMount() {}

  render() {
    return <div>{this.state.children}</div>;
  }
}
