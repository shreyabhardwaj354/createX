import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "learner",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRoleChange = (role) => {
    setFormData((prev) => ({
      ...prev,
      role,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setFieldErrors({});
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:3000/user/signup",
        formData
      );

      console.log("Signup successful:",response.status,  response.data);

      navigate("/login");
    } catch (err) {

        const data = err.response?.data;
        if(data?.fieldErrors){
            setFieldErrors(data.fieldErrors);          
        }
        console.log(data.fieldErrors, data.error)
        if(data?.error){
            setError(data.error);
        }else
            setError("Something went Wrong !")
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#B8CCA9] flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">

      {/* Signup Card */}
      <div className="w-full max-w-[460px]">

        <div className="rounded-[28px] bg-[#F8F7F0] px-6 py-8 shadow-xl sm:px-10 sm:py-10">

          {/* Heading */}
          <div className="mb-8">

            <h1 className="text-[32px] leading-tight font-semibold tracking-tight text-[#D98B25] sm:text-[36px]">
              Create an account
            </h1>

            <p className="mt-2 text-[15px] leading-6 text-[#64716B]">
              Start your learning journey with Course X.
            </p>

          </div>

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* First Name */}
            <div>
              <label
                htmlFor="firstName"
                className="mb-2 block text-sm font-medium text-[#29433D]"
              >
                First name
              </label>

              <input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="
                  w-full
                  rounded-xl
                  border border-[#D4DCCF]
                  bg-[#EEF2E9]
                  px-4 py-3
                  text-[15px]
                  text-[#29433D]
                  placeholder:text-[#9AA49D]
                  outline-none
                  transition
                  focus:border-[#174D46]
                  focus:ring-2
                  focus:ring-[#174D46]/10
                "
              />

            {fieldErrors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.firstName[0]}
                </p>
            )}

            </div>

            {/* LastName */}
            <div>
              <label
                htmlFor="lastName"
                className="mb-2 block text-sm font-medium text-[#29433D]"
              >
                Last name
              </label>

              <input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="
                  w-full
                  rounded-xl
                  border border-[#D4DCCF]
                  bg-[#EEF2E9]
                  px-4 py-3
                  text-[15px]
                  text-[#29433D]
                  placeholder:text-[#9AA49D]
                  outline-none
                  transition
                  focus:border-[#174D46]
                  focus:ring-2
                  focus:ring-[#174D46]/10
                "
              />

            {fieldErrors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.lastName[0]}
                </p>
            )}
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-[#29433D]"
              >
                Email
              </label>

              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="
                  w-full
                  rounded-xl
                  border border-[#D4DCCF]
                  bg-[#EEF2E9]
                  px-4 py-3
                  text-[15px]
                  text-[#29433D]
                  placeholder:text-[#9AA49D]
                  outline-none
                  transition
                  focus:border-[#174D46]
                  focus:ring-2
                  focus:ring-[#174D46]/10
                "
              />
            {fieldErrors.email && (
                <p className="mt-1 text-sm text-red-500">
                    {fieldErrors.email[0]}
                </p>
            )}
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-[#29433D]"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a password"
                required
                minLength={6}
                className="
                  w-full
                  rounded-xl
                  border border-[#D4DCCF]
                  bg-[#EEF2E9]
                  px-4 py-3
                  text-[15px]
                  text-[#29433D]
                  placeholder:text-[#9AA49D]
                  outline-none
                  transition
                  focus:border-[#174D46]
                  focus:ring-2
                  focus:ring-[#174D46]/10
                "
              />
             {fieldErrors.password && (
                    <div className="mt-1 space-y-1">
                        {fieldErrors.password.map((message, index) => (
                            <p
                                key={index}
                                className="text-sm text-red-500"
                            >
                                {message}
                            </p>
                        ))}
                    </div>
                )}
            </div>

            {/* Role */}
            <div>
              <p className="mb-2 text-sm font-medium text-[#29433D]">
                I want to join as
              </p>

              <div className="grid grid-cols-2 gap-3">

                {/* Learner */}
                <button
                  type="button"
                  onClick={() => handleRoleChange("learner")}
                  className={`
                    rounded-xl
                    border
                    px-4 py-3
                    text-sm
                    font-medium
                    transition
                    ${
                      formData.role === "learner"
                        ? "border-[#174D46] bg-[#174D46] text-white"
                        : "border-[#D4DCCF] bg-[#EEF2E9] text-[#29433D] hover:border-[#174D46]"
                    }
                  `}
                >
                  Learner
                </button>

                {/* Instructor */}
                <button
                  type="button"
                  onClick={() => handleRoleChange("instructor")}
                  className={`
                    rounded-xl
                    border
                    px-4 py-3
                    text-sm
                    font-medium
                    transition
                    ${
                      formData.role === "instructor"
                        ? "border-[#174D46] bg-[#174D46] text-white"
                        : "border-[#D4DCCF] bg-[#EEF2E9] text-[#29433D] hover:border-[#174D46]"
                    }
                  `}
                >
                  Instructor
                </button>

              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                rounded-xl
                bg-[#174D46]
                px-4 py-3
                text-[15px]
                font-semibold
                text-white
                transition
                hover:bg-[#123F3A]
                disabled:cursor-not-allowed
                disabled:opacity-60
              "
            >
              {loading ? "Creating account..." : "Create account"}
            </button>

          </form>

          {/* Login */}
          <div className="mt-7 border-t border-[#DDE2D8] pt-6 text-center">

            <p className="text-sm text-[#718079]">
              Already have an account?
            </p>

            <Link
              to="/user/login"
              className="
                mt-2
                inline-block
                text-sm
                font-semibold
                text-[#D98B25]
                transition
                hover:text-[#B96F16]
              "
            >
              Login
            </Link>

          </div>

        </div>

        {/* Bottom Brand */}
        <div className="mt-6 flex items-center justify-center gap-2">

          <span className="h-2 w-2 rounded-full bg-[#174D46]" />

          <span className="text-sm font-semibold text-[#174D46]">
            Course X.
          </span>

          <span className="h-2 w-2 rounded-full bg-[#D98B25]" />

        </div>

      </div>
    </div>
  );
};

export default Signup;