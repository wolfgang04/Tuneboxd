const Notifications = () => {
  return (
    <div>
      <h2 className="mb-4 text-xl font-semibold">Notifications</h2>
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <span>Email Notifications</span>
          <input type="checkbox" className="h-6 w-6" />
        </div>
        <div className="flex items-center justify-between">
          <span>Push Notifications</span>
          <input type="checkbox" className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
};

export default Notifications;
