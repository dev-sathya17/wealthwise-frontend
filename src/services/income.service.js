import { protectedInstance } from "./instance";

const incomeService = {
  getIncomePerMonth: async () => {
    try {
      const response = await protectedInstance.get("/incomes/count");
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch income per month");
    }
  },
  getAllIncomes: async () => {
    try {
      const response = await protectedInstance.get("/incomes");
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch all incomes");
    }
  },
  addIncome: async (data) => {
    try {
      const response = await protectedInstance.post("/incomes", data);
      return {
        status: 201,
        data: response.data,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
  deleteIncome: async (id) => {
    try {
      const response = await protectedInstance.delete(`/incomes/${id}`);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
  updateIncome: async (id, data) => {
    try {
      const response = await protectedInstance.put(`/incomes/${id}`, data);
      return {
        status: 200,
        data: response.data,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default incomeService;
