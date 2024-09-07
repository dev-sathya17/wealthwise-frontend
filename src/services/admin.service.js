import { protectedInstance } from "./instance";

const adminService = {
  getAllUsers: async () => {
    try {
      const response = await protectedInstance.get("/admin/users");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getIncomeCategories: async () => {
    try {
      const response = await protectedInstance.get("/income-categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getExpenseCategories: async () => {
    try {
      const response = await protectedInstance.get("/expense-categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getTransactionReport: async () => {
    try {
      const response = await protectedInstance.get("/admin/transaction-report");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getTotalUsers: async () => {
    try {
      const response = await protectedInstance.get("/admin/users/count");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default adminService;
