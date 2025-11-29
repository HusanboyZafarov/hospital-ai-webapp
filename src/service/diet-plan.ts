import { endpoint } from "../constants/api";
import { axiosInstance } from "../jwt";

const getDietPlan = () =>
  axiosInstance
    .get(`${endpoint}/diet-plan/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Diet plan error:", err);
      throw err;
    });

export const dietPlanService = {
  getDietPlan,
};
