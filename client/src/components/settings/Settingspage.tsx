import React, { useState } from "react";

const SettingsPageWithSidebar: React.FC = () => {
  const [selectedSection, setSelectedSection] = useState<string>("account");
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("JohnDoe");
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [password, setPassword] = useState<string>("");

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved changes:", { username, email, password });
  };

  const renderContent = () => {
    switch (selectedSection) {
      case "account":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Account Settings</h2>
            <div className="flex flex-col gap-4">
              {/* Username */}
              <div>
                <label htmlFor="username" className="block text-gray-600">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-gray-600">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={!isEditing}
                  className={`w-full p-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-gray-600">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!isEditing}
                  placeholder={isEditing ? "Enter new password" : "********"}
                  className={`w-full p-2 border rounded-lg ${
                    isEditing
                      ? "border-gray-300 bg-white"
                      : "border-gray-200 bg-gray-100 cursor-not-allowed"
                  }`}
                />
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end gap-4 mt-4">
                {isEditing ? (
                  <>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                      Save Changes
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        );
      case "notifications":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span>Email Notifications</span>
                <input type="checkbox" className="w-6 h-6" />
              </div>
              <div className="flex justify-between items-center">
                <span>Push Notifications</span>
                <input type="checkbox" className="w-6 h-6" />
              </div>
            </div>
          </div>
        );
      case "privacy":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">Privacy</h2>
            <div>
              <label htmlFor="profile-visibility" className="block text-gray-600">
                Profile Visibility
              </label>
              <select
                id="profile-visibility"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
              </select>
            </div>
          </div>
        );
      case "preferences":
        return (
          <div>
            <h2 className="text-xl font-semibold mb-4">App Preferences</h2>
            <div>
              <label htmlFor="theme" className="block text-gray-600">
                Theme
              </label>
              <select
                id="theme"
                className="w-full p-2 border border-gray-300 rounded-lg"
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
              </select>
            </div>
          </div>
        );
      default:
        return <div>Select a section from the sidebar</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg p-4">
        <nav>
          <ul className="space-y-2">
            <li>
              <button
                onClick={() => setSelectedSection("account")}
                className={`w-full text-left p-2 rounded-lg ${
                  selectedSection === "account"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Account Settings
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("notifications")}
                className={`w-full text-left p-2 rounded-lg ${
                  selectedSection === "notifications"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Notifications
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("privacy")}
                className={`w-full text-left p-2 rounded-lg ${
                  selectedSection === "privacy"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                Privacy
              </button>
            </li>
            <li>
              <button
                onClick={() => setSelectedSection("preferences")}
                className={`w-full text-left p-2 rounded-lg ${
                  selectedSection === "preferences"
                    ? "bg-black text-white"
                    : "text-gray-700 hover:bg-gray-200"
                }`}
              >
                App Preferences
              </button>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-50">{renderContent()}</main>
    </div>
  );
};

export default SettingsPageWithSidebar;
