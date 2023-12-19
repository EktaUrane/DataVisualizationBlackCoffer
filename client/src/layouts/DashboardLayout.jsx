import React from "react";
import ResponsiveDrawer from "../components/ResponisveDrawer"; // Ensure correct path
import { Outlet } from "react-router-dom";
import { styled } from "@mui/material/styles";

const StyledRoot = styled("div")({
  display: "flex",
  minHeight: "100vh",
  overflow: "hidden",
});

const Main = styled("main")(({ theme }) => ({
  flexGrow: 1,
  overflow: "auto",
  minHeight: "100vh",
  paddingTop: theme.spacing(3),
  paddingLeft: theme.spacing(3),
  paddingRight: theme.spacing(3),
  marginTop: "50px"
}));

const DashboardLayout = () => {
  return (
    <StyledRoot>
      <ResponsiveDrawer />
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
};

export default DashboardLayout;
