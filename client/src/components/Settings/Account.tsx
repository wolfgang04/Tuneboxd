import axios from "axios";
import { useEffect, useState } from "react";
import server from "../../SERVER";

const Account = () => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const fetchUserData = async () => {
    try {
      const res = await axios.get(`${server}user/userEmail`, {
        withCredentials: true,
      });

      console.log(res.data);
      const { username, email } = res.data[0];
      setUsername(username);
      setEmail(email);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleSave = async () => {
    setIsEditing(false);

    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post(
        `${server}user/changeCreds`,
        {
          username,
          email,
          password: newPassword,
          prevPassword: currentPassword,
        },
        { withCredentials: true },
      );

      console.log(res.data);
    } catch (error) {
      console.error("Failed to save changes:", error);
    }

    // console.log("Saved changes:", { username, email, password });
  };

  if (isLoading) return <p>Loading...</p>
  
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
            Current Password
          </label>
          <input
            type="password"
            id="password"
            value={currentPassword}
            required
            onChange={(e) => setCurrentPassword(e.target.value)}
            disabled={!isEditing}
            placeholder={isEditing ? "Enter new password" : "********"}
            className={`w-full rounded-lg border p-2 ${
              isEditing
                ? "border-gray-300 bg-white"
                : "cursor-not-allowed border-gray-200 bg-gray-100"
            }`}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-600">
            New Password
          </label>
          <input
            type="password"
            id="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            disabled={!isEditing}
            placeholder={isEditing ? "Enter new password" : "********"}
            className={`w-full rounded-lg border p-2 ${
              isEditing
                ? "border-gray-300 bg-white"
                : "cursor-not-allowed border-gray-200 bg-gray-100"
            }`}
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            id="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
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
