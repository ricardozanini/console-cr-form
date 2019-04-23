import JSONPATH from "jsonpath";

export class FieldGeneratorBase {
  fieldJsx = "";
  fieldGroupId;
  fieldGroupKey;
  fieldId;
  fieldKey;
  field;
  jsonSchema;

  constructor({ field, fieldNumber, pageNumber, jsonSchema }) {
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
  }

  generateRandomId() {
    return Math.floor(Math.random() * 100000000 + 1);
  }

  generateField() {
    if (this.supports() == this.field.type) {
      this.doGenerateField();
    }
  }

  findValueFromSchema(jsonPath) {
    var queryResults = JSONPATH.query(this.jsonSchema, jsonPath);
    return queryResults[0];
  }

  // hook
  doGenerateField() {
    throw new Error("Must be implemented by child class");
  }

  supports() {
    throw new Error("Must be implemented by child class");
  }
}
