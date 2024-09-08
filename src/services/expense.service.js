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
};

export default expenseService;
