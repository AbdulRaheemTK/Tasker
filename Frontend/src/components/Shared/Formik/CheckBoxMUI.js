import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
} from "@mui/material";
import { Field } from "formik";
import React from "react";

const CheckBoxMUI = (props) => {
  const { name, label, ...rest } = props;
  return (
    <Field>
      {({ field, meta, form }) => {
        return (
          <FormControl>
            <FormControlLabel
              label={label}
              control={<Checkbox name={name} {...rest} {...field} />}
              error={Boolean(meta.error[name])}
              {...rest}
            />
            <FormHelperText error={Boolean(meta.error[name])}>
              {meta.error[name] ? meta.error[name] : null}
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
};

export default CheckBoxMUI;
