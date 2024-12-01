import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL,
});

export const createLoanRequest = async (loanData) => {
  try {
    const response = await axiosClient.post('/loanRequests', loanData);
    return response;
  } catch (error) {
    console.error('Error creating loan request:', error);
    throw error;
  }
};

export const getAllLoanRequests = async (type,id) => {
  try {
    const response = await axiosClient.get('/loanRequests?type='+type+'&id='+id);
    return response.data;
  } catch (error) {
    console.error('Error fetching loan requests:', error);
    throw error;
  }
};

export const getAllLoanData = async (type,id) =>  {
  try {
    const response = await axiosClient.get('/loanRequests/loanData?type='+type+'&id='+id);
    return response.data;
  } catch (error) {
    console.error('Error fetching loan data:', error);
    throw error;
  }
  
}
export const getLoanRequestById = async (id) => {
  try {
    const response = await axiosClient.get(`/loanRequests/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching loan request with ID ${id}:`, error);
    throw error;
  }
};

export const updateLoanRequest = async (id, updatedData) => {
  try {
    const response = await axiosClient.put(`/loanRequests/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating loan request with ID ${id}:`, error);
    throw error;
  }
};

export const deleteLoanRequest = async (id) => {
  try {
    const response = await axiosClient.delete(`/loanRequests/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting loan request with ID ${id}:`, error);
    throw error;
  }
};
