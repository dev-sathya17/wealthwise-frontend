import { protectedInstance } from "./instance";

const incomeConfigService = {
  getIncomeConfig: async () => {
    try {
      const response = await protectedInstance.get("/income-config");
      return response.data;
    } catch (error) {
      console.error("Error fetching income config:", error);
      throw error;
    }
  },
  addIncomeConfig: async (data) => {
    try {
      const response = await protectedInstance.post("/income-config", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error adding income config:", error);
      return error;
    }
  },
  deleteIncomeConfig: async (id) => {
    try {
      const response = await protectedInstance.delete(`/income-config/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error deleting income config:", error);
      return error;
    }
  },
};

export default incomeConfigService;
