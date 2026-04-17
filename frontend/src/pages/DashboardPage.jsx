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
      difficulty: roomConfig.difficulty,
    },
    {
    onSuccess: (data) => {
      setShowCreateModal(false);
      navigate(`/session/${data.session._id}`);
      },
    }
    
    );
   
  }

  return (
    <>
      <Navbar />
      <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />
      {/* grid layout */}
      <div>
        <div>
          <StatsCards />
          <ActiveSessions />
        </div>
        <div>
          <RecentSessions />
        </div>
      </div> 
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