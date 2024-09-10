import { protectedInstance } from "./instance";

const expenseConfigService = {
  getExpenseConfig: async () => {
    try {
      const response = await protectedInstance.get("/expense-config");
      return response.data;
    } catch (error) {
      console.error("Error fetching expense config:", error);
      throw error;
    }
  },
  addExpenseConfig: async (data) => {
    try {
      const response = await protectedInstance.post("/expense-config", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error adding expense config:", error);
      return error;
    }
  },
  deleteExpenseConfig: async (id) => {
    try {
      const response = await protectedInstance.delete(`/expense-config/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error deleting expense config:", error);
      return error;
    }
  },
  initializeExpenseConfig: async (data) => {
    try {
      const response = await protectedInstance.post(
        "/expense-config/initialize",
        data
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      console.error("Error initializing expense config:", error);
      return error;
    }
  },
};

export default expenseConfigService;
