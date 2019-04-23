import { DropdownField } from "./DropdownField";
import { TextAreaField } from "./TextAreaField";
import { RadioButtonField } from "./RadioButtonField";
import { EmailField } from "./EmailField";
import { UrlField } from "./UrlField";
import { PasswordField } from "./PasswordField";
import { CheckboxField } from "./CheckboxField";
import { SeparateDivField } from "./SeparateDivField";
import { SectionField } from "./SectionField";
import { TextField } from "./TextField";

export const FIELD_TYPE = {
    dropdown: "dropDown",
    textArea: "textArea",
    radioButton: "radioButton",
    // have to figure this out, skipping for now
    object: "object",
    email: "email",
    url: "url",
    password: "password",
    checkbox: "checkbox",
    seperateObjDiv: "seperateObjDiv",
    section: "section",
    text : "text"
};

export class FieldGeneratorFactory {
    /**
     * Creates a single instance of one field
     */
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
            case FIELD_TYPE.textArea:
                generator = new TextAreaField(props);
                break;
            case FIELD_TYPE.radioButton:
                generator = new RadioButtonField(props);
                break;
            case FIELD_TYPE.email:
                generator = new EmailField(props);
                break;
            case FIELD_TYPE.url:
                generator = new UrlField(props);
                break;
            case FIELD_TYPE.password:
                generator = new PasswordField(props);
                break;
            case FIELD_TYPE.checkbox:
                generator = new CheckboxField(props);
                break;
            case FIELD_TYPE.seperateObjDiv:
                generator = new SeparateDivField(props);
                break;
            case FIELD_TYPE.section:
                generator = new SectionField(props);
                break;
            default:
                generator = new TextField(props);
        }

        return generator;
    }

    /**
     * Creates all instances based on a field array
     */
    static newInstances(fields, jsonSchema) {
        var children = [];
        //TODO: make sure that this check actually works
        if (fields != null && fields != "") {
            fields.forEach((field, fieldNumber) => {
                var fieldGenerator = FieldGeneratorFactory.newInstance(
                    field,
                    fieldNumber,
                    0,
                    jsonSchema
                );
                if (fieldGenerator !== null) {
                    console.log("Generating a child", field);
                    children.push(fieldGenerator.doGenerateField());
                }
            });
        }

        return children;
    }
}
