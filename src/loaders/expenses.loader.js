import expenseService from "../services/expense.service";

const expensesLoader = {
  fetchExpenses: async () => {
    try {
      const { data } = await expenseService.getAllExpenses();
      return { data: data.userExpenses };
    } catch (error) {
      console.error("Error fetching expenses:", error);
      throw error;
    }
  },
};

export default expensesLoader;
