import { FieldFactory } from "./field-factory/FieldFactory";
import { ButtonFactory } from "./button-factory/ButtonFactory";

export class ElementFactory {
  /**
   * Creates an array of element instances to be populated on each step
   */
  static newInstances(fieldDefs, buttonDefs, jsonSchema, pageNumber) {
    const children = [];

    children.push(FieldFactory.newInstances(fieldDefs, jsonSchema, pageNumber));
    children.push(ButtonFactory.newInstances(buttonDefs, pageNumber));
    return children;
  }
}
