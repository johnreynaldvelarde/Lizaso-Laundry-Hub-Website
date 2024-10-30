import { jsPDF } from "jspdf";
import {
  isWithinInterval,
  subDays,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} from "date-fns";

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

export const checkDateMatch = (option, date) => {
  const now = new Date();
  switch (option) {
    case "Last 24 Hours":
      return isWithinInterval(date, { start: subDays(now, 1), end: now });
    case "Last 7 Days":
      return isWithinInterval(date, { start: subDays(now, 7), end: now });
    case "Last 30 Days":
      return isWithinInterval(date, { start: subDays(now, 30), end: now });
    case "This Month":
      return isWithinInterval(date, {
        start: startOfMonth(now),
        end: endOfMonth(now),
      });
    case "This Year":
      return isWithinInterval(date, {
        start: startOfYear(now),
        end: endOfYear(now),
      });
    case "All Time":
      return true; // All dates match
    default:
      return false; // Handle any unknown options
  }
};
