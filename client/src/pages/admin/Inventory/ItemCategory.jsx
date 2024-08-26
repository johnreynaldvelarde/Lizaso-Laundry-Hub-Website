import { Box, Button, Typography } from "@mui/material";
import React, { useState } from "react";
import PopupAddCategory from "./PopupAddCategory";
import Table from "../../../components/common/Table";
import { PlusCircle } from "@phosphor-icons/react";
import {
  categoriesData,
  categoriesItemColumns,
} from "../../../data/columns/inventory";

const ProductCategories = () => {
  const [openPopup, setOpenPopup] = useState(false);

  const handleOpen = () => {
    setOpenPopup(true);
  };

  const handleClose = () => {
    setOpenPopup(false);
  };

  return (
    <Box sx={{ pt: "100px", pb: "20px", pr: "10px", pl: "10px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">Categories</Typography>

        <Button
          variant="contained"
          startIcon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
          sx={{
            backgroundColor: "#5787C8",
            borderRadius: "5px",
            fontWeight: 600,
            textTransform: "none",
            paddingLeft: "23px",
            paddingRight: "23px",
            fontSize: "16px",
            "&:hover": {
              backgroundColor: "#3b5c9f",
            },
          }}
          onClick={handleOpen}
        >
          Add Category
        </Button>
      </Box>
      <PopupAddCategory open={openPopup} onClose={handleClose} />
      <Table
        data={categoriesData}
        fields={categoriesItemColumns}
        numberOfRows={categoriesData.length}
        enableTopToolBar={true}
        enableBottomToolBar={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnFilters={true}
        enableEditing={true}
        enableColumnDragging={true}
      />
    </Box>
  );
};

export default ProductCategories;
