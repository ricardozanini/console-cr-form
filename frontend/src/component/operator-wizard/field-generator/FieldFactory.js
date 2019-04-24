import { DropdownField } from "./DropdownField";
import { TextAreaField } from "./TextAreaField";
import { RadioButtonField } from "./RadioButtonField";
import { EmailField } from "./EmailField";
import { UrlField } from "./UrlField";
import { PasswordField } from "./PasswordField";
import { CheckboxField } from "./CheckboxField";
import { SeparateDivField } from "./SeparateDivField";
import { SectionField } from "./SectionField";
import { DefaultTextField } from "./DefaultTextField";
import { SectionRadioField } from "./SectionRadioField";

export const FIELD_TYPE = {
    dropdown: "dropDown",
    textArea: "textArea",
    radioButton: "radioButton",
    object: "object",
    email: "email",
    url: "url",
    password: "password",
    checkbox: "checkbox",
    seperateObjDiv: "seperateObjDiv",
    section: "section",
    text: "text",
    section_radio: "section_radio"
};

export class FieldFactory {
    /**
     * Creates a single instance of one field
     */
    static newInstance(field, fieldNumber, pageNumber, jsonSchema) {
        var fieldReference;
        var props = {
            field: field,
            fieldNumber: fieldNumber,
            pageNumber: pageNumber,
            jsonSchema: jsonSchema
        };
        //TODO: rethink when we have the time
        switch (field.type) {
            case FIELD_TYPE.dropdown:
                fieldReference = new DropdownField(props);
                break;
            case FIELD_TYPE.textArea:
                fieldReference = new TextAreaField(props);
                break;
            case FIELD_TYPE.radioButton:
                fieldReference = new RadioButtonField(props);
                break;
            case FIELD_TYPE.email:
                fieldReference = new EmailField(props);
                break;
            case FIELD_TYPE.url:
                fieldReference = new UrlField(props);
                break;
            case FIELD_TYPE.password:
                fieldReference = new PasswordField(props);
                break;
            case FIELD_TYPE.checkbox:
                fieldReference = new CheckboxField(props);
                break;
            case FIELD_TYPE.seperateObjDiv:
                fieldReference = new SeparateDivField(props);
                break;
            case FIELD_TYPE.section:
                fieldReference = new SectionField(props);
                break;
            case FIELD_TYPE.section_radio:
                fieldReference = new SectionRadioField(props);
                break;
            default: 
                fieldReference = new DefaultTextField(props);
        }

        return fieldReference;
    }

    /**
     * Creates all instances based on a field array
     */
    static newInstances(fields, jsonSchema) {
        var children = [];
        //TODO: make sure that this check actually works
        if (fields != null && fields != "") {
            fields.forEach((field, fieldNumber) => {
                var fieldGenerator = FieldFactory.newInstance(
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
