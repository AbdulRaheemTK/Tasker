import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import FormikControls from "../../components/Shared/Formik/FormikControls";
import { useDispatch } from "react-redux";
import { signupRequest } from "./SignupSlice";
import {
  Avatar,
  Button,
  CssBaseline,
  Grid,
  Box,
  Typography,
  Container,
  createTheme,
  ThemeProvider,
  Alert,
  Snackbar,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

const theme = createTheme();

function Signup() {
  // let { notification, notificationSeverity } = useSelector(
  //   (state) => state.signup
  // );
  const [notification, setNotification] = useState("");
  const [notificationSeverity, setnotificationSeverity] = useState("");
  const dispatch = useDispatch();

  const departmentOptions = [
    { key: "Select your department", value: "" },
    { key: "Development", value: "development" },
    { key: "Testing", value: "testing" },
    { key: "Marketing", value: "marketing" },
  ];
  const initialValues = {
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
    department: "",
    imgUrl: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email Address!").required("Required!"),
    fullName: yup.string().required("Requiured!"),
    password: yup.string().required("Required!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match")
      .required("Required!"),
    department: yup.string().required("Required!"),
    imgUrl: yup.string(),
  });

  const navigate = useNavigate();

  const onSubmit = async (values) => {
    const user = await dispatch(signupRequest(values));
    console.log("user", user);
    if (user.error) {
      setNotification(user.error.message);
      setnotificationSeverity("error");
    } else {
      setNotification("User Signed Up Successfully!");
      setnotificationSeverity("success");
      navigate("/login", { replace: true });
    }
  };

  const onCloseAlert = () => {
    setNotification("");
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <>
            <Snackbar
              open={notification}
              autoHideDuration={3000}
              onClose={onCloseAlert}
              anchorOrigin={{ vertical: "top", horizontal: "right" }}
            >
              <Alert severity={notificationSeverity} sx={{ width: "100%" }}>
                {notification}
              </Alert>
            </Snackbar>
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
                            variant="filled"
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
                            variant="filled"
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
                            variant="filled"
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
                            variant="filled"
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
                            variant="filled"
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
                          <Link to="/login">
                            Already have an account? Log in
                          </Link>
                        </Grid>
                      </Grid>
                    </Form>
                  </Box>
                </Box>
              </Container>
            </ThemeProvider>
          </>
        );
      }}
    </Formik>
  );
}

export default Signup;
