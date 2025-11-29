import { axiosInstance } from "../jwt";
import { endpoint } from "../constants/api";

const getMyProfile = () =>
  axiosInstance
    .get(`${endpoint}/me/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Profile error:", err);
      throw err;
    });

export const profileService = {
  getMyProfile,
};
