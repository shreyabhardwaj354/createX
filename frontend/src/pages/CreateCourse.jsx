
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const initialForm = {
  title: "",
  description: "",
  price: "",
  imageUrl: "",
  level: "Beginner",
};

const inputClass =
  "w-full rounded-xl border border-[#d6dfd5] bg-[#fbfaf5] px-4 py-3 text-[#183e3a] outline-none placeholder:text-[#8b9b91] focus:border-[#214f46] focus:ring-2 focus:ring-[#214f46]/15";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setError("");

    if (Number(form.price) < 0 || form.price.trim() === "") {
      setErrors({ price: ["Enter a valid, non-negative price."] });
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/admin/createCourse", {
        ...form,
        price: Number(form.price)
      },{withCredentials: true});

      navigate("/admin/dashboard", {
        state: { message: "Your course was created successfully." },
      });
    } catch (err) {
      const data = err.response?.data;
      setError(data?.error || "Could not create your course. Please try again.");
      setErrors(data?.fieldErrors || {});
    } finally {
      setLoading(false);
    }
  }

  function fieldError(name) {
    const messages = errors[name];
    if (!messages) return null;

    return (
      <p className="mt-1 text-sm text-red-600">
        {Array.isArray(messages) ? messages.join(", ") : messages}
      </p>
    );
  }

  return (
    <div className="min-h-screen bg-[#dce8d8] text-[#183e3a]">
      <header className="border-b border-[#cbd8c8] bg-[#fbfaf5]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <Link to="/instructor/dashboard" className="text-2xl font-bold">
            course<span className="text-[#d58b4b]">X</span>
          </Link>
          <Link
            to="/admin/dashboard"
            className="text-sm font-semibold text-[#214f46] hover:underline"
          >
            ← Back to dashboard
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
        <div className="mb-8">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#c77c3c]">
            Instructor studio
          </p>
          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Create a new course
          </h1>
          <p className="mt-3 text-[#687b70]">
            Share your knowledge. Start with the basic details of your course.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-[#e1e7dd] bg-[#fbfaf5] p-5 shadow-lg shadow-[#214f46]/5 sm:p-8"
        >
          {error && (
            <div
              role="alert"
              className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
              {error}
            </div>
          )}

          <div>
            <label htmlFor="title" className="mb-2 block text-sm font-semibold">
              Course title
            </label>
            <input
              id="title"
              name="title"
              value={form.title}
              onChange={handleChange}
              className={inputClass}
              placeholder="e.g. React for Beginners"
              minLength={8}
              maxLength={100}
              required
            />
            {fieldError("title")}
          </div>

          <div>
            <label
              htmlFor="description"
              className="mb-2 block text-sm font-semibold"
            >
              Course description
            </label>
            <textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleChange}
              className={`${inputClass} min-h-32 resize-y`}
              placeholder="What will learners gain from this course?"
              maxLength={150}
              required
            />
            <p className="mt-1 text-right text-xs text-[#849187]">
              {form.description.length}/150 characters
            </p>
            {fieldError("description")}
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="price" className="mb-2 block text-sm font-semibold">
                Price (₹)
              </label>
              <input
                id="price"
                name="price"
                type="number"
                value={form.price}
                onChange={handleChange}
                className={inputClass}
                placeholder="499"
                min="0"
                step="0.01"
                required
              />
              <p className="mt-1 text-xs text-[#849187]">
                Enter 0 for a free course.
              </p>
              {fieldError("price")}
            </div>

            <div>
              <label htmlFor="level" className="mb-2 block text-sm font-semibold">
                Course level
              </label>
              <select
                id="level"
                name="level"
                value={form.level}
                onChange={handleChange}
                className={inputClass}
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              {fieldError("level")}
            </div>
          </div>

          <div>
            <label
              htmlFor="imageUrl"
              className="mb-2 block text-sm font-semibold"
            >
              Course thumbnail URL
            </label>
            <input
              id="imageUrl"
              name="imageUrl"
              type="url"
              value={form.imageUrl}
              onChange={handleChange}
              className={inputClass}
              placeholder="https://example.com/course-image.jpg"
              required
            />
            {fieldError("imageUrl")}

            {form.imageUrl && (
              <div className="mt-4 overflow-hidden rounded-xl border border-[#d6dfd5]">
                <img
                  src={form.imageUrl}
                  alt="Course thumbnail preview"
                  className="h-48 w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-[#e4e8df] pt-6 sm:flex-row sm:justify-end">
            <Link
              to="/instructor/dashboard"
              className="rounded-xl border border-[#d6dfd5] px-6 py-3 text-center font-semibold text-[#214f46] hover:bg-[#edf2e9]"
            >
              Cancel
            </Link>

            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-[#214f46] px-7 py-3 font-semibold text-white transition hover:bg-[#183e37] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating course..." : "Create course"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}
