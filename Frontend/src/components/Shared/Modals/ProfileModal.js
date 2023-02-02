import * as yup from "yup";
import { Formik, Form } from "formik";
import FormikControls from "../Formik/FormikControls";
import React from "react";
import {
  Avatar,
  Modal,
  Button,
  Grid,
  Box,
  Typography,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { imageUpload } from "../../../util/imageUpload";
import decodeJWT from "jwt-decode";
import { updateLoggedInUserData } from "../../../features/Login/LoginSlice";
import CloseIcon from "@mui/icons-material/Close";

const ProfileModal = ({ openProfile, handleCloseProfile }) => {
  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    bgcolor: "#E8E2E2",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: "16px",
  };

  const [imgFile, setimgFile] = React.useState({});
  const [newImgUrl, setNewImgUrl] = React.useState("");
  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      setimgFile(file);
      setNewImgUrl(URL.createObjectURL(file));
    }
  };

  const departmentOptions = [
    { key: "Select your department", value: "" },
    { key: "Development", value: "development" },
    { key: "Testing", value: "testing" },
    { key: "Marketing", value: "marketing" },
  ];
  const initialValues = {
    email: user.email,
    fullName: user.fullName,
    department: user.department,
    imgUrl: "",
  };
  const validationSchema = yup.object({
    email: yup.string().email("Invalid Email Address!").required("Required!"),
    fullName: yup.string().required("Requiured!"),
    department: yup.string().required("Required!"),
  });
  const onSubmit = async (values) => {
    let uploadedURL = "";
    if (imgFile) {
      uploadedURL = await imageUpload(imgFile);
      setNewImgUrl(uploadedURL);
    }

    console.log(values, imgFile, uploadedURL);
    const user = decodeJWT(JSON.parse(localStorage.getItem("user")));
    await dispatch(
      updateLoggedInUserData({
        userId: user._id,
        fullName: values.fullName,
        email: values.email,
        department: values.department,
        imgUrl: uploadedURL ? uploadedURL : user.imgUrl,
      })
    );
  };
  return (
    <Modal
      open={openProfile}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box sx={{ display: "flex" }}>
          <Typography
            id="modal-modal-title"
            variant="h4"
            component="h2"
            sx={{ textAlign: "center", flexGrow: 1 }}
          >
            My Profile
          </Typography>
          <IconButton
            color="error"
            aria-label="upload picture"
            onClick={handleCloseProfile}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => {
            return (
              <>
                <Box
                  sx={{
                    marginTop: 2,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="imgUrl"
                          id="imgUrl"
                          label="Upload Image"
                          accept="image/*"
                          type="file"
                          onChange={handleImageUpload}
                          InputProps={{
                            endAdornment: (
                              <Avatar src={newImgUrl ? newImgUrl : null} />
                            ),
                          }}
                          fullWidth
                          variant="standard"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="fullName"
                          id="fullName"
                          label="Full Name"
                          autoComplete="given-name"
                          fullWidth
                          variant="standard"
                          autofocus
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
                          variant="standard"
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
                          variant="standard"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ textAlign: "right" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        sx={{ mt: 3, mb: 2, width: "25%" }}
                        disabled={!formik.isValid}
                      >
                        Update
                      </Button>
                    </Box>
                  </Form>
                </Box>
              </>
            );
          }}
        </Formik>
      </Box>
    </Modal>
  );
};

export default ProfileModal;
