import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch all destinations, optionally filtered by a search term and/or category.
export const getDestinations = async ({ search = "", category = "" } = {}) => {
  const params = {};
  if (search) params.search = search;
  if (category) params.category = category;

  const response = await axios.get(`${API_URL}/destinations`, { params });
  return response.data;
};
