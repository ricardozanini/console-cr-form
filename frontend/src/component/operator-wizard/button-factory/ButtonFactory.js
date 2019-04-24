import React from "react";
import { ActionGroup } from "@patternfly/react-core";
import { ButtonElement } from "./ButtonElement";

export class ButtonFactory {
  /**
   * Generates an array of child elements based on the button definitions.
   * @param {*} buttonDefs the button definitions
   * @param {int} pageNumber the page number
   */
  static newInstances(buttonDefs, pageNumber) {
    var buttonsJsx = [];
    if (buttonDefs !== undefined && buttonDefs !== null && buttonDefs !== "") {
      buttonDefs.forEach((buttonDef, i) => {
        var buttonElement = new ButtonElement({
          buttonDef: buttonDef,
          pageNumber: pageNumber,
          buttonId: i
        });
        buttonsJsx.push(buttonElement.generateJsx());
      });
    }

    if (buttonsJsx.length > 0) {
      const actionGroupKey = pageNumber + "-action-group";
      return <ActionGroup key={actionGroupKey}>{buttonsJsx}</ActionGroup>;
    }

    return [];
  }
}
