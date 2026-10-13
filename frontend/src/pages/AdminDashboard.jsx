
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const res = await axios.get(
          "http://localhost:3000/admin/dashboard",
          {},
          { withCredentials: true }
        );

        setCourses(res.data.courses || []);
      } catch (err) {
        console.error("Dashboard error:", err);

        if (err.response?.status === 401) {
          navigate("/admin/login", { replace: true });
          return;
        }

        setError(
          err.response?.data?.error ||
          "Could not load your courses. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/admin/logout",
        { withCredentials: true }
      );
      navigate("/admin/login", { replace: true });
    } catch (err) {
      console.error("Logout failed:", err);
      setError("Logout failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-[#dce8d8] text-[#173F39]">
      {/* Navbar */}
      <header className="border-b border-[#214f46]/10 bg-[#fbfaf5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="text-2xl font-extrabold tracking-tight"
          >
            Course <span className="text-[#D9953D]">X</span>
          </button>

          <div className="flex items-center gap-3 sm:gap-5">
            <span className="hidden text-sm font-medium sm:inline">
              Instructor Dashboard
            </span>

            <button
              onClick={handleLogout}
              className="rounded-xl border border-[#214f46]/20 px-4 py-2 text-sm font-semibold transition hover:bg-[#dce8d8]"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-7xl px-5 py-10 sm:px-8">
        {/* Welcome section */}
        <section className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-[0.18em] text-[#52776a]">
              Your teaching space
            </p>

            <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
              Instructor Dashboard
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#526b60] sm:text-base">
              Manage your courses, organize your content, and create
              learning experiences for your students.
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/createCourse")}
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-[#214f46] px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-[#173F39]"
          >
            <span className="text-xl">+</span>
            Create a course
          </button>
        </section>

        {/* Stats */}
        <section className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total courses"
            value={loading ? "—" : courses.length}
            description="Courses you've created"
            symbol="▤"
          />

          <StatCard
            label="Published courses"
            value={
              loading
                ? "—"
                : courses.filter((course) => course.status === "published")
                    .length
            }
            description="Available to learners"
            symbol="✓"
          />

          <StatCard
            label="Course levels"
            value={
              loading
                ? "—"
                : new Set(courses.map((course) => course.level).filter(Boolean))
                    .size
            }
            description="Different levels covered"
            symbol="↗"
          />
        </section>

        {/* Courses heading */}
        <section className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold">Your courses</h2>
            <p className="mt-1 text-sm text-[#526b60]">
              All your created courses in one place.
            </p>
          </div>

          <span className="rounded-full bg-[#fbfaf5] px-4 py-2 text-sm font-semibold">
            {loading ? "Loading..." : `${courses.length} courses`}
          </span>
        </section>

        {/* Loading state */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="animate-pulse overflow-hidden rounded-2xl bg-[#fbfaf5] p-4"
              >
                <div className="h-44 rounded-xl bg-[#dce8d8]" />
                <div className="mt-4 h-5 w-3/4 rounded bg-[#dce8d8]" />
                <div className="mt-3 h-4 w-1/2 rounded bg-[#dce8d8]" />
              </div>
            ))}
          </div>
        )}

        {/* Error state */}
        {!loading && error && (
          <div className="rounded-2xl border border-red-200 bg-[#fbfaf5] p-6">
            <p className="font-semibold text-red-700">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-lg bg-[#214f46] px-4 py-2 text-sm font-semibold text-white"
            >
              Try again
            </button>
          </div>
        )}

        {/* Empty state */}
        {!loading && !error && courses.length === 0 && (
          <div className="rounded-3xl border border-[#214f46]/10 bg-[#fbfaf5] px-6 py-14 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#dce8d8] text-3xl">
              📚
            </div>

            <h3 className="mt-5 text-xl font-bold">
              Your teaching journey starts here
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#526b60]">
              You haven't created any courses yet. Create your first
              course and it will appear here.
            </p>

            <button
              onClick={() => navigate("/create/course")}
              className="mt-6 rounded-xl bg-[#214f46] px-6 py-3 font-semibold text-white transition hover:bg-[#173F39]"
            >
              Create your first course
            </button>
          </div>
        )}

        {/* Course cards */}
        {!loading && !error && courses.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course._id}
                className="group overflow-hidden rounded-2xl border border-[#214f46]/10 bg-[#fbfaf5] shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-lg"
              >
                {/* Course image */}
                <div className="relative h-48 overflow-hidden bg-[#e7ece2]">
                  {course.imageUrl || course.imageURL ? (
                    <img
                      src={course.imageUrl || course.imageURL}
                      alt={course.title}
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl text-[#52776a]">
                      📖
                    </div>
                  )}

                  {course.level && (
                    <span className="absolute left-3 top-3 rounded-full bg-[#fbfaf5]/95 px-3 py-1 text-xs font-bold capitalize text-[#214f46]">
                      {course.level}
                    </span>
                  )}
                </div>

                {/* Course details */}
                <div className="p-5">
                  <h3 className="line-clamp-2 min-h-14 text-lg font-bold">
                    {course.title}
                  </h3>

                  <p className="mt-2 line-clamp-3 min-h-[4.5rem] text-sm leading-6 text-[#526b60]">
                    {course.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-[#214f46]/10 pt-4">
                    <div>
                      <p className="text-xs text-[#526b60]">Course price</p>
                      <p className="mt-1 text-xl font-extrabold">
                        {course.price === 0
                          ? "Free"
                          : `₹${Number(course.price).toLocaleString("en-IN")}`}
                      </p>
                    </div>

                    <button
                      onClick={() =>
                        navigate(`/admin/courses/${course._id}`)
                      }
                      className="rounded-xl bg-[#214f46] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#173F39]"
                    >
                      Manage course
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function StatCard({ label, value, description, symbol }) {
  return (
    <div className="rounded-2xl border border-[#214f46]/10 bg-[#fbfaf5] p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-[#526b60]">{label}</p>
          <p className="mt-3 text-3xl font-extrabold">{value}</p>
        </div>

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#dce8d8] text-xl font-bold text-[#214f46]">
          {symbol}
        </div>
      </div>

      <p className="mt-3 text-xs text-[#526b60]">{description}</p>
    </div>
  );
}
