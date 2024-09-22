import { instance, protectedInstance } from "./instance";

const userServices = {
  register: async (data) => {
    try {
      const response = await instance.post("/users/register", data);
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  login: async (data) => {
    try {
      const response = await instance.post("/users/login", data, {
        withCredentials: true,
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message || error.message;
    }
  },
  forgotPassword: async (email) => {
    try {
      const response = await instance.post(`/users/forgot-password`, { email });
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  verify: async (otp, email) => {
    try {
      const response = await instance.post(`/users/verify`, { otp, email });
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  reset: async (email, password) => {
    try {
      const response = await instance.put(`/users/reset`, {
        email,
        password,
      });
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  checkAuth: async () => {
    try {
      const response = await protectedInstance.get(`/users/check-auth`);
      return { role: response.data.role };
    } catch (error) {
      return error.response.data.message;
    }
  },
  logout: async () => {
    try {
      const response = await protectedInstance.get("/users/logout");
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  updateUser: async (id, data) => {
    try {
      console.log(id, data);
      const response = await protectedInstance.put(`/users/update/${id}`, data);
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  deleteUser: async (id) => {
    try {
      const response = await protectedInstance.delete(`/users/delete/${id}`);
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  getProfile: async () => {
    try {
      const response = await protectedInstance.get(`/users/profile`);
      return { data: response.data, status: response.status };
    } catch (error) {
      return error.response.data.message;
    }
  },
  uploadImage: async (data, userId) => {
    try {
      const response = await protectedInstance.put(
        `/users/update/${userId}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return { data: response.data, status: response.status };
    } catch (error) {
      console.log(error);
      return error.response.data.message;
    }
  },
  getTotalIncomeExpense: async () => {
    try {
      const response = await protectedInstance.get("/users/total");
      return {
        status: 200,
        totalIncome: response.data.totalIncome,
        totalExpense: response.data.totalExpense,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch income-expenses");
    }
  },
  getTotalIncomeExpenseByCategory: async () => {
    try {
      const response = await protectedInstance.get("/users/total/category");
      return {
        status: 200,
        incomeData: response.data.incomeData,
        expenseData: response.data.expenseData,
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to fetch income-expenses by category");
    }
  },
  getSettings: async () => {
    try {
      const response = await protectedInstance.get("/users/settings");
      return { data: response.data };
    } catch (error) {
      console.error("Error fetching settings:", error);
      throw error;
    }
  },
};

export default userServices;
