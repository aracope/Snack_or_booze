import axios from "axios";

const BASE_API_URL = "http://localhost:5000";

/* 
  json-server will give you CRUD endpoints on snacks and drinks.
  Here we've provided you with a single action to get all drinks.

  You'll need to add to this class as you build features for the app.
*/

/**
 * API class for SnackOrBooze app.
 * Responsible for all communication with the backend via HTTP requests.
 */
class SnackOrBoozeApi {
  static async getSnacks() {
    // GET /snacks
    const result = await axios.get(`${BASE_API_URL}/snacks`);
    return result.data;
  }
  static async getDrinks() {
    // GET /drinks
    const result = await axios.get(`${BASE_API_URL}/drinks`);
    return result.data;
  }

  static async addItem(type, itemData) {
    // POST to /snacks or /drinks depending on type
    const result = await axios.post(`${BASE_API_URL}/${type}`, itemData);
    return result.data;
  }
}

export default SnackOrBoozeApi;
