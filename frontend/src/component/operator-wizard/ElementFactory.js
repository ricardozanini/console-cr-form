import { FieldFactory } from "./field-factory/FieldFactory";
import { ButtonFactory } from "./button-factory/ButtonFactory";

export class ElementFactory {
  /**
   * Creates an array of element instances to be populated on each step
   * @param {*} fieldDefs the field defined by the JSON loaded into mem
   * @param {*} buttonDefs the button defined by the JSON loaded into mem
   * @param {*} jsonSchema the JSON Schema loaded into mem
   * @param {int} pageNumber the Page/Step number
   */
  static newInstances(fieldDefs, buttonDefs, jsonSchema, pageNumber) {
    const children = [];
    children.push(FieldFactory.newInstances(fieldDefs, jsonSchema, pageNumber));
    children.push(ButtonFactory.newInstances(buttonDefs, pageNumber));
    return children;
  }
}
