import React from "react";
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
} from "@mui/material";
import {
  PlusCircle,
  FolderUser,
  Trash,
  PencilLine,
  Eye,
} from "@phosphor-icons/react";
import CustomAddButton from "../../../../components/common/CustomAddButton";
import CustomHeaderTitle from "../../../../components/common/CustomHeaderTitle";

const SectionAdminInventory = () => {
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
          subtitle={"Category Overview"}
        />
        <CustomAddButton
          label={"Add new category"}
          icon={<PlusCircle size={24} color={COLORS.white} weight="duotone" />}
        />
      </Box>
    </>
  );
};

export default SectionAdminInventory;
