const Privacy = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Privacy</h2>
      <div>
        <label htmlFor="profile-visibility" className="block text-gray-600">
          Profile Visibility
        </label>
        <select
          id="profile-visibility"
          className="w-full rounded-lg border border-gray-300 p-2"
        >
          <option value="public">Public</option>
          <option value="private">Private</option>
        </select>
      </div>
    </div>
  );
};

export default Privacy;
