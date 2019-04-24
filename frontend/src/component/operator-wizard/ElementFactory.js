import { FieldFactory } from "./field-factory/FieldFactory";

export class ElementFactory {
  /**
   * Creates an array of element instances to be populated on each step
   */
  static newInstances(fieldDefs, buttonDefs, jsonSchema, pageNumber) {
    const children = [];

    children.push(FieldFactory.newInstances(fieldDefs, jsonSchema, pageNumber));

    return children;
  }
}
