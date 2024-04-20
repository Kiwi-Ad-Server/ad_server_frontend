import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/campaigns";

//get campaigns
export const fetchCampaigns = async () => {
  try {
    const response = await axios.get(API_BASE_URL, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data.capaigns;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};
//create campaign
export const createCampaign = async (campaignData) => {
  try {
    const response = await axios.post(API_BASE_URL, campaignData, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching campaigns:", error);
    throw error;
  }
};

// update Campaign
export const updateCampaign = async (campaignId, updatedData) => {
  try {
    const response = await axios.put(
      `${API_BASE_URL}/${campaignId}`,
      updatedData,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(`Error updating campaign with ID ${campaignId}:`, error);
    throw error;
  }
};

// delete Campaign
export const deleteCampaign = async (campaignId) => {
  try {
    await axios.delete(`${API_BASE_URL}/${campaignId}`, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error(`Error deleting campaign with ID ${campaignId}:`, error);
    throw error;
  }
};
