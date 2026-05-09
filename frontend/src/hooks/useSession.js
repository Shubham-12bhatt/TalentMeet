import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/session"

/**
 * Hook to create a new coding session.
 * Uses useMutation to handle the API call and shows toast notifications on success/error.
 */
export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ["create-session"],
    mutationFn: sessionApi.createSession,
    onSuccess: () => {
      toast.success("Session created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create session!");
    },
  })
  return result
}


/**
 * Hook to fetch all currently active sessions.
 * Useful for the dashboard or home page to display live sessions.
 */
export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["active-sessions"],
    queryFn: () => sessionApi.getActiveSessions(),
  })

  return result
}

/**
 * Hook to fetch the recent sessions created or joined by the current user.
 */
export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => sessionApi.getMyRecentSessions(),
  })

  return result
}

/**
 * Hook to fetch details of a specific session by its ID.
 * Automatically refetches every 5 seconds to keep data (like participants or status) fresh.
 * 
 * @param {string} sessionId - The ID of the session to fetch
 */
export const useSessionById = (sessionId) => {
  const result = useQuery({
    queryKey: ["sessionById", sessionId],
    queryFn: () => sessionApi.getSessionById(sessionId),
    enabled: !!sessionId,
    refetchInterval: 5000,
  })

  return result
}

/**
 * Hook to join an existing session.
 * Handles the API mutation and displays appropriate toast notifications.
 */
export const useJoinSession = () => {
  return useMutation({
    mutationKey: ["join-session"],
    mutationFn:sessionApi.joinSession,
    onSuccess: () => {
      toast.success("Joined session successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to join session!");
    },
  })
  return result
}

/**
 * Hook to end an active session.
 * Handles the API mutation and displays appropriate toast notifications.
 */
export const useEndSession = () => {
  return useMutation({
    mutationKey: ["end-session"],
    mutationFn: sessionApi.endSession,
    onSuccess: () => {
      toast.success("Session ended successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to end session!");
    },
  })
  return result
}
