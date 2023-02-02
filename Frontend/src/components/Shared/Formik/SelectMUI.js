import React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import { Field } from "formik";
import { FormHelperText } from "@mui/material";

function SelectMUI(props) {
  const { name, label, options, ...rest } = props;
  return (
    <Field name={name}>
      {({ field, meta, form }) => {
        return (
          <FormControl {...rest}>
            <InputLabel id={name}>{label}</InputLabel>
            <Select
              labelId={name}
              id={name}
              label={label}
              {...rest}
              {...field}
              error={meta.touched && Boolean(meta.error)}
            >
              {options.map((option) => {
                return (
                  <MenuItem key={option.key} value={option.value}>
                    {option.key}
                  </MenuItem>
                );
              })}
            </Select>
            <FormHelperText error={meta.touched && Boolean(meta.error)}>
              {meta.touched ? meta.error : null}
            </FormHelperText>
          </FormControl>
        );
      }}
    </Field>
  );
}

export default SelectMUI;
