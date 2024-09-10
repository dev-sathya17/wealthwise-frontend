import expenseCategoryService from "../services/expense.categories.service";

const expenseCategoriesLoader = {
  fetchAllCategories: async () => {
    try {
      const response = await expenseCategoryService.getAllCategories();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default expenseCategoriesLoader;
