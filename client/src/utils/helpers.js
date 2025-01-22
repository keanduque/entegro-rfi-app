import { format, differenceInDays, formatDistance, parseISO } from "date-fns";
//import { differenceInDays } from "date-fns/esm";

// We want to make this function work for both Date objects and strings (which come from Supabase)
export const subtractDates = (dateStr1, dateStr2) =>
  differenceInDays(parseISO(String(dateStr1)), parseISO(String(dateStr2)));

export const formatDistanceFromNow = (dateStr) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  })
    .replace("about ", "")
    .replace("in", "In");

// Supabase needs an ISO date string. However, that string will be different on every render because the MS or SEC have changed, which isn't good. So we use this trick to remove any time
export const getToday = function (options = {}) {
  const today = new Date();

  // This is necessary to compare with created_at from Supabase, because it it not at 0.0.0.0, so we need to set the date to be END of the day when we compare it with earlier dates
  if (options?.end)
    // Set to the last second of the day
    today.setUTCHours(23, 59, 59, 999);
  else today.setUTCHours(0, 0, 0, 0);
  return today.toISOString();
};

export const formatCurrency = (value) =>
  new Intl.NumberFormat("en", { style: "currency", currency: "USD" }).format(
    value
  );

export const formatDate = (dateStr) =>
  dateStr !== null ? format(parseISO(dateStr), "dd/MM/yyyy") : dateStr;

export const rfiNumberGenerator = () => {
  const rfiArr = Array.from({ length: 9 }, () =>
    Math.floor(Math.random() * 9)
  ).join("");

  return rfiArr;
};

export const statusNo = (field) => {
  return field && Number(field.split(" ")[0].replace(".", ""));
};

export const statusStr = (field) => {
  return field && field.split(" ")[0].replace(".", "");
};

// Utility function to handle errors
export const handleAxiosError = (error) => {
  if (error.response) {
    // Server responded with a status other than 2xx
    console.error(
      `API Error: ${error.response.status} - ${error.response.data}`
    );
    throw new Error(
      error.response.data.message || "An error occurred on the server."
    );
  } else if (error.request) {
    // Request was made but no response received
    console.error("No response received from server:", error.request);
    throw new Error(
      "No response received from the server. Please check your network."
    );
  } else {
    // Error occurred while setting up the request
    console.error("Error creating request:", error.message);
    throw new Error("Error creating the request. Please try again.");
  }
};

// Helper function to get label from options
export const getLabel = (options, filterValue) => {
  const match = options.find((option) => option.value === filterValue);
  return match?.label || filterValue;
};

// Helper for formatting the date in select and input fields for datepicker - modal forms CreateRFIForm
export const formateDateField = (dateStr) =>
  dateStr !== null ? format(new Date(dateStr), "yyyy-MM-dd") : dateStr;

export const formatDateHHmmss = (dateStr) =>
  dateStr !== null ? format(new Date(dateStr), "dd/MM/yyyy HH:mm:ss") : dateStr;
