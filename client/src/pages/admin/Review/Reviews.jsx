import React from "react";
import { Box } from "@mui/material";
import useAuth from "../../../contexts/AuthContext";
import AccessDenied from "../../../components/pages/AccessDenied";
import SectionAdminReview from "./components/SectionAdminReview";

const Reviews = () => {
  const { userDetails } = useAuth();
  return (
    <Box sx={{ pt: "100px", pb: "20px", px: "20px" }}>
      {userDetails?.roleName === "Administrator" ? (
        <SectionAdminReview storeId={userDetails.storeId} />
      ) : userDetails?.roleName === "Manager" ? (
        <AccessDenied />
      ) : (
        <AccessDenied />
      )}
    </Box>
  );
};

export default Reviews;
