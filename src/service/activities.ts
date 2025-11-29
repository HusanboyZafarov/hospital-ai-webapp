import { endpoint } from "../constants/api";
import { axiosInstance } from "../jwt";

const getActivities = () =>
  axiosInstance
    .get(`${endpoint}/activities/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Activities error:", err);
      throw err;
    });

export const activitiesService = {
  getActivities,
};
