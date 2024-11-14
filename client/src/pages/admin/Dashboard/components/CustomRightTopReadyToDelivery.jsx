import React, { useCallback, useEffect, useState } from "react";
import { Box, Paper, Typography } from "@mui/material";
import useFetchData from "../../../../hooks/common/useFetchData";
import Chart from "react-apexcharts";
import { COLORS } from "../../../../constants/color";
import CustomActivityLogTable from "../../../../components/common/table/CustomActivityLogTable";
import CustomTableReadyForDelivery from "./table/CustomTableReadyForDelivery";
import { getTableListReadyForDeliveryAndAttemptedDelivery } from "../../../../services/api/getApi";

const CustomRightTopReadyToDelivery = ({ storeId }) => {
  const [loading, setLoading] = useState(true);
  const { data: data, fetchData: fetchListofReadyDelivery } = useFetchData();

  const fetchListofReadyDeliveryData = useCallback(async () => {
    setLoading(true);
    await fetchListofReadyDelivery(
      getTableListReadyForDeliveryAndAttemptedDelivery.getTableListReadyDelivery,
      storeId
    );
    setLoading(false);
  }, [fetchListofReadyDelivery, storeId]);

  useEffect(() => {
    fetchListofReadyDeliveryData();
  }, [fetchListofReadyDeliveryData]);

  return (
    <Paper
      sx={{
        p: 5,
        boxShadow: "none",
        border: 1,
        borderColor: COLORS.border,
        borderRadius: "14px",
      }}
    >
      <Typography fontWeight={600} color={COLORS.primary} fontSize={20}>
        Ready for Delivery
      </Typography>

      <Box mt={5}>
        <CustomTableReadyForDelivery
          tableData={[]}
          loading={loading}
          //   refreshData={}
        />
      </Box>
    </Paper>
  );
};

export default CustomRightTopReadyToDelivery;
