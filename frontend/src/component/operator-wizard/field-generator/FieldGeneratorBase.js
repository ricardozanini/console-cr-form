import JSONPATH from "jsonpath";
import { FIELD_TYPE } from "./FieldGeneratorFactory";

export class FieldGeneratorBase {
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

    generateField() {
        if (this.supports() == this.field.type || this.supports() == FIELD_TYPE.text) {
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
        throw new Error("Must be implemented by chil class");
    }

    setState(state) {
        //TODO: handle to parent
    }

    //TODO: what to do with this?
    onChange = value => {
        console.log("onChange with value: " + value);
    };
}
