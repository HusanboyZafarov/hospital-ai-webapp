import { axiosInstance } from "../jwt";
import { endpoint } from "../constants/api";

const getHome = () =>
  axiosInstance
    .get(`${endpoint}/home/`)
    .then((res) => res.data)
    .catch((err) => {
      console.error("Home error:", err);
      throw err;
    });

const taskStatus = (taskId: number, completed: boolean) =>
  axiosInstance
    .post(`${endpoint}/task-status/${taskId}/`, { completed })
    .then((res) => res.data)
    .catch((err) => {
      console.error("Task status error:", err);
      throw err;
    });

export const homeService = {
  getHome,
  taskStatus,
};
