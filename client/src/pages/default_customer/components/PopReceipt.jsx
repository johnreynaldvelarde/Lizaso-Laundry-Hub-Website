import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  Button,
  Box,
  Typography,
  DialogActions,
  Paper,
  List,
  Grid,
  Divider,
} from "@mui/material";
import { transactionDate, transactionTime } from "../../../utils/method";
import CustomPopHeaderTitle from "../../../components/common/CustomPopHeaderTitle";
import { COLORS } from "../../../constants/color";
import logo from "../../../assets/images/logo.png";
import useFetchData from "../../../hooks/common/useFetchData";
import { getCalculatedTransactionForCustomer } from "../../../services/api/customerApi";

const PopReceipt = ({ open, onClose, assignmentId, customerData }) => {
  const receiptRef = useRef(null);
  const { data: transactionData, fetchData: fetchCalculatedTransaction } =
    useFetchData();

  const fetchCalculatedTransactionData = useCallback(() => {
    fetchCalculatedTransaction(
      getCalculatedTransactionForCustomer.getTransactionCustomer,
      assignmentId
    );
  }, [fetchCalculatedTransaction, assignmentId]);

  useEffect(() => {
    if (open) {
      fetchCalculatedTransactionData();
    }
  }, [open, fetchCalculatedTransactionData]);

  const handleSaveAsImage = () => {};

  const handleDownloadAsPdf = () => {};

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        style: {
          borderRadius: 16,
        },
      }}
    >
      {/* Header */}
      <CustomPopHeaderTitle
        title={"Transaction Receipt"}
        subtitle={"Your receipt is displayed below"}
        onClose={onClose}
      />

      {/* This is the reciept */}
      <DialogContent ref={receiptRef}>
        <Paper
          sx={{
            marginTop: 1,
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
            mb={1}
          >
            <Box>
              <img
                src={logo}
                alt="Lizaso Laundry Logo"
                style={{ width: 50, height: 50 }}
              />
            </Box>

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
                Customer Name:
                <span
                  style={{
                    color: COLORS.primary,
                    fontWeight: 500,
                    marginLeft: "8px",
                  }}
                >
                  {customerData.service_request.customer_fullname}
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
                  {customerData.service_request.payment_method}
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
                    {customerData.service_request.service_name}
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
                      Base Price:
                      <span className="ml-1">
                        {customerData.service_request.service_default_price}
                      </span>
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

              {transactionData.related_items &&
              transactionData.related_items.item_ids &&
              transactionData.related_items.item_ids.length > 0 ? (
                transactionData.related_items.item_ids.map((itemId, index) => (
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
                          {transactionData.related_items.item_prices[index]}
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
                ))
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
      </DialogContent>

      <DialogActions className="flex justify-end space-x-1 mb-1 mr-2">
        <Button
          disableElevation
          variant="outlined"
          color="primary"
          sx={{
            marginTop: 3,
            marginRight: 1,
            borderColor: COLORS.border2,
            borderRadius: "5px",
            fontWeight: 500,
            textTransform: "none",
            color: COLORS.text4,
            "&:hover": {
              borderColor: COLORS.border2,
              backgroundColor: COLORS.light,
            },
          }}
        >
          Save as Image
        </Button>
        <Button
          disableElevation
          variant="contained"
          color="primary"
          sx={{
            marginTop: 3,
            textTransform: "none",
            backgroundColor: COLORS.secondary,
            "&:hover": {
              backgroundColor: COLORS.secondaryHover,
            },
          }}
        >
          Download as PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PopReceipt;
