import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import Table from "../../../components/common/Table";
import { storeColumns } from "../../../data/columns/stores";

import useStore from "../../../hooks/admin/useStore";

const Store = () => {
  const { storeData, loading, error, fetchStoreData } = useStore();

  // Fetch store data when the component mounts
  useEffect(() => {
    fetchStoreData();
  }, []);

  const handleEdit = (row) => {
    console.log("Editing row:", row);
  };

  // Handle loading and error states
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
        <Typography variant="h6">Branch Store</Typography>
        <Link to="/main/add-store" style={{ textDecoration: "none" }}>
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
        data={storeData}
        fields={storeColumns}
        numberOfRows={storeData.length}
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

export default Store;
