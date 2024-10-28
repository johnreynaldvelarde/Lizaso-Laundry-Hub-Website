import React from "react";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import CustomAddButton from "../../../../components/common/CustomAddButton";
import { COLORS } from "../../../../constants/color";
import { PlusCircle } from "@phosphor-icons/react";
import { Box } from "@mui/material";

const SectionAdminCustomers = () => {
  return (
    <>
      {/* Header */}
      <Box
        className="flex items-center justify-between mb-8"
        sx={{
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "center", sm: "flex-start" },
          width: "100%",
        }}
      >
        <CustomHeaderTitle
          title={"Customer Management"}
          subtitle={"Overview of All Customer Accounts and Activities"}
        />
        <CustomAddButton
          onClick={() => openPopup("addCategory")}
          label={"Add new customer"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>
    </>
  );
};

export default SectionAdminCustomers;
