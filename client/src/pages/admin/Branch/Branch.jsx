import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Table from "../../../components/Table";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import { products, productsColumns } from "../../../data/products";
import { store, storeColumns } from "../../../data/branchData";

const Branch = () => {
  const handleEdit = (row) => {
    console.log("Editing row:", row);
  };
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "16px",
        }}
      >
        <Typography variant="h6">Branch Store</Typography>
        <Link to="/main/add-branch" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            sx={{ borderRadius: "20px" }}
          >
            Add new store
          </Button>
        </Link>
      </Box>
      <Table
        data={store}
        fields={storeColumns}
        numberOfRows={products.length}
        enableTopToolBar={true}
        enableBottomToolBar={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnFilters={true}
        enableEditing={true}
        enableColumnDragging={true}
        showPreview={true}
        onEdit={handleEdit}
        routeLink="products"
      />
    </Box>
  );
};

export default Branch;
