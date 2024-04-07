/**
 * api-service.js
 *
 * @author Nestor Nathingo <nessynathingo@gmail.com>
 * @copyright (c) 2024
 * All rights reserved
 */

import axios from "axios";
import { BehaviorSubject } from "rxjs";

class APIService {
  constructor(baseURL) {
    this.baseURL = baseURL;
    this.subjects = {};
  }

  getSubject(key) {
    if (!this.subjects[key]) {
      this.subjects[key] = new BehaviorSubject([]);
    }
    return this.subjects[key];
  }

  async fetchData(endpoint) {
    try {
      const response = await axios.get(`${this.baseURL}/${endpoint}`);
      this.getSubject(endpoint).next(response.data);
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  }

  async postData(endpoint, data) {
    try {
      const response = await axios.post(`${this.baseURL}/${endpoint}`, data);
      this.fetchData(endpoint); // Refresh data after POST
      return response.data;
    } catch (error) {
      console.error(`Error posting data to ${endpoint}:`, error);
      throw error;
    }
  }

  async updateData(endpoint, id, data) {
    try {
      const response = await axios.patch(
        `${this.baseURL}/${endpoint}/${id}`,
        data
      );
      this.fetchData(endpoint); // Refresh data after PATCH
      return response.data;
    } catch (error) {
      console.error(`Error updating data in ${endpoint}:`, error);
      throw error;
    }
  }

  async deleteData(endpoint, id) {
    try {
      const response = await axios.delete(`${this.baseURL}/${endpoint}/${id}`);
      this.fetchData(endpoint); // Refresh data after DELETE
      return response.data;
    } catch (error) {
      console.error(`Error deleting data from ${endpoint}:`, error);
      throw error;
    }
  }

  subscribeToData(endpoint, callback) {
    const subject = this.getSubject(endpoint);
    const subscription = subject.subscribe(callback);
    this.fetchData(endpoint); // Initially fetch data
    return subscription; // Return subscription for unsubscribe
  }
}

// Example usage:
// const apiService = new APIService('http://localhost:3000/api');
// To subscribe to data: apiService.subscribeToData('campaigns', data => console.log(data));
// To fetch data: apiService.fetchData('campaigns');
// To post data: apiService.postData('campaigns', { name: 'New Campaign', budget: 1000 });

export default APIService;
