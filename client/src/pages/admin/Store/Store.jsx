import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import Table from "../../../components/common/Table";
import { storeColumns } from "../../../data/storeData";
import { viewStore } from "../../../services/api/getApi";

const Store = () => {
  const [storeData, setStoreData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch store data when the component mounts
  useEffect(() => {
    const fetchStoreData = async () => {
      try {
        const response = await viewStore.getStoreList({});
        setStoreData(response.data); // Adjust if the data structure is different
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

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
