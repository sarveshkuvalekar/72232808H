// src/utils/auth.js
import axios from 'axios';

export const getToken = async () => {
  try {
    const res = await axios.post("/train/auth", {
      companyName: "Train Central",
      clientID: "19afa022-1b3c-49a9-a29f-ab6d59f895e2",
      clientSecret: "ZhSsCPgtqsfvbxqS",
      ownerName: "Sarvesh Kuvalekar",
      ownerEmail: "sarveshkuvalekar2207@gmail.com",
      rollNo: "72232808H"  // Must match exactly as registered
    });
    return res.data.access_token;
  } catch (error) {
    console.error("Failed to get token", error.response?.data || error.message);
    throw error;
  }
};
