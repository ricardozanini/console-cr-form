import React from "react";
import { ElementFactory } from "../ElementFactory";
import { PageFactory } from "./PageFactory";

/**
 * The Page component to handle each element individually.
 */
export class Page {
  children = [];
  /**
   * Default constructor for the PageComponent.
   *
   * @param {*} props { pageDef, jsonSchema, pageNumber }
   */
  constructor(props) {
    this.props = props;
    this.loadPageChildren();
  }

  loadPageChildren() {
    //let's add all elements
    this.children.push(
      ElementFactory.newInstances(
        this.props.pageDef.fields,
        this.props.pageDef.buttons,
        this.props.jsonSchema,
        this.props.pageNumber
      )
    );
    // ...and then all subpages
    this.children.push(
      PageFactory.newInstances(
        this.props.pageDef.subPages,
        this.props.jsonSchema
      )
    );
  }

  getChildren() {
    return this.children;
  }

  getJsx() {
    return <div>{this.children}</div>;
  }
}
