import axios from "axios";

const BASE_URL = "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers";

export const fetchAllCampers = async (params) => {
  const { data } = await axios.get(BASE_URL, { params });
  return data;
};

export const fetchCampers = async (params, thunkAPI) => {
  try {
    return await fetchAllCampers(params);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
};
