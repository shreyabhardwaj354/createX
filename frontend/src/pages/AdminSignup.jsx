
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"

export default function InstructorSignup() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: undefined,
    }));

    setError("");
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrors({});
    setError("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:3000/admin/signup", form);
      console.log(response);
      navigate("/admin/login", {
        state: { message: "Account created! Please log in." },
      });
    } catch (err) {
      const data = err.response?.data;
      console.log(err);
      setError(data?.error || "Unable to create your account. Please try again.");
      setErrors(data?.fieldErrors || {});
    } finally {
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-[#d6dfd5] bg-[#fbfaf5] px-4 py-3 text-[#183e3a] outline-none transition placeholder:text-[#8b9b91] focus:border-[#245b50] focus:ring-2 focus:ring-[#245b50]/15";

  return (
    <div className="min-h-screen bg-[#dce8d8] px-4 py-10 text-[#183e3a]">
      <div className="mx-auto grid min-h-[80vh] max-w-5xl overflow-hidden rounded-[2rem] bg-[#fbfaf5] shadow-xl shadow-[#244d40]/10 md:grid-cols-2">
        {/* Brand panel */}
        <div className="relative flex flex-col justify-between overflow-hidden bg-[#214f46] p-8 text-[#fbfaf5] md:p-12">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full border-[35px] border-[#e8a15b]/20" />
          <div className="absolute -bottom-20 -left-16 h-64 w-64 rounded-full bg-[#9caf96]/15" />

          <Link to="/" className="relative text-2xl font-bold tracking-tight">
            course<span className="text-[#efa65e]">X</span>
          </Link>

          <div className="relative my-12">
            <span className="mb-5 inline-block rounded-full border border-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-[#e9b779]">
              Instructor studio
            </span>

            <h1 className="max-w-sm text-4xl font-semibold leading-tight md:text-5xl">
              Turn what you know into something valuable.
            </h1>

            <p className="mt-5 max-w-sm leading-7 text-[#d4e0d6]">
              Create courses, share your expertise, and help learners take
              their next step with Course X.
            </p>
          </div>

          <p className="relative text-sm text-[#d4e0d6]">
            Your knowledge deserves a classroom.
          </p>
        </div>

        {/* Signup form */}
        <div className="flex items-center justify-center p-6 py-12 sm:p-10 md:p-12">
          <div className="w-full max-w-md">
            <div className="mb-8">
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#c77c3c]">
                Get started
              </p>
              <h2 className="text-3xl font-bold tracking-tight">
                Create instructor account
              </h2>
              <p className="mt-2 text-sm leading-6 text-[#687b70]">
                Set up your account to start managing your courses.
              </p>
            </div>

            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="mb-2 block text-sm font-medium">
                    First name
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="First name"
                    autoComplete="given-name"
                    required
                  />
                  {errors.firstName?.map((msg, i) => (
                    <p key={i} className="mt-1 text-xs text-red-600">{msg}</p>
                  ))}
                </div>

                <div>
                  <label htmlFor="lastName" className="mb-2 block text-sm font-medium">
                    Last name
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Last name"
                    autoComplete="family-name"
                    required
                  />
                  {errors.lastName?.map((msg, i) => (
                    <p key={i} className="mt-1 text-xs text-red-600">{msg}</p>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="you@example.com"
                  autoComplete="email"
                  required
                />
                {errors.email?.map((msg, i) => (
                  <p key={i} className="mt-1 text-xs text-red-600">{msg}</p>
                ))}
              </div>

              <div>
                <label htmlFor="password" className="mb-2 block text-sm font-medium">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                  className={inputClass}
                  placeholder="Create a strong password"
                  autoComplete="new-password"
                  minLength={8}
                  required
                />
                <p className="mt-2 text-xs leading-5 text-[#718177]">
                  Use 8–30 characters, including uppercase, lowercase, and a special character.
                </p>
                {errors.password?.map((msg, i) => (
                  <p key={i} className="mt-1 text-xs text-red-600">{msg}</p>
                ))}
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 w-full rounded-xl bg-[#214f46] px-5 py-3.5 font-semibold text-white transition hover:bg-[#183e37] focus:outline-none focus:ring-4 focus:ring-[#214f46]/20 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create instructor account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-[#687b70]">
              Already have an account?{" "}
              <Link
                to="/admin/login"
                className="font-semibold text-[#214f46] underline decoration-[#e5a05a] decoration-2 underline-offset-4 hover:text-[#c77c3c]"
              >
                Log in
              </Link>
            </p>

            <p className="mt-8 text-center text-xs text-[#89978e]">
              Are you here to learn?{" "}
              <Link to="/user/login" className="font-medium text-[#214f46] hover:underline">
                Learner login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
