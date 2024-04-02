import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/campaigns";

export const fetchCampaign = async () => {
  try {
    const response = await fetch(API_BASE_URL, {
      withCredentials: true,
      headers: {
        "Content-type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createCampaign = async (campaignData) => {
  try {
    const respone = await axios(`${API_BASE_URL}`, campaignData);
    return respone.data;
  } catch (error) {
    throw error;
  }
};
