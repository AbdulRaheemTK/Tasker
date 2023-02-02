import * as React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { Field } from "formik";
import RadioButtonMUI from "./RadioButtonMUI";
import { FormHelperText } from "@mui/material";

const RadioButtonGroupMUI = (props) => {
  const { name, label, options, ...rest } = props;
  return (
    <Field>
      {({ field, meta, form }) => {
        return (
          <FormControl>
            <FormLabel id={name}>{label}</FormLabel>
            <RadioGroup aria-labelledby={name} name={name} {...rest}>
              {options.map((option) => {
                return <RadioButtonMUI option={option} name={name} {...rest} />;
              })}
            </RadioGroup>
            <FormHelperText error={Boolean(meta.error[name])}>
              {meta.error[name] ? meta.error[name] : null}
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default RadioButtonGroupMUI;
