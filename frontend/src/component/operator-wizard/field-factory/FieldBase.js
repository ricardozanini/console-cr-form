import JSONPATH from "jsonpath";
import { FIELD_TYPE } from "./FieldFactory";

export class FieldBase {
  fieldGroupId;
  fieldGroupKey;
  fieldId;
  fieldKey;
  field;
  jsonSchema;
  fieldNumber;
  attrs;

  constructor({ field, fieldNumber, pageNumber, jsonSchema, attrs }) {
    const randomNum = this.generateRandomId();

    this.fieldGroupId =
      pageNumber +
      "-fieldGroup-" +
      fieldNumber +
      "-" +
      field.label +
      "-" +
      randomNum;
    this.fieldGroupKey = "fieldGroupKey-" + this.fieldGroupId;
    this.fieldId =
      pageNumber +
      "-field-" +
      fieldNumber +
      "-" +
      field.label +
      "-" +
      randomNum;
    this.fieldKey = "fieldKey-" + this.fieldId;
    this.field = field;
    this.jsonSchema = jsonSchema;
    this.fieldNumber = fieldNumber;
    this.attrs = attrs;
  }

  generateRandomId() {
    return Math.floor(Math.random() * 100000000 + 1);
  }

  generateJsx() {
    if (
      this.supports() == this.field.type ||
      this.supports() == FIELD_TYPE.text
    ) {
      this.doGenerateJsx();
    }
  }

  findValueFromSchema(jsonPath) {
    try {
      var queryResults = JSONPATH.query(this.jsonSchema, jsonPath);
      if (Array.isArray(queryResults) && queryResults.length > 0) {
        return queryResults[0];
      }
    } catch (error) {
      console.debug("Failed to find a value from schema", error);
    }
    return [];
  }

  // hook
  doGenerateJsx() {
    throw new Error("Must be implemented by child class");
  }

  supports() {
    throw new Error("Must be implemented by chil class");
  }

  //TODO: this is wrong, figure out another approach
  setParentState(state) {
    //TODO: handle to parent
    console.log(state);
  }

  getParentState() {
    //TODO: let to parent
  }

  //TODO: what to do with this?
  onChange = value => {
    console.log("onChange with value: " + value);
  };
}
