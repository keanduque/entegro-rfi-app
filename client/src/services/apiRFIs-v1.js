import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/rfi";
const API_DA = import.meta.env.VITE_API;

// Utility function to handle errors
const handleAxiosError = (error) => {
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
// Fetch all data
export const getRFIs = async () => {
  try {
    const res = await axios.get(API_URL);
    const { data, totalCount } = res.data;
    return { data, totalCount };
  } catch (error) {
    handleAxiosError(error);
    return { data: [], totalCount: 0 }; // Fallback in case of error
  }
};

// Create a new record
export const createRFI = async (newData) => {
  try {
    const response = await axios.post(API_URL, newData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Update a record
export const updateRFI = async ({ id, updates }) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updates);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Delete a record
export const deleteRFI = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

//Fetch all DISTINCT da fields
export const getDAs = async () => {
  try {
    const res = await axios.get(`${API_DA}rfis/da`);
    const data = res.data;
    const options = [
      { value: "all", label: "All" },
      ...data.map((da) => ({
        value: da,
        label: da,
      })),
    ];
    return options;
  } catch (error) {
    handleAxiosError(error);
  }
};
