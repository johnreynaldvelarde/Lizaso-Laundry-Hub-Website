import { v4 as uuidv4 } from "uuid";

export function generateTrackingCode() {
  // Generate a UUID and remove the dashes
  const uuid = uuidv4().replace(/-/g, "").toUpperCase();

  // Format as a tracking code
  return `#${uuid.substring(0, 20)}`;
}
