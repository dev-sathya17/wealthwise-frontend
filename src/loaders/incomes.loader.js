import incomeService from "../services/income.service";

const incomesLoader = {
  fetchIncomes: async () => {
    try {
      const { data } = await incomeService.getAllIncomes();
      return { data: data.userIncomes };
    } catch (error) {
      console.error("Error fetching incomes:", error);
      throw error;
    }
  },
};

export default incomesLoader;
