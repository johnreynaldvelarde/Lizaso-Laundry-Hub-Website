import React from "react";
import { Dialog, DialogContent, Typography, Box, Divider } from "@mui/material";
import CustomPopHeaderTitle from "../components/common/CustomPopHeaderTitle";
import { COLORS } from "../constants/color";

const PopupTermsAndCondition = ({ open, onClose }) => {
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
        title={"Terms and Conditions"}
        subtitle={"Please read the terms and conditions before proceeding."}
        onClose={onClose}
      />

      <DialogContent>
        <Box sx={{ padding: 2 }}>
          <Typography
            variant="h6"
            component="h2"
            gutterBottom
            style={{ color: COLORS.secondary, fontWeight: 600 }}
          >
            Terms and Conditions
          </Typography>

          <Typography
            variant="h6"
            component="h3"
            sx={{ marginTop: 2 }}
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            1. General
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            By using our laundry service, you agree to comply with and be bound
            by the following terms and conditions. These terms apply to all
            users of the service.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            2. Services Provided
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            We offer laundry services including washing, drying, and folding of
            clothes. Prices and available services are subject to change without
            notice. Any changes will be reflected in the app and communicated to
            you before order confirmation.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            3. User Responsibilities
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            You are responsible for ensuring that all items handed over for
            laundry services are properly labeled and that any special care
            instructions are clearly communicated. We are not responsible for
            any damage caused by undisclosed issues such as delicate fabric,
            bleeding colors, or previous damage to the clothing.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            4. Payment
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            All payments must be made through the app using the available
            payment methods. Payment is required before or at the time of
            service delivery. Failure to provide payment may result in the
            suspension of your account.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            5. Liability
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            While we take utmost care with your laundry, we are not responsible
            for any loss or damage of items beyond the cost of the service fee.
            We recommend not sending valuable or irreplaceable items.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            6. Cancellations and Refunds
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            You may cancel your order within 30 minutes of placing it via the
            app. Refunds will only be issued for cancellations made within this
            time frame. No refunds will be issued once your laundry has been
            collected or processed.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            7. Termination
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            We reserve the right to terminate your access to our services at any
            time for any reason, including but not limited to violation of these
            terms.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            8. Changes to Terms
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            We reserve the right to modify these terms at any time. Any changes
            will be effective immediately upon posting in the app. Continued use
            of the service will indicate your acceptance of the new terms.
          </Typography>
          <Divider sx={{ margin: "10px 0" }} />

          <Typography
            variant="h6"
            component="h3"
            style={{ color: COLORS.text, fontWeight: 600 }}
          >
            9. Contact Information
          </Typography>
          <Typography paragraph style={{ color: COLORS.primary }}>
            If you have any questions or concerns about these terms, please
            contact us via the customer support section in the app.
          </Typography>

          {/* <Typography
            variant="body2"
            sx={{ marginTop: 2 }}
            style={{ color: COLORS.secondary }}
          >
            Effective Date: October 22, 2024
          </Typography> */}
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default PopupTermsAndCondition;
