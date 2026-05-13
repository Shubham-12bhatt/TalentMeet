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

  /**
   * Retrieves all active sessions.
   * @returns {Promise<Object[]>} An array of active sessions.
   */
  getActiveSessions: async () => {
    const response = await axiosInstance.get('/sessions/active');
    return response.data;
  },

  /**
   * Retrieves the current user's recent sessions.
   * @returns {Promise<Object[]>} An array of recent sessions for the user.
   */
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get('/sessions/my-recent');
    return response.data;
  },

  /**
   * Retrieves a specific session by its ID.
   * @param {string} id - The ID of the session to retrieve.
   * @returns {Promise<Object>} The session data.
   */
  getSessionById: async (id) => {
    const response = await axiosInstance.get(`/sessions/${id}`);
    return response.data;
  },
 
  /**
   * Joins an existing session by ID.
   * @param {string} id - The ID of the session to join.
   * @returns {Promise<Object>} The response data from joining the session.
   */
  joinSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/join`);
    return response.data;
  },

  /**
   * Ends an active session by ID.
   * @param {string} id - The ID of the session to end.
   * @returns {Promise<Object>} The response data from ending the session.
   */
  endSession: async (id) => {
    const response = await axiosInstance.post(`/sessions/${id}/end`);
    return response.data;
  },

  /**
   * Retrieves a stream token for chat.
   * @param {string} id - The session ID.
   * @returns {Promise<Object>} The chat stream token data.
   */
  getStreamToken: async (id) => {
    const response = await axiosInstance.get(`/chat/token`);
    return response.data;
  },
}