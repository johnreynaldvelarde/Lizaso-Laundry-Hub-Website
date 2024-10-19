import React, { useCallback, useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import {
  Grid,
  TextField,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Divider,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import CustomPopHeaderTitle from "../../../../components/common/CustomPopHeaderTitle";
import CustomPopFooterButton from "../../../../components/common/CustomPopFooterButton";
import { COLORS } from "../../../../constants/color";
import useFetchData from "../../../../hooks/common/useFetchData";
import { getCalculatedTransaction } from "../../../../services/api/getApi";
import logo from "../../../../assets/images/logo.png";

const PopOnlineTransaction = ({ open, onClose, data }) => {
  const [customerName, setCustomerName] = useState("");
  const [customerNumber, setCustomerNumber] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const { data: transactionData, fetchData: fetchCalculatedTransaction } =
    useFetchData();

  const fetchCalculatedTransactionData = useCallback(() => {
    fetchCalculatedTransaction(
      getCalculatedTransaction.getTransaction,
      data.id
    );
  }, [fetchCalculatedTransaction, data.id]);

  useEffect(() => {
    if (open) {
      fetchCalculatedTransactionData();
      setCustomerName(data.customer_fullname);
      setServiceType(data.service_name);
      setPaymentMethod(data.payment_method);
    }
  }, [open, fetchCalculatedTransactionData]);

  const handleSubmit = () => {
    setLoading(true);
    setLoading(false);
  };

  const renderReceiptItems = () => {
    const { related_items } = transactionData?.data || {};
    const itemIds = related_items?.item_ids || [];
    const itemPrices = related_items?.item_prices || [];
    const quantities = related_items?.quantities || [];

    return itemIds.map((itemId, index) => (
      <ListItem key={itemId}>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <ListItemText primary={`Item ${itemId}`} />
          </Grid>
          <Grid item xs={3}>
            <ListItemText primary={`Qty: ${quantities[index]}`} />
          </Grid>
          <Grid item xs={2}>
            <ListItemText primary={`$${itemPrices[index]}`} />
          </Grid>
          <Grid item xs={3}>
            <ListItemText
              primary={`$${related_items.related_item_totals[index]}`}
            />
          </Grid>
        </Grid>
      </ListItem>
    ));
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      <CustomPopHeaderTitle
        title={"Billing Information"}
        subtitle={"Provide the required information"}
        onClose={onClose}
      />

      <DialogContent>
        <Grid container spacing={2}>
          {/* Left Column */}
          <Grid item xs={12} md={6}>
            <Box sx={{ mt: 5 }}>
              <TextField
                fullWidth
                margin="dense"
                label="Customer Name"
                type="text"
                variant="outlined"
                value={customerName}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: COLORS.secondary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: COLORS.secondary,
                  },
                }}
              />
              <TextField
                fullWidth
                margin="dense"
                label="Service Type"
                type="text"
                variant="outlined"
                value={serviceType}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  mt: 3,
                  "& .MuiOutlinedInput-root": {
                    "&.Mui-focused fieldset": {
                      borderColor: COLORS.secondary,
                    },
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: COLORS.secondary,
                  },
                }}
              />
            </Box>
          </Grid>

          {/* Right Column */}
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                padding: 2,
                boxShadow: "none !important",
                borderRadius: "10px",
                borderStyle: "solid",
                borderWidth: "2px",
                borderColor: COLORS.border,
              }}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={2}
              >
                <Box>
                  <img
                    src={logo}
                    alt="Lizaso Laundry Logo"
                    style={{ width: 50, height: 50 }}
                  />
                </Box>

                {/* Laundry Hub Text */}
                <Typography variant="h6" sx={{ mt: 1 }}>
                  <Box
                    component="span"
                    sx={{ mr: "5px", fontWeight: 700, color: COLORS.secondary }}
                  >
                    Lizaso
                  </Box>
                  <Box
                    component="span"
                    sx={{ fontWeight: 600, color: COLORS.primary }}
                  >
                    Laundry Hub
                  </Box>
                </Typography>
              </Box>

              <Divider sx={{ mb: 2 }} />

              <Typography variant="subtitle2">
                Customer: {"John Doe"}
              </Typography>
              <Typography variant="subtitle2">
                Phone: {"(123) 456-7890"}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <List>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{
                          color: COLORS.text,
                          fontWeight: 700,
                        }}
                      >
                        Service Type
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{
                          color: COLORS.text,
                          fontWeight: 700,
                        }}
                      >
                        Weight
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        variant="subtitle1"
                        align="center"
                        sx={{
                          color: COLORS.text,
                          fontWeight: 700,
                        }}
                      >
                        Amount
                      </Typography>
                    </Grid>
                  </Grid>
                  <Divider sx={{ my: 1 }} />
                  <Grid container spacing={2} sx={{ my: 1 }}>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{ color: COLORS.primary, fontWeight: 500 }}
                      >
                        {serviceType}
                      </Typography>
                      {/* New Box for Base Price */}
                      <Box
                        sx={{
                          borderRadius: "8px",
                          textAlign: "center",
                        }}
                      >
                        <Typography
                          align="center"
                          sx={{
                            color: COLORS.secondary,
                            fontWeight: 500,
                            fontSize: 10,
                          }}
                        >
                          Base Price: {data.default_price}
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{ color: COLORS.primary, fontWeight: 500 }}
                      >
                        {transactionData.weight}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{ color: COLORS.primary, fontWeight: 500 }}
                      >{`₱${transactionData.base_total_amount}`}</Typography>
                    </Grid>
                  </Grid>
                </List>
              </Box>

              <Divider />
              {/* Related Items Section */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  align="center"
                  sx={{ fontSize: 18, fontWeight: 600, color: COLORS.primary }}
                >
                  Related Items
                </Typography>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      sx={{
                        color: COLORS.text,
                        fontWeight: 700,
                      }}
                    >
                      Item Name
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      sx={{
                        color: COLORS.text,
                        fontWeight: 700,
                      }}
                    >
                      Quantity
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      sx={{
                        color: COLORS.text,
                        fontWeight: 700,
                      }}
                    >
                      Amount
                    </Typography>
                  </Grid>

                  {/* Check if related_items exists before mapping */}
                  {transactionData.related_items &&
                  transactionData.related_items.item_ids &&
                  transactionData.related_items.item_ids.length > 0 ? (
                    transactionData.related_items.item_ids.map(
                      (itemId, index) => (
                        <React.Fragment key={itemId}>
                          <Grid item xs={4}>
                            <Typography
                              align="center"
                              sx={{ color: COLORS.primary, fontWeight: 500 }}
                            >
                              Item {itemId}
                            </Typography>
                            <Box
                              sx={{
                                borderRadius: "8px",
                                textAlign: "center",
                              }}
                            >
                              <Typography
                                align="center"
                                sx={{
                                  color: COLORS.secondary,
                                  fontWeight: 500,
                                  fontSize: 10,
                                }}
                              >
                                Price: {data.default_price}
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              align="center"
                              sx={{ color: COLORS.primary, fontWeight: 500 }}
                            >
                              {transactionData.related_items.quantities[index]}
                            </Typography>
                          </Grid>
                          <Grid
                            item
                            xs={4}
                            sx={{ color: COLORS.primary, fontWeight: 500 }}
                          >
                            <Typography align="center">{`₱${transactionData.related_items.related_item_totals[index]}`}</Typography>
                          </Grid>
                        </React.Fragment>
                      )
                    )
                  ) : (
                    <Grid item xs={12}>
                      <Typography align="center">
                        No related items available
                      </Typography>
                    </Grid>
                  )}
                </Grid>
              </Box>

              <Divider />
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" align="center">
                  <span style={{ color: COLORS.secondary, fontWeight: 700 }}>
                    Total Amount:{" "}
                  </span>
                  <span
                    style={{ color: COLORS.primary, fontWeight: 700 }}
                  >{`₱${transactionData.final_total}`}</span>
                </Typography>
              </Box>

              <Typography
                align="center"
                sx={{
                  padding: 1,
                  fontSize: 12,
                  borderRadius: 20,
                  mt: 3,
                  color: COLORS.white,
                  backgroundColor: COLORS.secondary,
                }}
              >
                Thank you for your business!
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </DialogContent>

      <CustomPopFooterButton
        label={"Complete Transaction"}
        onClose={onClose}
        onClick={handleSubmit}
        loading={loading}
      />
    </Dialog>
  );
};

export default PopOnlineTransaction;

{
  /* <List>
                <ListItem>
                  <ListItemText
                    primary={"Service Type"}
                    secondary={`$${"0.00"}`}
                  />
                </ListItem>

                <ListItem>
                  <ListItemText
                    primary="Weight"
                    secondary={transactionData.weight}
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />
               
              </List> */
}
