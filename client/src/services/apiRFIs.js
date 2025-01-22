import axios from "axios";
import { getLabel, handleAxiosError } from "../utils/helpers";
import {
  currentStatusOptions,
  statusEntegroOptions,
} from "../features/rfi/RFIFilterOptions";

// VITE_API_RFIS_URL=http://localhost:5000/api/v1/rfis
const API_URL =
  import.meta.env.VITE_API_RFIS_URL || "http://localhost:5000/api/v1/rfis";
// VITE_API_URL=http://localhost:5000/api/v1/
const API = import.meta.env.VITE_API_URL || "http://localhost:5000/api/v1/";

// Fetch data by rfi_reference
export const getByRfiReference = async ({ rfi_reference = null }) => {
  try {
    const res = await axios.get(`${API_URL}/rfi/${rfi_reference}`);

    return res.data;
  } catch (error) {
    handleAxiosError(error);
    return { data: [] };
  }
};

// Fetch data by ID
export const getRfiByID = async ({ id = null }) => {
  try {
    const res = await axios.get(`${API_URL}/${id}`);

    return res.data;
  } catch (error) {
    handleAxiosError(error);
    return { data: [] };
  }
};

// Fetch all data
export const getRFIs = async ({
  currentStatusFilter,
  statusEntegroFilter,
  rfiReferenceFilter,
  daFilter,
  page,
  sortByField,
  sortByDirection,
}) => {
  try {
    const currentStatus = getLabel(currentStatusOptions, currentStatusFilter);
    const statusEntegro = getLabel(statusEntegroOptions, statusEntegroFilter);

    const params = {
      current_status: currentStatus !== "All" ? currentStatus : undefined,
      status_entegro: statusEntegro !== "All" ? statusEntegro : undefined,
      rfi_reference: rfiReferenceFilter || undefined,
      da: daFilter !== "all" ? daFilter : undefined,
      sortBy: `${sortByField}-${sortByDirection}`,
      page,
    };

    const { data: { data, totalCount } = {} } = await axios.get(API_URL, {
      params,
    });
    return { data, totalCount };
  } catch (error) {
    handleAxiosError(error);
    return { data: [], totalCount: 0 }; // Fallback in case of error
  }
};

// fetch all data fro RFI Stats in Dashboard
export const getRFIForStats = async () => {
  try {
    const res = await axios.get(`${API_URL}/stats`);
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
    const res = await axios.get(`${API}rfi/da`);
    const data = res.data;

    // Extract distinct values
    const distinctData = [...new Set(data)];
    const totalCount = distinctData.length;

    const options = [
      { value: "all", label: `All (${totalCount})` },
      ...distinctData.map((da) => ({
        value: da,
        label: da,
      })),
    ];
    return { options, totalCount };
  } catch (error) {
    handleAxiosError(error);
  }
};

/*******************************************WAYLEAVE and SURVEY*************************************************/

// Fetch all data with joining rfi_tracker and wayleave_tracker table
export const getRFIWithWayleave = async (rfi_reference = null) => {
  try {
    const url = rfi_reference ? `${API}rfi/wayleave/${rfi_reference}` : API_URL;
    const res = await axios.get(url);
    const { data, totalCount } = res.data;
    return { data, totalCount };
  } catch (error) {
    handleAxiosError(error);
    return { data: [], totalCount: 0 }; // Fallback in case of error
  }
};

// Create new Wayleave
export const createWayleave = async (newData) => {
  try {
    const response = await axios.post(`${API}rfi/wayleave/`, newData);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Update Wayleave
export const updateWayleave = async ({ id, updates }) => {
  try {
    const response = await axios.put(`${API}rfi/wayleave/${id}`, updates);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Delete Wayleave
export const deleteWayleave = async (id) => {
  try {
    const response = await axios.delete(`${API}rfi/wayleave/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
  }
};

// Fetch all data with joining rfi_tracker and survey_status table
export const getRFIWithSurvey = async (rfi_reference = null) => {
  try {
    const url = rfi_reference ? `${API}rfi/survey/${rfi_reference}` : API_URL;
    const res = await axios.get(url);
    const { data, totalCount } = res.data;
    return { data, totalCount };
  } catch (error) {
    handleAxiosError(error);
    return { data: [], totalCount: 0 }; // Fallback in case of error
  }
};
