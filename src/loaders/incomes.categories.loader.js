import incomeCategoryService from "../services/income.categories.service";

const incomeCategoriesLoader = {
  fetchAllCategories: async () => {
    try {
      const response = await incomeCategoryService.getAllCategories();
      return { data: response };
    } catch (error) {
      return error.response.data.message;
    }
  },
};

export default incomeCategoriesLoader;
