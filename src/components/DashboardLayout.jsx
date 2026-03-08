import NotificationBell from "./NotificationBell";

export default function DashboardLayout({ children, user, onLogout }) {
  return (
    <div className="dashboard-bg">
      <div className="max-w-6xl mx-auto">
        <div className="relative bg-white/80 backdrop-blur-md shadow-sm rounded-xl px-6 py-4 flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Escrow Dashboard
            </h1>

            <p className="text-gray-500 text-sm">
              Welcome <span className="font-semibold">{user?.name}</span>{" "}
              <span className="text-indigo-600">
                ({user?.role?.replace("ROLE_", "")})
              </span>
            </p>
          </div>

          <div className="flex items-center gap-5">
            <NotificationBell userId={user?.id || user?._id} />

            <button
              onClick={onLogout}
              className="bg-gray-800 text-white px-5 py-2 rounded-lg hover:bg-black transition-all duration-300 hover:scale-105 shadow-md"
            >
              Logout
            </button>
          </div>
        </div>

        {children}
      </div>
    </div>
  );
}
