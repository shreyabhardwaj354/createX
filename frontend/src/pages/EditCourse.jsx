
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

function EditCourse() {
  const { courseId } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    price: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fetch the existing course
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await axios.get(
          `http://localhost:3000/admin/course/${courseId}`,
          {withCredentials: true}
        );

        const course = res.data.course;

        setFormData({
          title: course.title || "",
          description: course.description || "",
          imageUrl: course.imageUrl || course.imageURL || "",
          price: course.price ?? "",
        });

      } catch (err) {
        setError(
          err.response?.data?.error ||
            "Failed to load course details."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCourse();
  }, [courseId]);

  // Update form values as the instructor types
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit the updated course
  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!formData.title.trim()) {
      setError("Course title is required.");
      return;
    }

    if (
      formData.price === "" ||
      !Number.isFinite(Number(formData.price)) ||
      Number(formData.price) < 0
    ) {
      setError("Please enter a valid, non-negative price.");
      return;
    }

    try {
      setSaving(true);

      const res = await axios.post(
        `http://localhost:3000/admin/edit/${courseId}`,
        {
          ...formData,
          title: formData.title.trim(),
          price: Number(formData.price),
        },
        {
          withCredentials: true,
        }
      );

      setFormData((prev) => ({
        ...prev,
        ...res.data.course,
        price: String(res.data.course.price ?? ""),
        imageUrl:
          res.data.course.imageUrl ||
          res.data.course.imageURL ||
          "",
      }));

      setSuccess("Course updated successfully!");
    } catch (err) {
      setError(
        err.response?.data?.error ||
          "Failed to update course. Please try again."
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F7F8F3]">
        <p className="text-lg text-[#214F46]">
          Loading course details...
        </p>
      </div>
    );
  }

  if (error && !formData.title) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#F7F8F3] px-6">
        <p className="text-center text-red-600">{error}</p>

        <button
          onClick={() => navigate(-1)}
          className="mt-5 rounded-xl bg-[#214F46] px-5 py-3 text-white"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F8F3] px-5 py-10 md:px-10">
      <div className="mx-auto max-w-3xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-[#64866A]">
              Instructor Dashboard
            </p>

            <h1 className="mt-2 text-3xl font-bold text-[#173F39] md:text-4xl">
              Edit Course
            </h1>

            <p className="mt-2 text-gray-600">
              Update your course information below.
            </p>
          </div>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="shrink-0 rounded-xl border border-[#DCE8D8] px-4 py-2 text-sm font-medium text-[#214F46] hover:bg-[#DCE8D8]"
          >
            Cancel
          </button>
        </div>

        {/* Form card */}
        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-[#E5E9DF] bg-white p-6 shadow-sm md:p-9"
        >
          {/* Title */}
          <div>
            <label
              htmlFor="title"
              className="mb-2 block text-sm font-semibold text-[#173F39]"
            >
              Course Title
            </label>

            <input
              id="title"
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#DCE8D8] px-4 py-3 outline-none transition focus:border-[#64866A] focus:ring-2 focus:ring-[#DCE8D8]"
              placeholder="e.g. Complete React Course"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold text-[#173F39]"
            >
              Description
            </label>

            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5}
              className="w-full resize-y rounded-xl border border-[#DCE8D8] px-4 py-3 outline-none transition focus:border-[#64866A] focus:ring-2 focus:ring-[#DCE8D8]"
              placeholder="What will students learn?"
            />
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-sm font-semibold text-[#173F39]"
            >
              Course Thumbnail URL
            </label>

            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full rounded-xl border border-[#DCE8D8] px-4 py-3 outline-none transition focus:border-[#64866A] focus:ring-2 focus:ring-[#DCE8D8]"
              placeholder="https://example.com/image.jpg"
            />

            {formData.imageUrl && (
              <div className="mt-4">
                <p className="mb-2 text-xs text-gray-500">
                  Thumbnail preview
                </p>

                <img
                  src={formData.imageUrl}
                  alt="Course thumbnail preview"
                  className="h-44 w-full rounded-xl bg-[#DCE8D8] object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                  onLoad={(e) => {
                    e.currentTarget.style.display = "block";
                  }}
                />
              </div>
            )}
          </div>

          {/* Price */}
          <div>
            <label
              htmlFor="price"
              className="mb-2 block text-sm font-semibold text-[#173F39]"
            >
              Price (₹)
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full rounded-xl border border-[#DCE8D8] px-4 py-3 outline-none transition focus:border-[#64866A] focus:ring-2 focus:ring-[#DCE8D8]"
              placeholder="499"
            />
          </div>

          {/* Error message */}
          {error && (
            <div
              role="alert"
              className="rounded-xl bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          {/* Success message */}
          {success && (
            <div
              role="status"
              className="rounded-xl bg-[#DCE8D8] p-4 text-sm font-medium text-[#214F46]"
            >
              {success}
            </div>
          )}

          {/* Buttons */}
          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 rounded-xl bg-[#214F46] px-6 py-4 font-semibold text-white transition hover:bg-[#173F39] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving Changes..." : "Save Changes"}
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={() => navigate("/admin/dashboard")}
              className="rounded-xl border border-[#DCE8D8] px-6 py-4 font-semibold text-[#214F46] transition hover:bg-[#F7F8F3] disabled:opacity-60"
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditCourse;
