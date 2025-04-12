import React from "react";
import LiveAlerts from "./components/LiveAlerts";
import AdminAlerts from "./components/AdminAlerts"
import LegislationSummary from './components/admin/LegislationSummary';
import CreatePoll from "./components/admin/CreatePoll";
import LegislationList from "./components/LegislationList";
import VotePollList from "./components/VotePollList";
function App() {
  const userLocation = "Sector 5"; 

  return (
    <div className="min-h-screen bg-gray-50 p-4 items-center">
      <LiveAlerts userLocation={userLocation} />
      <AdminAlerts/>
      <LegislationSummary />
      <div className="main-section">
        <CreatePoll/>
        <LegislationList/>
        <VotePollList/>

      </div>
    </div>
  );
}

export default App;
