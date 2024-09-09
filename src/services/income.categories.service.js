import { protectedInstance } from "./instance";

const incomeCategoryService = {
  deleteIncomeCategory: async (id) => {
    try {
      const response = await protectedInstance.delete(
        `/income-categories/${id}`
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  getAllCategories: async () => {
    try {
      const response = await protectedInstance.get("/income-categories");
      return response.data;
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
};

export default incomeCategoryService;
