import React, { Component } from "react";

import YAML from "js-yaml";

//import { Form } from "@patternfly/react-core";
import {
  Button,
  ActionGroup,
  Checkbox,
  Modal,
  Wizard,
  TextArea,
  Form
} from "@patternfly/react-core";

import { USE_MOCK_DATA } from "./common/GuiConstants";
import { MockupData_JSON, MockupData_JSON_SCHEMA } from "./common/MockupData";

import SubPage from "./SubPage";

import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import Page31 from "./pages/Page31";
import Page32 from "./pages/Page32";
import Page33 from "./pages/Page33";
import Page from "./EachPage";
import CopyToClipboard from "react-copy-to-clipboard";
import * as utils from "./common/CommonUtils";
import Dot from "dot-object";

export default class MainPage extends Component {
  constructor(props) {
    super(props);

    let passedInJsonForm;
    //this is the render json form, which will be updated on-the-fly.
    let jsonForm;
    let jsonSchema;
    let useMockdataWarning;
    if (USE_MOCK_DATA) {
      passedInJsonForm = MockupData_JSON;
      jsonForm = JSON.parse(JSON.stringify(passedInJsonForm));
      jsonSchema = MockupData_JSON_SCHEMA;
      useMockdataWarning = "USING MOCK DATA!!!!!";
    } else {
      passedInJsonForm = JSON.parse(
        document.getElementById("golang_json_form").innerHTML
      );
      jsonForm = JSON.parse(JSON.stringify(passedInJsonForm));

      jsonSchema = JSON.parse(
        document.getElementById("golang_json_schema").innerHTML
      );
    }

    //let jsonForm = this.convertPassedInToRenderJson(passedInJsonForm);

    this.state = {
      useMockdataWarning,
      jsonForm,
      jsonSchema,
      sampleYaml: {},
      showPopup: false,
      resultYaml: "",
      copied: false,
      pagesJsx: [],
      subpagesMap: new Map(),
      steps: [],
      wizardJsx: [],
      isOpen: true,
      isFormValidA: true,
      formValueA: "Five",
      isFormValidB: true,
      formValueB: "Six",
      allStepsValid: true,
      children: []
    };

    this.toggleOpen = () => {
      this.setState(({ isOpen }) => ({
        isOpen: !isOpen
      }));
    };
    this.onFormChangeA = (isValid, value) => {
      this.setState(
        {
          isFormValidA: isValid,
          formValueA: value
        },
        this.areAllStepsValid
      );
    };
    this.onFormChangeB = (isValid, value) => {
      this.setState(
        {
          isFormValidB: isValid,
          formValueB: value
        },
        this.areAllStepsValid
      );
    };
    this.areAllStepsValid = () => {
      this.setState({
        allStepsValid: this.state.isFormValidA && this.state.isFormValidB
      });
    };
    this.onNext = ({ id, name, component }, { prevId, prevName }) => {
      console.log(
        `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
      );
      console.log(` component: ${component}`);
      this.areAllStepsValid();
    };
    this.onBack = ({ id, name }, { prevId, prevName }) => {
      console.log(
        `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
      );
      this.areAllStepsValid();
    };
    this.onGoToStep = ({ id, name }, { prevId, prevName }) => {
      console.log(
        `current id: ${id}, current name: ${name}, previous id: ${prevId}, previous name: ${prevName}`
      );
    };
    this.onSave = () => {
      console.log("Saved and closed the wizard");
      this.setState({
        isOpen: false
      });
    };
  }

  /*
  convertPassedInToRenderJson = passedInJsonForm => {
    let renderJson;
    if (passedInJsonForm != null) {
      passedInJsonForm.pages.forEach((pageDef, i) => {
        console.log("page number: " + i);

        //generate all fields
        if (pageDef.fields != null && pageDef.fields != "") {
          let tmpPage = [];
          //loop through all fields
          pageDef.fields.forEach(field => {
            if (field.type != "object") {
              tmpPage.push(field);
            }
          });
        }

        //loop through all fields
        pageDef.fields.forEach(field => {
          if (field.type != "object") {
            tmpPage.push(field);
          }
        });
      }
      });
    }

    return passedInJsonForm;
  };
  */

  saveJsonForm = inputJsonForm => {
    this.setState({
      jsonForm: inputJsonForm
    });
  };
  /*
  setValue1 = value1 => {
    this.setState({
      value1
    });
  };

  setValue2 = value2 => {
    this.setState({
      value2
    });
  };

  setValue3 = value3 => {
    this.setState({
      value3
    });
  };

  setValue4 = value4 => {
    this.setState({
      value4
    });
  };


  setName = name => {
    console.log("set state Name " + name);
    this.setState({
      name
    });
  };
*/
  convertStatesToYaml = () => {
    const spec = {};
    spec.environment = this.state.value3;
    spec.applicationName = this.state.value4;

    const formData = {
      name: this.state.name,
      apiVersion: this.state.value1,
      kind: this.state.value2,
      spec: spec
    };

    return YAML.safeDump(formData);
  };

  cancel = () => {
    console.log("cancle button is clicked, do nothing for now");
  };

  submit = () => {
    var str = "";
    var sampleYaml = {};
    var elem = document.getElementById("main_form").elements;
    for (var i = 0; i < elem.length; i++) {
      if (elem[i].type != "button") {
        var jsonpath = document
          .getElementById(elem[i].id)
          .getAttribute("jsonpath");
        if (
          elem[i].value != null &&
          elem[i].value != "" &&
          elem[i].name != "alt-form-checkbox-1" &&
          jsonpath != "$.spec.auth.sso" &&
          jsonpath != "$.spec.auth.ldap"
        ) {
          str += "Name: " + elem[i].name + " ";
          str += "Type: " + elem[i].type + " ";
          str += "Value: " + elem[i].value + " ";
          str += "                                                 ";

          var tmpJsonPath = utils.getJsonSchemaPathForYaml(jsonpath);
          const value =
            elem[i].type === "checkbox" ? elem[i].checked : elem[i].value;
          if (tmpJsonPath.search(/\*/g) != -1) {
            tmpJsonPath = utils.replaceStarwithPos(elem[i], jsonpath);
          }
          //
          sampleYaml[tmpJsonPath] = value;
          //  }
        }
      }
    }
    alert(str);
    console.log(sampleYaml);
    var result = this.createResultYaml(sampleYaml);
    console.log(result);
    //alert(result);
  };

  handleAddPlanFormChange = e => {
    console.log("handleAddPlanFormChange, e.target.name: " + e.target.name);

    //console.log("handleAddPlanFormChange, e.target.name: " + jsonpath);

    if (e.target.name == "name") {
      this.setState({ name: e.target.value });
    } else if (e.target.name == "description") {
      this.setState({ description: e.target.value });
    } else if (e.target.name == "sourceContainerId") {
      this.setState({ sourceContainerId: e.target.value });
    } else if (e.target.name == "targetContainerId") {
      this.setState({ targetContainerId: e.target.value });
    } else if (e.target.name == "targetProcessId") {
      this.setState({ targetProcessId: e.target.value });
    } else if (e.target.name == "mappings") {
      this.setState({ mappings: e.target.value });
    }
  };

  createResultYaml = sampleYaml => {
    Dot.object(sampleYaml);
    // this.setState({
    //   sampleYaml
    // });
    var resultYaml = YAML.safeDump(sampleYaml);
    this.setState({
      resultYaml
    });

    return resultYaml;
  };

  setResultYaml = resultYaml => {
    this.setState({
      resultYaml
    });
  };

  togglePopup = () => {
    //  alert("Swat")
    //alert(this.state.showPopup);
    this.setState({
      showPopup: !this.state.showPopup
    });
  };

  onCopyYaml = () => {
    this.setState({ copied: true });
  };

  /*
//This can dynamically generate the pages, but it messTextAreap the map which store the sampleObj for array, so can't use it now
    function DisplayPages(props) {
      const jsonForm = props.jsonForm;
import CopyToClipboard from "react-copy-to-clipboard";TextArea
import CopyToClipboard from "react-copy-to-clipboard";TextArea
import CopyToClipboard from "react-copy-to-clipboard";TextArea
import CopyToClipboard from "react-copy-to-clipboard";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyToClipboard from "react-copy-to-clipboard";
        jsonForm.pages.forEach((page, pageNumber) => {
          const eachPage = (
            <div key={pageNumber}>
              ===<b>PAGE{pageNumber + 1}</b> ==================================
              <EachPage
                jsonForm={props.jsonForm}
                jsonSchema={props.jsonSchema}
                saveJsonForm={props.saveJsonForm}
                pageNumber={pageNumber}
              />
            </div>
          );
          jsxArray.push(eachPage);
        });
        return jsxArray;
import CopyToClipboard from "react-copy-to-clipboard";
import CopyToClipboard from "react-copy-to-clipboard";
import CopyToClipboard from "react-copy-to-clipboard";
    <!--tr>
      <td>
        <DisplayPages
          jsonForm={this.state.jsonForm}
          jsonSchema={this.state.jsonSchema}
          saveJsonForm={this.saveJsonForm}
        />
      </td>
    </tr-->

*/
  onChangeYaml = value => {
    this.setResultYaml(value);
  };

  componentDidMount() {
    console.log("componentDidMount");
    this.renderPages();
  }
  //   componentDidUpdate() {
  //     console.log("componentcomponentDidUpdateDidMount");
  //     this.renderPages();
  //   }
  renderPages() {
    //const pages = this.state.jsonForm.pages;
    console.error("renderPages1");
    // const pagesJsx = this.buildPages();
    const wizardJsx = this.buildPages();
    // const steps = this.buildPages();;
    console.error("renderPages2:::" + wizardJsx);

    this.setState({ wizardJsx });
    //this.setState(steps)
  }
  buildPages = () => {
    const pages = this.state.jsonForm.pages;
    var pagesJsx = [];
    var wizardJsx = [];
    const steps = [];
    var pageJsx = [];
    var item = {};
    if (pages != null && pages != "") {
      //loop through all subpages
      pages.forEach((page, i) => {
        console.log("loop...." + i);
        console.log("loop...." + JSON.stringify(page));
        //  pageJsx = (
        //   <SubPage
        //     pageNumber={i}
        //     jsonForm={this.state.jsonForm}
        //     jsonSchema={this.state.jsonSchema}
        //     saveJsonForm={this.saveJsonForm}
        //     createResultYaml={this.createResultYaml}
        //     showPopup={this.state.showPopup}
        //     togglePopup={this.togglePopup}
        //     pageDef={this.state.jsonForm.pages[i]}

        //   />
        // );
        // pagesJsx.push(pageJsx);
        var name = "page #" + i;
        var pagno = i;

        var pageDef = this.state.jsonForm.pages[i];
        //steps[i]=  { id: i, name:name, component: pageJsx,enableNext:true }
        var pageComp = (
          <SubPage
            pageNumber={pagno}
            jsonForm={this.state.jsonForm}
            jsonSchema={this.state.jsonSchema}
            saveJsonForm={this.saveJsonForm}
            createResultYaml={this.createResultYaml}
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup}
            setResultYaml={this.setResultYaml}
            children={this.state.children}
            pageDef={page}
          />
        );
        item = { id: i, name: name, component: pageComp, enableNext: true };
        steps.push(item);
        // this.setState({
        //     steps: [...this.state.steps, item]
        //   })
        //  console.log("steps"+JSON.stringify(steps));
        // this.buildSubPages(i);
      });
      this.setState(steps);
    } else {
      console.log("pages are not available");
      //do nothing, it's an empty page.
    }

    //return steps;
  };

  buildSubPages = i => {
    const pages = this.state.jsonForm.pages[i].subpages;
    const pagesJsx = [];
    if (pages != null && pages != "") {
      //loop through all subpages
      pages.forEach((page, i) => {
        var page = (
          <SubPage
            pageNumber={i}
            jsonForm={this.state.jsonForm}
            jsonSchema={this.state.jsonSchema}
            saveJsonForm={this.saveJsonForm}
            createResultYaml={this.createResultYaml}
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup}
            children={this.state.children}
          />
        );
        pagesJsx.push(page);
      });
    } else {
      //console.log("do nothing, it's an empty page.");
      //do nothing, it's an empty page.
    }
    this.state.subpagesMap.set(i, pagesJsx);
    return pagesJsx;
  };

  render() {
    const {
      isOpen,
      isFormValidA,
      isFormValidB,
      formValueA,
      formValueB,
      allStepsValid
    } = this.state;
    // var pageDef=this.state.jsonForm.pages[i];
    const steps = [
      {
        id: 0,
        name: "Page 1",
        component: (
          <Page1
            pageNumber={1}
            jsonForm={this.state.jsonForm}
            jsonSchema={this.state.jsonSchema}
            saveJsonForm={this.saveJsonForm}
            createResultYaml={this.createResultYaml}
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup}
            setResultYaml={this.setResultYaml}
            pageDef={this.state.jsonForm.pages[0]}
          />
        ),
        enableNext: true
      },

      {
        id: 1,
        name: "Page 2",
        component: (
          <Page2
            pageNumber={2}
            jsonForm={this.state.jsonForm}
            jsonSchema={this.state.jsonSchema}
            saveJsonForm={this.saveJsonForm}
            createResultYaml={this.createResultYaml}
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup}
            setResultYaml={this.setResultYaml}
            pageDef={this.state.jsonForm.pages[1]}
          />
        ),

        enableNext: true
      },
      {
        id: 2,
        name: "Page 3",
        component: (
          <Page3
            pageNumber={0}
            jsonForm={this.state.jsonForm}
            jsonSchema={this.state.jsonSchema}
            saveJsonForm={this.saveJsonForm}
            createResultYaml={this.createResultYaml}
            showPopup={this.state.showPopup}
            togglePopup={this.togglePopup}
            setResultYaml={this.setResultYaml}
            pageDef={this.state.jsonForm.pages[2]}
          />
        ),
        steps: [
          {
            id: 0,
            name: "Console",
            component: (
              <Page31
                pageNumber={31}
                jsonForm={this.state.jsonForm}
                jsonSchema={this.state.jsonSchema}
                saveJsonForm={this.saveJsonForm}
                createResultYaml={this.createResultYaml}
                showPopup={this.state.showPopup}
                togglePopup={this.togglePopup}
                setResultYaml={this.setResultYaml}
                pageDef={this.state.jsonForm.pages[2].subPages[0]}
              />
            ),
            enableNext: isFormValidA
          },
          {
            id: 1,
            name: "Server",
            component: (
              <Page32
                pageNumber={32}
                jsonForm={this.state.jsonForm}
                jsonSchema={this.state.jsonSchema}
                saveJsonForm={this.saveJsonForm}
                createResultYaml={this.createResultYaml}
                showPopup={this.state.showPopup}
                togglePopup={this.togglePopup}
                setResultYaml={this.setResultYaml}
                pageDef={this.state.jsonForm.pages[2].subPages[1]}
              />
            ),
            enableNext: isFormValidB
          },
          {
            id: 3,
            name: "Smart Router",
            component: (
              <Page33
                pageNumber={33}
                jsonForm={this.state.jsonForm}
                jsonSchema={this.state.jsonSchema}
                saveJsonForm={this.saveJsonForm}
                createResultYaml={this.createResultYaml}
                showPopup={this.state.showPopup}
                togglePopup={this.togglePopup}
                setResultYaml={this.setResultYaml}
                pageDef={this.state.jsonForm.pages[2].subPages[2]}
              />
            ),
            enableNext: isFormValidB
          }
          //,
          // { id: 4, name: "Substep C", component: <p>Substep C</p> }
        ]
      }
      // ,

      // {
      //   id: 3,
      //   name: "Additional",
      //   component: <p>Step 3</p>,
      //   enableNext: allStepsValid
      // },
      // { id: 4, name: "Review", component: <p>Step 4</p> }
    ];

    return (
      <React.Fragment>
        <Wizard
          isOpen={isOpen}
          title="Operator GUI"
          description="KIE Operator"
          onClose={this.toggleOpen}
          onSave={this.onSave}
          steps={steps}
          onNext={this.onNext}
          onBack={this.onBack}
          onGoToStep={this.onGoToStep}
        />
      </React.Fragment>
    );
  }
}
