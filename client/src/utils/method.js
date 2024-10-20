// import html2pdf from "html2pdf.js";

// export const generatePDF = (rightColumnRef) => {
//   const element = rightColumnRef.current;

//   if (!element) {
//     console.error("Element not found for PDF generation");
//     return;
//   }

//   const options = {
//     margin: 1,
//     filename: "receipt.pdf",
//     image: { type: "jpeg", quality: 0.98 },
//     html2canvas: { scale: 2 },
//     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
//   };

//   html2pdf().from(element).set(options).save();
// };

import { jsPDF } from "jspdf";

// export const generatePDF = (rightColumnRef) => {
//   const pdf = new jsPDF();
//   const content = rightColumnRef;

//   pdf.html(content, {
//     callback: () => {
//       pdf.save("receipt.pdf");
//     },
//     x: 10,
//     y: 10,
//   });
// };

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
