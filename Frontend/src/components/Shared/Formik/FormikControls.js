import React from "react";
import CheckBoxMUI from "./CheckBoxMUI";
import RadioButtonGroupMUI from "./RadioButtonGroupMUI";
import RadioButtonMUI from "./RadioButtonMUI";
import SelectMUI from "./SelectMUI";
import TextFieldMUI from "./TextFieldMUI";

function FormikControls(props) {
  const { control, ...rest } = props;
  switch (control) {
    case "TextField":
      return <TextFieldMUI {...rest} />;
    case "Select":
      return <SelectMUI {...rest} />;
    case "RadioButtonGroup":
      return <RadioButtonGroupMUI {...rest} />;
    case "RadioButton":
      return <RadioButtonMUI {...rest} />;
    case "CheckBox":
      return <CheckBoxMUI {...rest} />;
    default:
      break;
  }
}

export default FormikControls;
