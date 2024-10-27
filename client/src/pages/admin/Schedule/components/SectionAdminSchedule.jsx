import { Box } from "@mui/material";
import React from "react";
import usePopup from "../../../../hooks/common/usePopup";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import CustomeAddButton from "../../../../components/common/CustomAddButton";
import { PlusCircle } from "@phosphor-icons/react";
import { COLORS } from "../../../../constants/color";

const SectionAdminSchedule = () => {
  const { isOpen, popupType, openPopup, closePopup, popupData } = usePopup();
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
          title={"Manage Schedules"}
          subtitle={"Organize and Oversee Service Requests"}
        />
        <CustomeAddButton
          onClick={() => openPopup("addNewStore")}
          label={"Add new store"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>
    </>
  );
};

export default SectionAdminSchedule;
