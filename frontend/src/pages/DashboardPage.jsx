import { useUser } from '@clerk/clerk-react';
import React, { useState } from 'react'
import { useNavigate } from 'react-router'
import { useActiveSessions, useCreateSession, useMyRecentSessions } from '../hooks/useSession';
import Navbar from '../components/Navbar';
import WelcomeSection from '../components/WelcomeSection';
import ActiveSessions from '../components/ActiveSessions';
import StatsCards from '../components/StatsCards';
import RecentSessions from '../components/RecentSessions';
import CreateSessionModal from '../components/CreateSessionModal';

function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
    
    
  })
  const createSessionMutation = useCreateSession();
  const { data:activeSessions, isLoading:isLoadingActiveSessions} = useActiveSessions();
  const { data: recentSessions, isLoading: isLoadingRecentSessions } = useMyRecentSessions();
   const activeSession = activeSessions?.sessions || [];
   const recentSession = recentSessions?.sessions || [];
  const handleCreateRoom = () => {
    if (!roomConfig.problem || !roomConfig.difficulty) {
      toast.error("Please select a problem and difficulty");
      return;
    }
    createSessionMutation.mutate({
      problem: roomConfig.problem,
      difficulty: roomConfig.difficulty.toLowerCase(),
    },
    {
    onSuccess: (data) => {
      setShowCreateModal(false);
      navigate(`/session/${data.session._id}`);
      },
    }
    
    );
   
  }
  const isUserInSession = (session) => {
    if (!user.id) return false;
    return session.host?.clerkId === user.id || session.participant?.clerkId === user.id;
   }

  return (
    <>
      <Navbar />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />
        
        {/* Stats and Live Sessions Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <StatsCards
              activeSessionsCount={activeSession.length}
              recentSessionsCount={recentSession.length}
            />
          </div>
          <div className="lg:col-span-2">
            <ActiveSessions
              sessions={activeSession}
              isLoading={isLoadingActiveSessions}
              isUserInSession={isUserInSession}
            />
          </div>
        </div>

        {/* Recent Sessions Row */}
        <div className="w-full">
          <RecentSessions
            sessions={recentSession}
            isLoading={isLoadingRecentSessions}
          />
        </div>
      </main> 
      <CreateSessionModal
        isOpen = {showCreateModal}
        onClose = {() => setShowCreateModal(false)}
        roomConfig = {roomConfig}
        setRoomConfig = {setRoomConfig}
        onCreateRoom = {handleCreateRoom}
        isCreating = {createSessionMutation.isPending}
      
      />
    </>
  )
} 

export default DashboardPage