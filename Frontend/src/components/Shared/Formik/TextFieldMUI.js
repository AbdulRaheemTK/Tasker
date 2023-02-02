import React from "react";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import { Field } from "formik";

function TextFieldMUI(props) {
  const { name, label, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, form, meta }) => {
        return (
          <FormControl {...rest}>
            <TextField
              id={name}
              name={name}
              label={label}
              {...rest}
              {...field}
              error={meta.touched && Boolean(meta.error)}
              helperText={meta.touched ? meta.error : null}
            />
          </FormControl>
        );
      }}
    </Field>
  );
}

export default TextFieldMUI;
