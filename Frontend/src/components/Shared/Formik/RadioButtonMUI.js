import { FormControl, FormHelperText, FormLabel, Radio } from "@mui/material";
import { Field } from "formik";
import React from "react";

const RadioButtonMUI = (props) => {
  const { name, option, ...rest } = props;
  return (
    <Field>
      {({ field, form, meta }) => {
        return (
          <FormControl>
            <FormLabel>
              <Radio
                name={name}
                value={option.value.toString()}
                checked={form.values[option.value.toString()]}
                onChange={form.handleChange}
                {...rest}
              ></Radio>
              {option.label}
            </FormLabel>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default RadioButtonMUI;
