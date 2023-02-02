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
import { useSelector } from "react-redux";
import Close from "@mui/icons-material/Close";

const TaskModal = ({ openTask, handleCloseTask }) => {
  const { email, fullName, imgUrl, department } = useSelector(
    (state) => state.login
  );

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

  const departmentOptions = [
    { key: "Select your department", value: "" },
    { key: "Development", value: "development" },
    { key: "Testing", value: "testing" },
    { key: "Marketing", value: "marketing" },
  ];
  const initialValues = {
    taskName: "",
    videoCall: false,
    allocatedTo: "",
    project: "",
    description: "",
    date: "",
  };

  const validationSchema = yup.object({
    taskName: yup.string().required("Required!"),
    videoCall: yup.boolean(),
    allocatedTo: yup.string().required("Required"),
    project: yup.string().required("Required"),
    description: yup.string().required("Required"),
    date: yup.date().required("Required"),
  });

  const onSubmit = async (values) => {
    console.log(values);
  };
  return (
    <Modal
      open={openTask}
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
            New Task
          </Typography>
          <IconButton
            color="error"
            aria-label="Close button"
            onClick={handleCloseTask}
          >
            <Close />
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
                      <Grid item xs={8}>
                        <FormikControls
                          control="TextField"
                          name="taskName"
                          id="taskName"
                          label="Task Name"
                          type="text"
                          fullWidth
                          variant="filled"
                          size="small"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={4} marginTop="5px">
                        <FormikControls
                          control="CheckBox"
                          name="videoCall"
                          id="videoCall"
                          label="Video Call"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControls
                          control="Select"
                          name="allocatedTo"
                          id="allocatedTo"
                          label="For"
                          fullWidth
                          options={departmentOptions}
                          variant="filled"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControls
                          control="Select"
                          name="project"
                          id="project"
                          label="Project"
                          fullWidth
                          options={departmentOptions}
                          variant="filled"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="description"
                          id="description"
                          label="Description"
                          type="text"
                          multiline
                          rows={4}
                          fullWidth
                          size="small"
                          variant="filled"
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="date"
                          id="date"
                          label="Date"
                          type="date"
                          fullWidth
                          size="small"
                          variant="filled"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ textAlign: "right" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mt: 3, mb: 1, width: "25%" }}
                        disabled={!formik.isValid}
                      >
                        Add
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

export default TaskModal;
