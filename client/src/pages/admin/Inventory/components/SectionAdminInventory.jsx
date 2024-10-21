import React, { useCallback, useEffect, useState } from "react";
import { COLORS } from "../../../../constants/color";
import useAuth from "../../../../contexts/AuthContext";
import {
  Box,
  Typography,
  Button,
  Breadcrumbs,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  TablePagination,
  Snackbar,
  Alert,
  Divider,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Menu,
  CircularProgress,
  Tooltip,
  useThemeProps,
} from "@mui/material";
import {
  PlusCircle,
  FolderUser,
  PencilLine,
  Basket,
} from "@phosphor-icons/react";
import CustomAddButton from "../../../../components/common/CustomAddButton";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";
import useFetchData from "../../../../hooks/common/useFetchData";
import { viewCategory, viewInventory } from "../../../../services/api/getApi";
import usePopup from "../../../../hooks/common/usePopup";
import PopAddCategory from "./PopAddCategory";
import PopAddNewItem from "./PopAddNewItem";
import { inventoryColumns } from "../../../../data/columns/inventory";
import CustomTable from "../../../../components/common/CustomTable";
import InventoryCustomTable from "../../../../components/common/InventoryCustomTable";

const SectionAdminInventory = () => {
  const { userDetails } = useAuth();
  const [loading, setLoading] = useState(true);
  const { isOpen, popupType, openPopup, closePopup } = usePopup();

  const { data: categoryData, fetchData: fetchCategory } = useFetchData();
  const { data: inventoryData = [], fetchData: fetchInventory } =
    useFetchData();

  const fetchCategoryData = useCallback(() => {
    fetchCategory(viewCategory.getViewCategoryList, userDetails.storeId);
  }, [fetchCategory, userDetails?.storeId]);

  const fetchInventoryData = useCallback(() => {
    setLoading(true);
    fetchInventory(
      viewInventory.getViewInventoryList,
      userDetails.storeId
    ).then(() => {
      setLoading(false);
    });
  }, [fetchInventory, userDetails?.storeId]);

  useEffect(() => {
    fetchCategoryData();
    fetchInventoryData();

    // const intervalId = setInterval(() => {
    //   fetchCategoryData();
    //   fetchInventoryData();
    // }, 10000);

    // return () => {
    //   clearInterval(intervalId);
    // };
  }, [fetchCategoryData, fetchInventoryData]);

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
          title={"Inventory Management"}
          subtitle={"All Categories & Item Availability"}
        />
        <CustomAddButton
          onClick={() => openPopup("addCategory")}
          label={"Add new category"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>
      {/*Categories */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
            xl: "repeat(4, 1fr)",
          },
          gap: "20px",
        }}
      >
        {categoryData.map((category) => (
          <Box
            key={category.category_id}
            sx={{
              border: `1px solid ${COLORS.border2}`,
              borderRadius: "8px",
              padding: "30px",
              position: "relative",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              backgroundColor: COLORS.white,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
              width="100%"
            >
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  sx={{
                    borderRadius: "5px",
                    padding: "4px",
                    backgroundColor: COLORS.secondary,
                  }}
                >
                  <Basket size={40} color="white" weight="duotone" />
                </Box>
                <Typography
                  variant="body1"
                  sx={{
                    fontSize: { xs: "18px", md: "20px" },
                    fontWeight: 700,
                    marginLeft: "8px",
                    color: COLORS.primary,
                  }}
                >
                  {category.category_name}
                </Typography>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginLeft: "auto",
                  marginRight: "8px",
                }}
              >
                <Box
                  sx={{
                    border: `2px solid ${COLORS.secondary}`,
                    borderRadius: "50%",
                    padding: "8px",
                    fontWeight: 600,
                    color: COLORS.secondary,
                    fontSize: { xs: "16px", md: "18px" },
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: "40px",
                    height: "40px",
                  }}
                >
                  {category.number_of_items}
                </Box>

                <Typography
                  sx={{
                    fontSize: { xs: "14px", md: "12px" },
                    fontWeight: 500,
                    color: COLORS.secondary,
                    marginTop: "4px",
                  }}
                >
                  Number of Items
                </Typography>
              </Box>
            </Box>

            <Button
              variant="outlined"
              sx={{
                marginTop: 3,
                padding: 1,
                textTransform: "none",
                color: COLORS.primary,
                fontWeight: 600,
                borderColor: COLORS.border,
                "&:hover": {
                  borderColor: COLORS.secondary,
                  color: COLORS.secondary,
                  backgroundColor: COLORS.secondaryLight,
                },
              }}
            >
              <PencilLine size={24} weight="duotone" className="mr-1" />
              Edit Category
            </Button>
          </Box>
        ))}
      </Box>

      {/*Table List Items */}
      <Box mt={5}>
        {/* Table Header */}
        <Box
          className="flex items-center justify-between mb-"
          sx={{
            flexDirection: {
              xs: "column",
              sm: "row",
            },
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginRight: 2, color: COLORS.text, fontWeight: 600 }}
          >
            All Inventory Items
          </Typography>

          <Box
            className="flex items-center"
            sx={{
              width: {
                xs: "100%",
                sm: "auto",
              },
              flexDirection: {
                xs: "column",
                sm: "row",
              },
              "& button": {
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              },
            }}
          >
            {/* <CustomAddButton
              onClick={() => openPopup("addItem")}
              label={"Add new item"}
              icon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
            /> */}
            <CustomAddButton
              onClick={() => openPopup("addItem")}
              label={"Add new item"}
              icon={<PlusCircle size={24} color="#fcfcfc" weight="duotone" />}
            />
          </Box>
        </Box>

        {/* Table */}
        <Box mt={2}>
          {loading ? (
            <CircularProgress />
          ) : inventoryData.length > 0 ? (
            <InventoryCustomTable
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
          ) : (
            <p>No data available.</p> // Message for no data
          )}
        </Box>
      </Box>

      {/* Popup */}
      {isOpen && popupType === "addCategory" && (
        <PopAddCategory open={isOpen} onClose={closePopup} />
      )}
      {isOpen && popupType === "addItem" && (
        <PopAddNewItem open={isOpen} onClose={closePopup} data={categoryData} />
      )}
    </>
  );
};

export default SectionAdminInventory;

// const fetchInventoryData = useCallback(() => {
//   fetchInventory(viewInventory.getViewInventoryList, userDetails.storeId);
// }, [fetchInventory, userDetails?.storeId]);

{
  /* {loading ? ( // Conditional rendering for loading state
            <CircularProgress />
          ) : (
            <CustomTable
              data={inventoryData} // Pass the inventory data to the CustomTable
              fields={inventoryColumns} // Ensure inventoryColumns is defined
              numberOfRows={inventoryData.length} // Pass the number of rows
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
          )} */
}
{
  /* <CustomTable
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
          /> */
}

// const [inventory, setInventory] = useState([
//   {
//     inventory_id: 1,
//     store_id: 101,
//     item_id: 201,
//     category_name: "Laundry Detergent",
//     item_name: "Tide Pods",
//     price: "15.00",
//     quantity: 50,
//     isStatus: 1,
//   },
//   {
//     inventory_id: 2,
//     store_id: 102,
//     item_id: 202,
//     category_name: "Fabric Softener",
//     item_name: "Downy Liquid",
//     price: "8.50",
//     quantity: 30,
//     isStatus: 1,
//   },
//   {
//     inventory_id: 3,
//     store_id: 103,
//     item_id: 203,
//     category_name: "Bleach",
//     item_name: "Clorox",
//     price: "12.00",
//     quantity: 20,
//     isStatus: 1,
//   },
//   {
//     inventory_id: 4,
//     store_id: 101,
//     item_id: 204,
//     category_name: "Stain Remover",
//     item_name: "OxiClean",
//     price: "10.00",
//     quantity: 15,
//     isStatus: 0,
//   },
//   {
//     inventory_id: 5,
//     store_id: 102,
//     item_id: 205,
//     category_name: "Laundry Detergent",
//     item_name: "Ariel Powder",
//     price: "9.50",
//     quantity: 40,
//     isStatus: 1,
//   },
//   {
//     inventory_id: 6,
//     store_id: 103,
//     item_id: 206,
//     category_name: "Dryer Sheets",
//     item_name: "Bounce Dryer Sheets",
//     price: "5.00",
//     quantity: 100,
//     isStatus: 1,
//   },
// ]);
