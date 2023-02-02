import * as React from "react";
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AdbIcon from "@mui/icons-material/Adb";
import AddIcon from "@mui/icons-material/Add";
import { useSelector, useDispatch } from "react-redux";
import ProfileModal from "../../Shared/Modals/ProfileModal";
import ProjectModal from "../../Shared/Modals/ProjectModal";
import TaskModal from "../../Shared/Modals/TaskModal";
import { LoginSliceActions } from "../../../features/Login/LoginSlice";

const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "Logout"];
const adds = ["Task", "Project", "Department"];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(false);
  const [anchorElUser, setAnchorElUser] = React.useState(false);
  const [anchorElAdd, setAnchorElAdd] = React.useState(false);
  const [openProfile, setOpenProfile] = React.useState(false);
  const [openTask, setOpenTask] = React.useState(false);
  const [openProject, setOpenProject] = React.useState(false);

  const handleOpenProfile = () => setOpenProfile(true);
  const handleCloseProfile = () => setOpenProfile(false);

  const handleOpenTask = () => setOpenTask(true);
  const handleCloseTask = () => setOpenTask(false);

  const handleOpenProject = () => setOpenProject(true);
  const handleCloseProject = () => setOpenProject(false);

  const handleLogout = () => {
    dispatch(LoginSliceActions.logout());
  };

  const { user } = useSelector((state) => state.login);

  const dispatch = useDispatch();

  const handleOpenNavMenu = () => {
    setAnchorElNav(true);
  };
  const handleOpenUserMenu = () => {
    setAnchorElUser(true);
  };
  const handleOpenAddMenu = () => {
    setAnchorElAdd(true);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(false);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(false);
  };
  const handleCloseAddMenu = () => {
    setAnchorElAdd(false);
  };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>

            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {pages.map((page) => (
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0, marginRight: 2 }}>
              <Tooltip title="Add Task/Project/Department">
                <IconButton onClick={handleOpenAddMenu} sx={{ p: 0 }}>
                  <Button
                    variant="contained"
                    color="inherit"
                    endIcon={<AddIcon />}
                  >
                    Add
                  </Button>
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px", mr: "100px" }}
                id="menu-appbar"
                anchorEl={anchorElAdd}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElAdd)}
                onClose={handleCloseAddMenu}
              >
                {adds.map((add) => (
                  <MenuItem key={add} onClick={handleCloseAddMenu}>
                    {add === "Task" ? (
                      <Typography textAlign="center" onClick={handleOpenTask}>
                        {add}
                      </Typography>
                    ) : add === "Project" ? (
                      <Typography
                        textAlign="center"
                        onClick={handleOpenProject}
                      >
                        {add}
                      </Typography>
                    ) : (
                      <Typography textAlign="center">{add}</Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src={user.imgUrl ? user.imgUrl : null}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    {setting === "Profile" ? (
                      <Typography
                        textAlign="center"
                        onClick={handleOpenProfile}
                      >
                        {setting}
                      </Typography>
                    ) : (
                      <Typography textAlign="center" onClick={handleLogout}>
                        {setting}
                      </Typography>
                    )}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <ProfileModal
        openProfile={openProfile}
        handleCloseProfile={handleCloseProfile}
      />
      <TaskModal openTask={openTask} handleCloseTask={handleCloseTask} />
      <ProjectModal
        openProject={openProject}
        handleCloseProject={handleCloseProject}
      />
    </>
  );
}
export default Navbar;
