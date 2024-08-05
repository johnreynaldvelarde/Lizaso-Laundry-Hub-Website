import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Table from "../../../components/Table";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import { products, productsColumns } from "../../../data/products";

const Inventory = () => {
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
        <Typography variant="h6">All Items</Typography>
        <Link to="/products/add" style={{ textDecoration: "none" }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<FiPlus />}
            sx={{ borderRadius: "20px" }}
          >
            Add Items
          </Button>
        </Link>
      </Box>
      <Table
        data={products}
        fields={productsColumns}
        numberOfRows={products.length}
        enableTopToolBar={true}
        enableBottomToolBar={true}
        enablePagination={true}
        enableRowSelection={true}
        enableColumnFilters={true}
        enableEditing={true}
        enableColumnDragging={true}
        showPreview={true}
        routeLink="products"
      />
    </Box>
  );
};

export default Inventory;
