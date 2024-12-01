import axios from 'axios';

const axiosClient = axios.create({
  baseURL: process.env.API_BASE_URL, 
});

export const createChat = async (chatData) => {
  try {
    const response = await axiosClient.post('/chats', chatData);
    return response.data;
  } catch (error) {
    console.error('Error creating chat:', error);
    throw error;
  }
};

export const getChatsByLoanId = async (loanId) => {
  try {
    const response = await axiosClient.get(`/chats/${loanId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching chats for loan ID ${loanId}:  `, error);
    throw error;
  }
};

export const getChatById = async (id) => {
  try {
    const response = await axiosClient.get(`/chats/chat/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching chat with ID ${id}:`, error);
    throw error;
  }
};

export const updateChat = async (id, updatedData) => {
  try {
    const response = await axiosClient.put(`/chats/chat/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error(`Error updating chat with ID ${id}:`, error);
    throw error;
  }
};

export const deleteChat = async (id) => {
  try {
    const response = await axiosClient.delete(`/chats/chat/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting chat with ID ${id}:`, error);
    throw error;
  }
};
