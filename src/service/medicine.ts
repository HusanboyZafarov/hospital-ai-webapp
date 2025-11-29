import { axiosInstance } from "../jwt";
import { endpoint } from "../constants/api";

const getMedications = () =>
  axiosInstance
    .get(`${endpoint}/medications/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Medications error:", err);
      throw err;
    });

export const medicineService = {
  getMedications,
};
