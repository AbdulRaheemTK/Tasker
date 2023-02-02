import React, { useState } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { Link, useNavigate } from "react-router-dom";
import FormikControls from "../../components/Shared/Formik/FormikControls";
import { loginRequest } from "./LoginSlice";
import { useDispatch } from "react-redux";

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

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // let { notification, notificationSeverity } = useSelector(
  //   (state) => state.login
  // );
  const [notification, setNotification] = useState("");
  const [notificationSeverity, setnotificationSeverity] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email Address!").required("Required!"),
    password: yup.string().required("Required!"),
  });

  const onSubmit = async (values) => {
    const user = await dispatch(loginRequest(values));
    console.log("user", user);
    if (user.error) {
      setNotification(user.error.message);
      setnotificationSeverity("error");
    } else {
      setNotification("User Logged In Successfully!");
      setnotificationSeverity("success");
      navigate("/");
    }
  };

  const onCloseAlert = () => {
    setNotification("");
  };

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
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => {
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
                    Sign In
                  </Typography>{" "}
                  <Box sx={{ mt: 3 }}>
                    <Form>
                      <Grid container spacing={2}>
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
                            variant="filled"
                            fullWidth
                          />
                        </Grid>
                      </Grid>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={!formik.isValid}
                      >
                        Sign In
                      </Button>
                      <Grid container justifyContent="flex-end">
                        <Grid item>
                          <Link to="/signup">
                            Already have an account? Sign up
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
    </>
  );
}

export default Login;
