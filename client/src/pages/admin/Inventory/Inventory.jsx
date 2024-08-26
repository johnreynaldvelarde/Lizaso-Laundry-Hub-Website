import { Box, Button, Typography } from "@mui/material";
import React from "react";
import Table from "../../../components/common/Table";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import { inventoryColumns } from "../../../data/columns/inventory";
import useInventory from "../../../hooks/admin/useInventory";

const Inventory = () => {
  const { inventoryData, loading, error } = useInventory();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

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
        <Link to="/main/add-item" style={{ textDecoration: "none" }}>
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
        data={inventoryData}
        fields={inventoryColumns}
        numberOfRows={inventoryData.length}
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
