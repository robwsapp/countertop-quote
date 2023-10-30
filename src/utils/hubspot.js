import axios from 'axios';

export const createContactInHubspot = async (userData) => {
  try {
    const response = await axios.post('https://lakeside-api.vercel.app/api/hubspot/create-contact',
      {
        properties: {
          firstname: userData.firstName,
          lastname: userData.lastName,
          email: userData.email,
          phone: userData.phoneNumber,
          zip: userData.zipCode,
          requested_quote: "Yes",
        },
        hubspotutk: userData.hubspotutk // Add this line
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating contact in HubSpot:", error);
    throw error;
  }
};
