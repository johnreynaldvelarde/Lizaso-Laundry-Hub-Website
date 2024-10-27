import { jsPDF } from "jspdf";

export const generatePDF = async (ref) => {
  const input = ref.current;

  if (input) {
    const canvas = await html2canvas(input); // Convert to canvas
    const imgData = canvas.toDataURL("image/png"); // Get image data
    const pdf = new jsPDF(); // Create a new PDF instance
    pdf.addImage(imgData, "PNG", 0, 0); // Add image to PDF
    pdf.save("transaction_receipt.pdf"); // Save the PDF
  }
};

export const transactionDate = new Date().toLocaleDateString("en-US", {
  year: "numeric",
  month: "long", // Full month name (e.g., January)
  day: "numeric",
});

export const transactionTime = new Date().toLocaleTimeString("en-US", {
  hour: "numeric",
  minute: "numeric",
  hour12: true, // 12-hour format with AM/PM
});
