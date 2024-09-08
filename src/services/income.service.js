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
};

export default incomeService;
