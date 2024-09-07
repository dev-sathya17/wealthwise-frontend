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
};

export default incomeCategoryService;
