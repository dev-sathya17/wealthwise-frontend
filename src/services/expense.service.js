import { protectedInstance } from "./instance";

const expenseService = {
  getExpensePerMonth: async () => {
    try {
      const response = await protectedInstance.get("/expenses/count");
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch expenses per month");
    }
  },
  getAllExpenses: async () => {
    try {
      const response = await protectedInstance.get("/expenses");
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch all expenses");
    }
  },
  addExpense: async (data) => {
    try {
      const response = await protectedInstance.post("/expenses", data);
      return {
        status: 201,
        data: response.data,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
  deleteExpense: async (id) => {
    try {
      const response = await protectedInstance.delete(`/expenses/${id}`);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
  updateExpense: async (id, data) => {
    try {
      const response = await protectedInstance.put(`/expenses/${id}`, data);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default expenseService;
