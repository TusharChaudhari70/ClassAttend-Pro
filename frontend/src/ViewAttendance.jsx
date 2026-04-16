import { useEffect, useState } from "react";
import { userAPI, subjectAPI, attendanceAPI } from "./apiService";
import AdminMenu from "./AdminMenu";
import FacultyMenu from "./FacultyMenu";

function ViewAttendance() {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const role = storedUser?.role;
  const username = storedUser?.username;

  const [faculties, setFaculties] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [attendance, setAttendance] = useState([]);

  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    userAPI.getAllFaculty()
      .then((res) => setFaculties(res.data))
      .catch((err) => console.error(err));

    subjectAPI.getAllSubjects()
      .then((res) => setSubjects(res.data))
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (role === "admin") {
      fetchAllAttendance();
    }
  }, [role]);

  const fetchAllAttendance = () => {
    attendanceAPI.getAllAttendanceRecords()
      .then((res) => setAttendance(res.data))
      .catch((err) => {
        console.error(err);
        setAttendance([]);
      });
  };

  const fetchFilteredAttendance = () => {
    if (role === "admin") {
      if (!selectedFaculty || !selectedSubject || !selectedDate) {
        alert("Please select faculty, subject and date");
        return;
      }

      attendanceAPI.getAttendance(selectedFaculty, selectedSubject, selectedDate)
        .then((res) => setAttendance(res.data))
        .catch((err) => {
          console.error(err);
          setAttendance([]);
        });

    } else {
      if (!selectedSubject || !selectedDate) {
        alert("Please select subject and date");
        return;
      }

      attendanceAPI.getAttendance(username, selectedSubject, selectedDate)
        .then((res) => setAttendance(res.data))
        .catch((err) => {
          console.error(err);
          setAttendance([]);
        });
    }
  };

  const handleShowStudents = (studentsList) => {
    setStudents(studentsList);
    setShowModal(true);
  };

  return (
    <>
      {role === "admin" ? <AdminMenu /> : <FacultyMenu />}

      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-purple-200 to-pink-200 flex flex-col items-center py-8">
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-6xl">

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end mb-6">

            <div>
              {role === "admin" && (
                <>
                  <label className="text-sm font-medium">Faculty</label>
                  <select
                    value={selectedFaculty}
                    onChange={(e) => setSelectedFaculty(e.target.value)}
                    className="border rounded px-3 py-2 w-full"
                  >
                    <option value="">Choose Faculty</option>
                    {faculties.map((f, i) => (
                      <option key={i} value={f.username}>
                        {f.firstName} {f.lastName}
                      </option>
                    ))}
                  </select>
                </>
              )}
            </div>

            <div>
              <label className="text-sm font-medium">Subject</label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              >
                <option value="">Choose Subject</option>
                {subjects.map((s, i) => (
                  <option key={i} value={s.id}>{s.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium">Date</label>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border rounded px-3 py-2 w-full"
              />
            </div>

            <div className="flex flex-col gap-2">
              {role === "admin" && (
                <button
                  onClick={fetchAllAttendance}
                  className="bg-green-600 text-white py-2 rounded hover:bg-green-700"
                >
                  Show All
                </button>
              )}

              <button
                onClick={fetchFilteredAttendance}
                className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Show
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white">
                  <th>#</th>
                  <th>Faculty</th>
                  <th>Subject</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Students</th>
                  <th>View</th>
                </tr>
              </thead>

              <tbody>
                {attendance.length === 0 ? (
                  <tr>
                    <td colSpan="7" className="text-center py-4">
                      No data
                    </td>
                  </tr>
                ) : (
                  attendance.map((a, i) => (
                    <tr key={a.id} className="border-b text-center">
                      <td>{i + 1}</td>
                      <td>{a.faculty?.firstName} {a.faculty?.lastName}</td>
                      <td>{a.subject?.name}</td>
                      <td>{a.date}</td>
                      <td>{a.time}</td>
                      <td>{a.numberOfStudents}</td>
                      <td>
                        <button
                          onClick={() => handleShowStudents(a.students)}
                          className="bg-indigo-600 text-white px-2 py-1 rounded"
                        >
                          Show
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* Modal */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/40">
            <div className="bg-white p-6 rounded shadow w-96">
              <div className="flex justify-between mb-3">
                <h3 className="font-bold">Students</h3>
                <button onClick={() => setShowModal(false)}>✕</button>
              </div>

              {students.length === 0 ? (
                <p>No students</p>
              ) : (
                students.map((s) => (
                  <div key={s.id}>{s.name}</div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default ViewAttendance;