const axios = require("axios");
const config = require("../config/config");

/**
 * Umumiy API so'rovlari uchun wrapper funksiya
 */
async function makeRequest(method, url, data = null, headers = {}) {
  try {
    const response = await axios({
      method,
      url,
      data,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      timeout: 10000, // 10 sekund
    });

    return response.data;
  } catch (error) {
    console.error("API so'rovida xato:", error.message);

    // Xato javobni qaytarish
    if (error.response) {
      return {
        error: true,
        status: error.response.status,
        message: error.response.data?.message || error.message,
      };
    }

    return {
      error: true,
      message: error.message,
    };
  }
}

/**
 * Tashqi API bilan ishlash uchun servis
 */
const apiService = {
  get: (url, headers) => makeRequest("GET", url, null, headers),
  post: (url, data, headers) => makeRequest("POST", url, data, headers),
  put: (url, data, headers) => makeRequest("PUT", url, data, headers),
  delete: (url, headers) => makeRequest("DELETE", url, null, headers),
};

module.exports = apiService;
