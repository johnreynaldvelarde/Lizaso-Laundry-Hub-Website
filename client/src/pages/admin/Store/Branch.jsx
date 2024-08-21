// import { Box, Button, Typography } from "@mui/material";
// import React from "react";
// import Table from "../../../components/Table";
// import { FiPlus } from "react-icons/fi";
// import { Link } from "react-router-dom";

// import { products, productsColumns } from "../../../data/products";
// import { store, storeColumns } from "../../../data/branchData";

// const Branch = () => {
//   const handleEdit = (row) => {
//     console.log("Editing row:", row);
//   };
//   return (
//     <Box sx={{ pt: "80px", pb: "20px" }}>
//       <Box
//         sx={{
//           display: "flex",
//           alignItems: "center",
//           justifyContent: "space-between",
//           marginBottom: "16px",
//         }}
//       >
//         <Typography variant="h6">Branch Store</Typography>
//         <Link to="/main/add-branch" style={{ textDecoration: "none" }}>
//           <Button
//             variant="contained"
//             color="primary"
//             startIcon={<FiPlus />}
//             sx={{ borderRadius: "20px" }}
//           >
//             Add new store
//           </Button>
//         </Link>
//       </Box>
//       <Table
//         data={store}
//         fields={storeColumns}
//         numberOfRows={products.length}
//         enableTopToolBar={true}
//         enableBottomToolBar={true}
//         enablePagination={true}
//         enableRowSelection={true}
//         enableColumnFilters={true}
//         enableEditing={true}
//         enableColumnDragging={true}
//         showPreview={true}
//         onEdit={handleEdit}
//         routeLink="products"
//       />
//     </Box>
//   );
// };

// export default Branch;

import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";

import Table from "../../../components/common/Table";
import { storeColumns } from "../../../data/storeData";
import { viewStore } from "../../../services/api/admin/branchApi"; // Adjust the import path if needed

const Branch = () => {
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
        fields={storeColumns} // Ensure storeColumns matches your data structure
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
        routeLink="products" // Adjust if necessary
      />
    </Box>
  );
};

export default Branch;
