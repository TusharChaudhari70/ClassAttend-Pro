import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function FacultyMenu() {
  const [studentMenuOpen, setStudentMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.replace("/login");
  };

  return (
    <div className="bg-gray-50">
      <nav className="bg-white shadow flex items-center justify-between px-6 py-4">
        <div className="text-lg font-bold text-blue-600">
          ClassAttend <span className="text-xs bg-blue-600 text-white px-2 py-1 rounded ml-1">PRO</span>
        </div>

        <div className="flex items-center gap-6">
          <Link to="/faculty-dashboard" className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition">
            Dashboard
          </Link>

          <div className="relative">
            <button
              className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition flex items-center gap-1"
              onClick={() => setStudentMenuOpen((open) => !open)}
            >
              Students ▼
            </button>

            {studentMenuOpen && (
              <div className="absolute left-0 mt-2 w-40 bg-white border rounded shadow-lg z-10">
                <Link to="/add-student" className="block px-4 py-2 hover:bg-blue-100 transition">
                  Add Students
                </Link>
                <Link to="/all-students" className="block px-4 py-2 hover:bg-blue-100 transition">
                  All Students
                </Link>
              </div>
            )}
          </div>

          <Link to="/mark-attendance" className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition">
            Mark Attendance
          </Link>

          <Link to="/view-attendance" className="font-semibold text-blue-600 px-3 py-2 rounded hover:bg-blue-50 transition">
            View Attendance
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link to="/my-profile" className="font-semibold text-gray-700 px-3 py-2 rounded hover:bg-gray-100 transition">
            My Profile
          </Link>

          <button onClick={handleLogout} className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600 transition">
            Logout
          </button>
        </div>
      </nav>
    </div>
  );
}

export default FacultyMenu;