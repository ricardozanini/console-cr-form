import React from "react";
import { Button } from "@patternfly/react-core";

export class ButtonFactory {

    static newInstances(buttonDefs, pageNumber) {
        var buttonsJsx = [];
        buttonDefs.forEach((button, i) => {
            const key = pageNumber + "-form-key-" + button.label + i;

            var buttonJsx = "";
            if (button.action != null && button.action == "submit") {
                buttonJsx = (
                    <Button variant="primary" key={key} onClick={this.onSubmit}>
                        {button.label}
                    </Button>
                );
            } else if (button.action != null && button.action == "cancel") {
                buttonJsx = (
                    <Button variant="secondary" key={key} onClick={this.onCancel}>
                        {button.label}
                        Component
              </Button>
                );
            } else if (button.action != null && button.action == "next") {
                buttonJsx = (
                    <Button variant="secondary" key={key} onClick={this.onNext}>
                        {button.label}
                    </Button>
                );
            } else if (button.action != null && button.action == "close") {
                buttonJsx = (
                    <Button variant="secondary" key={key} onClick={this.onClose}>
                        {button.label}
                    </Button>
                );
            }

            buttonsJsx.push(buttonJsx);
        });

        const actionGroupKey = this.state.pageNumber + "-action-group";
        return <ActionGroup key={actionGroupKey}>{buttonsJsx}</ActionGroup>;
    }
}