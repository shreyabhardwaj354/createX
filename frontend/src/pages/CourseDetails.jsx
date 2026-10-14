import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:3000/admin/course/${id}`,
          {withCredentials: true}
        );

        setCourse(res.data.course);
      } catch (err) {
        setError(
          err.response?.data?.error ||
          "Unable to load course. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F8F3] flex items-center justify-center">
        <p className="text-[#214F46] text-lg">
          Loading course...
        </p>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="min-h-screen bg-[#F7F8F3] flex flex-col items-center justify-center px-6">
        <h2 className="text-2xl font-bold text-[#173F39]">
          Course not found
        </h2>

        <p className="mt-3 text-gray-600 text-center">
          {error || "This course could not be found."}
        </p>

        <button
          onClick={() => navigate(-1)}
          className="mt-6 rounded-xl bg-[#214F46] px-6 py-3 text-white hover:bg-[#173F39]"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3]">
      {/* Navbar */}
      <nav className="flex items-center justify-between border-b border-[#DCE8D8] bg-white px-6 py-5 md:px-12">
        <button
          onClick={() => navigate("/")}
          className="text-2xl font-bold tracking-tight text-[#214F46]"
        >
          Course X<span className="text-[#D9953D]">.</span>
        </button>

        <button
          onClick={() => navigate(-1)}
          className="rounded-lg border border-[#DCE8D8] px-4 py-2 text-sm font-medium text-[#214F46] hover:bg-[#F7F8F3]"
        >
          Back
        </button>
      </nav>

      {/* Course content */}
      <main className="mx-auto max-w-6xl px-6 py-10 md:px-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {/* Course image */}
          <div className="overflow-hidden rounded-3xl bg-[#DCE8D8] shadow-sm">
            {course.imageUrl || course.imageURL ? (
              <img
                src={course.imageUrl || course.imageURL}
                alt={course.title}
                className="h-72 w-full object-cover md:h-[420px]"
              />
            ) : (
              <div className="flex h-72 items-center justify-center md:h-[420px]">
                <span className="text-7xl">📚</span>
              </div>
            )}
          </div>

          {/* Course information */}
          <div className="flex flex-col">
            <span className="w-fit rounded-full bg-[#DCE8D8] px-4 py-2 text-sm font-semibold text-[#214F46]">
              {course.level || "All levels"}
            </span>

            <h1 className="mt-5 text-3xl font-bold leading-tight text-[#173F39] md:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 whitespace-pre-line text-base leading-8 text-gray-600">
              {course.description || "No description available yet."}
            </p>

            <div className="mt-8 rounded-2xl border border-[#DCE8D8] bg-white p-6">
              <p className="text-sm font-medium text-gray-500">
                Course price
              </p>

              <p className="mt-2 text-4xl font-bold text-[#214F46]">
                {course.price != null
                  ? `₹${course.price}`
                  : "Price unavailable"}
              </p>

              <button
                onClick={() => {
                  // Enrollment/purchase will be implemented later.
                  alert("Edit will be available soon!");
                }}
                className="mt-6 w-full rounded-xl bg-[#214F46] px-6 py-4 font-semibold text-white transition hover:bg-[#173F39]"
              >
                Edit Course
              </button>

              <p className="mt-3 text-center text-xs text-gray-500">
                Start learning with Course X
              </p>
            </div>

            <div className="mt-8">
              <h2 className="text-xl font-bold text-[#173F39]">
                About this course
              </h2>

              <p className="mt-3 leading-7 text-gray-600">
                Explore the course description above to learn
                what this course covers and whether it suits
                your learning goals.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CourseDetails;