import React from 'react';
import MainContent from '../components/Dashboard/MainContent';
import TrendingSongHits from '../components/Dashboard/TrendingSongHits';
import Recommended from '../components/Dashboard/Recommended';
import CommunityTalks from '../components/Dashboard/CommunityTalks';


const TuneboxdDashboard: React.FC = () => {
  return (
    <div data-layername="dashboard" className="flex overflow-hidden flex-col px-16 pb-16 bg-white max-md:px-5">
      <MainContent />
      <TrendingSongHits />
      <Recommended />
      <CommunityTalks />
    </div>
  );
};

export default TuneboxdDashboard;