// services/userService.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL, // Access the API URL from your environment variables
});

export const createUser = async (userData) => {
  try {
    const response = await axiosClient.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};
export const login = async (userData) => {
  try {
    const response = await axiosClient.post('/users/login', userData);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const response = await axiosClient.get('/users');
    return response.data;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
};

export const getUserById = async (id) => {
  try {
    const response = await axiosClient.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
};

export const updateUser = async (id, updatedData) => {
  try {
    const response = await axiosClient.put(`/users/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error);
    throw error;
  }
};

export const deleteUser = async (id) => {
  try {
    const response = await axiosClient.delete(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting user with ID ${id}:`, error);
    throw error;
  }
};
