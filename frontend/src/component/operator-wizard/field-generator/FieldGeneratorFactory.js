import { DropdownField } from "./DropdownField";

export const FIELD_TYPE = {
  dropdown: "dropDown"
};

export class FieldGeneratorFactory {
  static newInstance(field, fieldNumber, pageNumber, jsonSchema) {
    var generator;
    var props = {
      field: field,
      fieldNumber: fieldNumber,
      pageNumber: pageNumber,
      jsonSchema: jsonSchema
    };
    //TODO: rethink when we have the time
    switch (field.type) {
      case FIELD_TYPE.dropdown:
        generator = new DropdownField(props);
        break;
      default:
        generator = null;
    }

    return generator;
  }
}
