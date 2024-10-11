import React, { useCallback, useEffect } from "react";
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
import {
  viewCategory,
  viewInventory,
  viewRolesAndPermissions,
} from "../../../../services/api/getApi";
import usePopup from "../../../../hooks/common/usePopup";
import PopAddCategory from "./PopAddCategory";
import PopAddNewItem from "./PopAddNewItem";

const SectionAdminInventory = () => {
  const { userDetails } = useAuth();
  const { isOpen, popupType, openPopup, closePopup } = usePopup();

  const { data: categoryData, fetchData: fetchCategory } = useFetchData();
  const { data: inventoryData, fetchData: fetchInventory } = useFetchData();

  const fetchCategoryData = useCallback(() => {
    fetchCategory(viewCategory.getViewCategoryList, userDetails.storeId);
  }, [fetchCategory, userDetails?.storeId]);

  const fetchInventoryData = useCallback(() => {
    fetchInventory(viewInventory.getViewInventoryList, userDetails.storeId);
  }, [fetchInventory, userDetails?.storeId]);

  useEffect(() => {
    fetchCategoryData();
    fetchInventoryData();

    const intervalId = setInterval(() => {
      fetchCategoryData();
      fetchInventoryData;
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
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
          {/* Title */}
          <Typography variant="h6" sx={{ marginRight: 2 }}>
            All Users
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
            <Box
              className="flex items-center"
              sx={{
                width: {
                  xs: "100%",
                  sm: "auto",
                },
                marginBottom: {
                  xs: 2,
                  sm: 0,
                },
              }}
            >
              <FormControl sx={{ minWidth: 200 }} size="small" fullWidth>
                <InputLabel id="role-select-label">Filter by Role</InputLabel>
                <Select
                  labelId="role-select-label"
                  id="role-select"
                  label="Filter by Role"
                  defaultValue=""
                >
                  <MenuItem value="">
                    <em>All</em>
                  </MenuItem>
                  {/* {roles.map((role) => (
                    <MenuItem key={role.id} value={role.id}>
                      {role.role_name}
                    </MenuItem>
                  ))}*/}
                </Select>
              </FormControl>
            </Box>
            <Button
              variant="contained"
              disableElevation
              sx={{
                marginLeft: { sm: 2 },
                backgroundColor: COLORS.error,
                borderRadius: "5px",
                fontWeight: 500,
                textTransform: "none",
                paddingX: { xs: 1, sm: 2, md: 3 },
                fontSize: { xs: "14px", sm: "14px", md: "16px" },
                "&:hover": {
                  backgroundColor: COLORS.errorHover,
                },
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 0, sm: 0 },
              }}
            >
              Delete Selected
            </Button>
            <Button
              variant="contained"
              startIcon={
                <PlusCircle size={24} color="#fcfcfc" weight="duotone" />
              }
              sx={{
                marginLeft: { sm: 2 },
                backgroundColor: COLORS.secondary,
                borderRadius: "5px",
                fontWeight: 500,
                textTransform: "none",
                paddingX: { xs: 1, sm: 2, md: 3 },
                fontSize: { xs: "14px", sm: "14px", md: "16px" },
                "&:hover": {
                  backgroundColor: COLORS.secondaryHover,
                },
                width: { xs: "100%", sm: "auto" },
                mt: { xs: 0, sm: 0 },
              }}
            >
              Add new user
            </Button>
          </Box>
        </Box>

        {/* Table */}
      </Box>

      {/* Popup */}
      {isOpen && popupType === "addCategory" && (
        <PopAddCategory open={isOpen} onClose={closePopup} />
      )}
      {isOpen && popupType === "addItem" && (
        <PopAddNewItem open={isOpen} onClose={closePopup} />
      )}
    </>
  );
};

export default SectionAdminInventory;
