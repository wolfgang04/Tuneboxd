import React, { useState } from "react";

const Account = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const [username, setUsername] = useState<string>("JohnDoe");
  const [email, setEmail] = useState<string>("johndoe@example.com");
  const [password, setPassword] = useState<string>("");

  const handleSave = () => {
    setIsEditing(false);
    console.log("Saved changes:", { username, email, password });
  };

  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Account Settings</h2>
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
            className={`w-full rounded-lg border p-2 ${
              isEditing
                ? "border-gray-300 bg-white"
                : "cursor-not-allowed border-gray-200 bg-gray-100"
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
            className={`w-full rounded-lg border p-2 ${
              isEditing
                ? "border-gray-300 bg-white"
                : "cursor-not-allowed border-gray-200 bg-gray-100"
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
            className={`w-full rounded-lg border p-2 ${
              isEditing
                ? "border-gray-300 bg-white"
                : "cursor-not-allowed border-gray-200 bg-gray-100"
            }`}
          />
        </div>

        {/* Action Buttons */}
        <div className="mt-4 flex justify-end gap-4">
          {isEditing ? (
            <>
              <button
                onClick={() => setIsEditing(false)}
                className="rounded-lg bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Account;
