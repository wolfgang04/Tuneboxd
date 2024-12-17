const Preferences = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">App Preferences</h2>
      <div>
        <label htmlFor="theme" className="block text-gray-600">
          Theme
        </label>
        <select
          id="theme"
          className="w-full rounded-lg border border-gray-300 p-2"
        >
          <option value="light">Light</option>
          <option value="dark">Dark</option>
        </select>
      </div>
    </div>
  );
};

export default Preferences;
