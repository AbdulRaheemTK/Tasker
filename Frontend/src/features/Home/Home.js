import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Navbar from "../../components/Layout/Navigation/Navbar";
import { getUsersData } from "./HomeSlice";
import { getProjects } from "../Project/ProjectSlice";

const Home = () => {
  const dispatch = useDispatch();

  const getUsersDataAPI = async () => {
    await dispatch(getUsersData());
  };

  const getProjectsDataAPI = async () => {
    await dispatch(getProjects());
  };

  useEffect(() => {
    getUsersDataAPI();
    getProjectsDataAPI();
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
};

export default Home;
