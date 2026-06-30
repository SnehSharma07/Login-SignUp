const BASE_URL = "http://localhost:8888/pages";

export const api = {
  async request(path, options = {}) {
    const token = localStorage.getItem("token");
    const headers = {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${path}`, {
      ...options,
      headers,
    });

    let data = null;
    try {
      data = await response.json();
    } catch (e) {
      // response might not be JSON
    }

    if (!response.ok) {
      const error = new Error(data?.msg || data?.message || "Something went wrong");
      error.status = response.status;
      throw error;
    }

    return data;
  },

  get(path, options = {}) {
    return this.request(path, { ...options, method: "GET" });
  },

  post(path, body, options = {}) {
    return this.request(path, {
      ...options,
      method: "POST",
      body: JSON.stringify(body),
    });
  },
};
