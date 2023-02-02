import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import FormikControls from "./FormikControls";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme();

function FormikContainer() {
  const departmentOptions = [
    { key: "Select your department", value: "" },
    { key: "Development", value: "development" },
    { key: "Testing", value: "testing" },
    { key: "Marketing", value: "marketing" },
  ];

  const radioOptions = [
    { label: "Male", value: "M" },
    { label: "Female", value: "F" },
    { label: "Others", value: "O" },
  ];
  const initialValues = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    department: "",
    imgUrl: "",
    description: "",
    gender: "",
    tnc: false,
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email Address!").required("Required!"),
    fullName: yup.string().required("Requiured!"),
    password: yup.string().required("Required"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required("Required"),
    department: yup.string().required("Required!"),
    imgUrl: yup.string(),
    description: yup
      .string()
      .required("Required!")
      .min(10, "Description must be atleast 10 characters long")
      .max(200, "Description can be 200 characters long only!"),
    gender: yup.string().required("Required!"),
    tnc: yup.boolean().oneOf([true], "You must accept Terms and  Conditions!"),
  });

  const onSubmit = (values) => {
    console.log("Form data", values);
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        console.log(formik);
        return (
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                  Sign up
                </Typography>{" "}
                <Box sx={{ mt: 3 }}>
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="fullName"
                          id="fullName"
                          label="Full Name"
                          autoComplete="given-name"
                          fullWidth
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="email"
                          id="email"
                          label="Email Address"
                          type="email"
                          autoComplete="email"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="password"
                          id="password"
                          label="Password"
                          type="password"
                          autoComplete="password"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="confirmPassword"
                          id="confirmPassword"
                          type="password"
                          label="Confirm Password"
                          autoComplete="confirmPassword"
                          fullWidth
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="RadioButtonGroup"
                          name="gender"
                          id="gender"
                          label="Gender"
                          options={radioOptions}
                          fullWidth
                          row
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="Select"
                          name="department"
                          id="department"
                          label="Department"
                          fullWidth
                          options={departmentOptions}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="description"
                          id="description"
                          label="Description"
                          fullWidth
                          //use multiline for textArea
                          multiline
                          minRows={3}
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="CheckBox"
                          name="tnc"
                          id="tnc"
                          label="I accept the terms and conditions"
                          fullWidth
                        />
                      </Grid>
                      {/* <Grid item xs={12}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              value="allowExtraEmails"
                              color="primary"
                            />
                          }
                          label="I want to receive inspiration, marketing promotions and updates via email."
                        />
                      </Grid> */}
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!formik.isValid}
                    >
                      Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                      <Grid item>
                        <Link href="#" variant="body2">
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        );
      }}
    </Formik>
  );
}

export default FormikContainer;
