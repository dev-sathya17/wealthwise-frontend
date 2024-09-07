import adminService from "../services/admin.service";

const adminLoader = {
  fetchAllUsers: async () => {
    try {
      const response = await adminService.getAllUsers();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
  fetchCategories: async () => {
    try {
      const response = await adminService.getIncomeCategories();
      const expenseRespose = await adminService.getExpenseCategories();
      return {
        income: response.categories,
        expense: expenseRespose.categories,
      };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default adminLoader;
