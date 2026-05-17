import { createSession } from 'react-router';
import axiosInstance from '../lib/axios';

/**
 * API service for managing sessions.
 * Provides methods for creating, joining, ending, and fetching sessions.
 */
export const sessionApi = {
  /**
   * Creates a new session.
   * @param {Object} data - The session data to create.
   * @returns {Promise<Object>} The created session data.
   */
  createSession: async (data) => {
    const response = await axiosInstance.post('/sessions', data);
    return response.data;
  },

 
  getActiveSessions: async () => {
    const response = await axiosInstance.get('/sessions/active');
    return response.data;
  },

  
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get('/sessions/my-recent');
    return response.data;
  },


  getSessionById: async (id) => {
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  },
 
 
  joinSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`);
    return response.data;
  },

 
  endSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`);
    return response.data;
  },


  getStreamToken: async (id) => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
}