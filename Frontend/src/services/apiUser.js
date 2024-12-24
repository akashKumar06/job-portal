class UserService {
  apiUrl = "";
  constructor() {
    this.apiUrl = "http://localhost:8000/api/v1/users";
  }
  async register(user) {
    const res = await fetch(`${this.apiUrl}/register`, {
      credentials: "include",
      method: "POST",
      body: user,
    });
    return await res.json();
  }

  async login(user) {
    try {
      const jsonData = Object.fromEntries(user.entries());
      const res = await fetch(`${this.apiUrl}/login`, {
        credentials: "include",
        method: "POST",
        body: JSON.stringify(jsonData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async getUser() {
    try {
      const res = await fetch(`${this.apiUrl}/profile`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const res = await fetch(`${this.apiUrl}/logout`, {
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updateProfile(user) {
    try {
      const response = await fetch(`${this.apiUrl}/profile/update`, {
        credentials: "include",
        body: user,
        method: "PUT",
      });
      const data = await response.json();
      if (!data.success) throw new Error(data.message);
      return data;
    } catch (error) {
      throw error;
    }
  }

  async updatePassword(data) {
    try {
      const response = await fetch(`${this.apiUrl}/password/update`, {
        credentials: "include",
        body: JSON.stringify(data),
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await response.json();
      if (!res.success) throw new Error(res.message);
      return res;
    } catch (error) {
      throw error;
    }
  }
}

const userService = new UserService();
export default userService;
