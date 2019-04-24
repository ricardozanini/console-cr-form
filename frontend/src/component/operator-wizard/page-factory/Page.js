import React from "react";
import { ElementFactory } from "../ElementFactory";
import { PageFactory } from "./PageFactory";

/**
 * The Page component to handle each element individually.
 */
export class Page {
  elements = [];
  subPages = [];
  /**
   * Default constructor for the PageComponent.
   *
   * @param {*} props { pageDef, jsonSchema, pageNumber }
   */
  constructor(props) {
    this.props = props;
    this.loadPageChildren();
    console.log("Page created", props.pageNumber);
  }

  loadPageChildren() {
    //let's add all elements
    this.elements = ElementFactory.newInstances(
      this.props.pageDef.fields,
      this.props.pageDef.buttons,
      this.props.jsonSchema,
      this.props.pageNumber
    );
    // ...and then all subpages
    this.subPages = PageFactory.newInstances(
      this.props.pageDef.subPages,
      this.props.jsonSchema
    );
  }

  getElements() {
    return this.elements;
  }

  getSubPages() {
    return this.subPages;
  }

  getJsx() {
    return <div>{this.elements}</div>;
  }
}
