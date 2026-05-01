import { useMutation, useQuery } from "@tanstack/react-query"
import toast from "react-hot-toast"
import { sessionApi } from "../api/session"

export const useCreateSession = () => {
  const result = useMutation({
    mutationKey: ["create-session"],
    mutationFn:sessionApi.createSession,
    onSuccess: () => {
      toast.success("Session created successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create session!");
    },
  })
  return result
}


export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["active-sessions"],
    queryFn: () => sessionApi.getActiveSessions(),
  })

  return result
}

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: () => sessionApi.getMyRecentSessions(),
  })

  return result
}

export const useSessionById = (sessionId) => {
  const result = useQuery({
    queryKey: ["sessionById",sessionId],
    queryFn: () => sessionApi.getSessionById(sessionId),
    enabled: !!sessionId,
    refetchInterval: 5000,
  })

  return result
}

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

export const useEndSession = () => {
  return useMutation({
    mutationKey: ["end-session"],
    mutationFn:sessionApi.endSession,
    onSuccess: () => {
      toast.success("Session ended successfully!");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to end session!");
    },
  })
  return result
}
