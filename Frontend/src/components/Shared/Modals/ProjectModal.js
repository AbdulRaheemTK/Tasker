import * as yup from "yup";
import { Formik, Form } from "formik";
import FormikControls from "../../../components/Shared/Formik/FormikControls";
import React, { useEffect } from "react";
import {
  Avatar,
  Modal,
  Button,
  Grid,
  Box,
  Typography,
  List,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import ListItemComponent from "../ListItemComponent";
import {
  addProject,
  getProjects,
} from "../../../features/Project/ProjectSlice";
import Close from "@mui/icons-material/Close";

const ProjectModal = ({ openProject, handleCloseProject }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "40%",
    height: "90vh",
    bgcolor: "#E8E2E2",
    border: "2px solid #000",
    boxShadow: 24,
    p: 2,
    borderRadius: "16px",
  };

  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.login);
  const { users } = useSelector((state) => state.home);

  const { newProject, projects } = useSelector((state) => state.project);

  const usersOptions = users.map((user) => {
    return { key: user.fullName, value: user._id };
  });

  const getProjectsDataAPI = async () => {
    await dispatch(getProjects());
  };

  useEffect(() => {
    getProjectsDataAPI();
  }, [newProject, loggedUser]);

  const initialValues = {
    projectName: "",
    allocatedTo: "",
    dueDate: "",
  };

  const validationSchema = yup.object({
    projectName: yup.string().required("Required!"),
    allocatedTo: yup.string().required("Required"),
    dueDate: yup.date().required("Required"),
  });

  const onSubmit = async (values) => {
    dispatch(addProject(values));
  };
  return (
    <Modal
      open={openProject}
      onClose={handleCloseProject}
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
            New Project
          </Typography>
          <IconButton
            color="error"
            aria-label="Close button"
            onClick={handleCloseProject}
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
                  }}
                >
                  <Form>
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormikControls
                          control="TextField"
                          name="projectName"
                          id="projectName"
                          label="Project Name"
                          type="text"
                          fullWidth
                          variant="filled"
                          size="small"
                          autoFocus
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControls
                          control="Select"
                          name="allocatedTo"
                          id="allocatedTo"
                          label="For"
                          fullWidth
                          options={usersOptions}
                          variant="filled"
                          size="small"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormikControls
                          control="TextField"
                          name="dueDate"
                          id="dueDate"
                          label="Due Date"
                          type="date"
                          fullWidth
                          variant="filled"
                          size="small"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ textAlign: "right" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="success"
                        size="small"
                        sx={{ mt: 1, mb: 1, width: "25%" }}
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

        <List
          sx={{
            bgcolor: "lightgray",
            borderRadius: "10px",
            padding: "10px",
          }}
        >
          {projects.slice(0, 3).map((project) => {
            return (
              <ListItemComponent
                avatarSource={project.allocatedTo.imgUrl}
                primaryText={project.projectName}
                secondaryText={project.allocatedTo.fullName}
                subSecondaryText={project.dueDate}
              />
            );
          })}
        </List>
      </Box>
    </Modal>
  );
};

export default ProjectModal;
