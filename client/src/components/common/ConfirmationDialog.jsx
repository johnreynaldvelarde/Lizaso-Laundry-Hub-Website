import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { motion } from "framer-motion";

function ConfirmationDialog({ open, onClose, onConfirm, itemId }) {
  const dialogVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        component: motion.div,
        variants: dialogVariants,
        initial: "hidden",
        animate: "visible",
        transition: { duration: 0.3, ease: "easeOut" },
        className: "bg-white rounded-lg max-w-md mx-4 p-2",
      }}
    >
      <div className="relative">
        <DialogTitle className="text-lg font-semibold mb-4">
          Are you absolutely sure?
        </DialogTitle>
        <DialogContent className="text-sm text-gray-700 mb-1">
          Are you sure you want to remove this?
        </DialogContent>
        <DialogActions className="flex justify-end space-x-2">
          <Button
            onClick={onClose}
            variant="outlined"
            sx={{
              marginRight: 1,
              borderColor: "#595959",
              borderRadius: "5px",
              fontWeight: 500,
              textTransform: "none",
              color: "#595959",
              "&:hover": {
                borderColor: "#595959",
                backgroundColor: "rgba(144, 144, 144, 0.1)",
              },
            }}
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            disableElevation
            onClick={() => {
              onConfirm(itemId);
              onClose();
            }}
            sx={{
              backgroundColor: "#5787C8",
              borderRadius: "5px",
              fontWeight: 500,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#3A5A85",
              },
            }}
          >
            Continue
          </Button>
        </DialogActions>
      </div>
    </Dialog>
  );
}

export default ConfirmationDialog;

// import React from "react";
// import Dialog from "@mui/material/Dialog";
// import DialogTitle from "@mui/material/DialogTitle";
// import DialogContent from "@mui/material/DialogContent";
// import DialogActions from "@mui/material/DialogActions";
// import Button from "@mui/material/Button";

// function ConfirmationDialog({ open, onClose, onConfirm, itemId }) {
//   return (
//     <Dialog open={open} onClose={onClose} className="p-4">
//       <div className="relative">
//         <div className="fixed inset-0 flex items-center justify-center z-50">
//           <div className="bg-white rounded-lg w-full max-w-md mx-4 p-2 relative z-50">
//             <DialogTitle className="text-lg font-semibold mb-4">
//               Are you absolutely sure?
//             </DialogTitle>
//             <DialogContent className="text-sm text-gray-700 mb-1">
//               Are you sure you want to remove this item?
//             </DialogContent>
//             <DialogActions className="flex justify-end space-x-2">
//               <Button
//                 onClick={onClose}
//                 variant="outlined"
//                 sx={{
//                   marginRight: 1,
//                   borderColor: "#595959",
//                   borderRadius: "5px",
//                   fontWeight: 500,
//                   textTransform: "none",
//                   color: "#595959",
//                   "&:hover": {
//                     borderColor: "#595959",
//                     backgroundColor: "rgba(144, 144, 144 0.1)",
//                   },
//                 }}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 disableElevation
//                 onClick={() => {
//                   onConfirm(itemId);
//                   onClose();
//                 }}
//                 sx={{
//                   backgroundColor: "#5787C8",
//                   borderRadius: "5px",
//                   fontWeight: 500,
//                   textTransform: "none",
//                   "&:hover": {
//                     backgroundColor: "#3A5A85",
//                   },
//                 }}
//               >
//                 Continue
//               </Button>
//             </DialogActions>
//           </div>
//         </div>
//       </div>
//     </Dialog>
//   );
// }

// export default ConfirmationDialog;
