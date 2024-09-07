import { protectedInstance } from "./instance";

const expenseCategoryService = {
  deleteExpenseCategory: async (id) => {
    try {
      const response = await protectedInstance.delete(
        `/expense-categories/${id}`
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default expenseCategoryService;
