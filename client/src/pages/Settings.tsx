import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navigations from "../components/Settings/Navigations";
import Account from "../components/Settings/Account";
import Notifications from "../components/Settings/Notifications";
import Privacy from "../components/Settings/Privacy";
import Preferences from "../components/Settings/Preferences";

const Settings: React.FC = () => {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Navigations />

      {/* Main Content */}
      <main className="flex-1 bg-gray-50 p-8">
        <Routes>
          <Route path="/" element={<Navigate to="account" />} />
          <Route path="account" element={<Account />} />
          <Route path="notifications" element={<Notifications />} />
          <Route path="privacy" element={<Privacy />} />
          <Route path="preferences" element={<Preferences />} />
        </Routes>
      </main>
    </div>
  );
};

export default Settings;
