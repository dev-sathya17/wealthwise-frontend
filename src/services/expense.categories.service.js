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
  getAllCategories: async () => {
    try {
      const response = await protectedInstance.get("/expense-categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default expenseCategoryService;
