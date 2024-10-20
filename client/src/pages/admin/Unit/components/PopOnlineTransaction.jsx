import React, { useCallback, useEffect, useState, useRef } from "react";
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
import { transactionDate, transactionTime } from "./unit_helpers";
import { createNewTransactionOnline } from "../../../../services/api/postApi";
import toast from "react-hot-toast";
import { generatePDF } from "../../../../utils/method";

const PopOnlineTransaction = ({ open, onClose, data }) => {
  const rightColumnRef = useRef();
  const [selectedId, setSelectedId] = useState("");
  const [customerName, setCustomerName] = useState("");
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
      setSelectedId(data.id);
      setCustomerName(data.customer_fullname);
      setServiceType(data.service_name);
      setPaymentMethod(data.payment_method);
    }
  }, [open, fetchCalculatedTransactionData]);

  const handleSubmitTransactionOnline = async () => {
    setLoading(true);
    const data = {
      transaction_code: transactionData.transaction_id,
      assignment_id: selectedId,
      total_amount: transactionData.final_total,
      payment_method: paymentMethod,
    };

    try {
      const response = await createNewTransactionOnline.setTransactionOnline(
        data
      );

      if (response.success) {
        toast.success(response.message);
        onClose();
        // generatePDF(rightColumnRef);
      } else {
        toast.error("Transaction failed");
      }
    } catch (error) {
      toast.error(
        `Error posting new transaction: ${
          error.message || "Something went wrong"
        }`
      );
    } finally {
      setLoading(false);
    }
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
              ref={rightColumnRef}
            >
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                mb={1}
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

              <Box
                sx={{
                  padding: "16px",
                  borderRadius: "8px",
                  border: 1,
                  borderColor: COLORS.border,
                }}
              >
                <Box sx={{ mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: COLORS.text,
                      fontWeight: 600,
                    }}
                  >
                    Transaction Code:
                    <span
                      style={{
                        color: COLORS.primary,
                        fontWeight: 500,
                        marginLeft: "8px",
                      }}
                    >
                      #{transactionData.transaction_id}
                    </span>
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: COLORS.text,
                      fontWeight: 600,
                    }}
                  >
                    Customer Name:
                    <span
                      style={{
                        color: COLORS.primary,
                        fontWeight: 500,
                        marginLeft: "8px",
                      }}
                    >
                      {customerName}
                    </span>
                  </Typography>
                </Box>

                <Box sx={{ mb: 1 }}>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: COLORS.text,
                      fontWeight: 600,
                    }}
                  >
                    Payment Method:
                    <span
                      style={{
                        color: COLORS.primary,
                        fontWeight: 500,
                        marginLeft: "8px",
                      }}
                    >
                      {paymentMethod}
                    </span>
                  </Typography>
                </Box>

                <Box>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: COLORS.text,
                      fontWeight: 600,
                    }}
                  >
                    Date:
                    <span
                      style={{
                        color: COLORS.primary,
                        fontWeight: 500,
                        marginLeft: "8px",
                      }}
                    >
                      {`${transactionDate}, ${transactionTime}`}
                    </span>
                  </Typography>
                </Box>
              </Box>

              <Box sx={{ mt: 1 }}>
                <List>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{
                          fontSize: 15,
                          color: COLORS.text,
                          fontWeight: 700,
                        }}
                      >
                        Service Type
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{
                          fontSize: 15,
                          color: COLORS.text,
                          fontWeight: 700,
                        }}
                      >
                        Weight
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{
                          fontSize: 15,
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
                        sx={{
                          fontSize: 13,
                          color: COLORS.primary,
                          fontWeight: 500,
                        }}
                      >
                        {serviceType}
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
                            fontWeight: 600,
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
                        sx={{
                          fontSize: 13,
                          color: COLORS.primary,
                          fontWeight: 500,
                        }}
                      >
                        {transactionData.weight}kg
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography
                        align="center"
                        sx={{
                          fontSize: 13,
                          color: COLORS.primary,
                          fontWeight: 500,
                        }}
                      >{`₱${transactionData.base_total_amount}`}</Typography>

                      {transactionData.discount_applied && (
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
                              fontWeight: 600,
                              fontSize: 10,
                            }}
                          >
                            {transactionData.discount_applied}
                          </Typography>
                        </Box>
                      )}
                    </Grid>
                  </Grid>
                </List>
              </Box>

              <Divider />
              {/* Related Items Section */}
              <Box sx={{ mt: 2 }}>
                <Typography
                  align="center"
                  sx={{ fontSize: 15, fontWeight: 600, color: COLORS.primary }}
                >
                  Related Items
                </Typography>
                <Grid container spacing={2} sx={{ my: 1 }}>
                  <Grid item xs={4}>
                    <Typography
                      align="center"
                      sx={{
                        fontSize: 15,
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
                        fontSize: 15,
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
                        fontSize: 15,
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
                              sx={{
                                fontSize: 13,
                                color: COLORS.primary,
                                fontWeight: 500,
                              }}
                            >
                              {transactionData.related_items.item_names[index]}
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
                                  fontWeight: 600,
                                  fontSize: 10,
                                }}
                              >
                                Price:
                                {
                                  transactionData.related_items.item_prices[
                                    index
                                  ]
                                }
                              </Typography>
                            </Box>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              align="center"
                              sx={{
                                fontSize: 13,
                                color: COLORS.primary,
                                fontWeight: 500,
                              }}
                            >
                              {transactionData.related_items.quantities[index]}
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Typography
                              align="center"
                              sx={{
                                fontSize: 13,
                                color: COLORS.primary,
                                fontWeight: 500,
                              }}
                            >{`₱${transactionData.related_items.related_item_totals[index]}`}</Typography>
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
                <Typography align="center" sx={{ fontSize: 18 }}>
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
                  mt: 2,
                  color: COLORS.primary,
                  backgroundColor: COLORS.background,
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
        onSubmit={handleSubmitTransactionOnline}
        loading={loading}
      />
    </Dialog>
  );
};

export default PopOnlineTransaction;
