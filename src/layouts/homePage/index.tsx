import { styled } from "@mui/material/styles";
import Loader from "Components/common/Loader";
import BottomMenu from "layouts/BottomMenu";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
const RootStyle = styled("div")({
  display: "flex",
  maxHeight: "100vh",
  overflow: "hidden",
});

const HomePage = () => {
  return (
    <RootStyle>
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
      <BottomMenu />
    </RootStyle>
  );
};

export default HomePage;
