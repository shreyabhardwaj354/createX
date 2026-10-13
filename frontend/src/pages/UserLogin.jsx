import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
    const navigate = useNavigate();

    const [input, setInput] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        try {
            const response = await axios.post(
                "http://localhost:3000/user/login",
                input,
                {
                    withCredentials: true
                }
            );

            const message = response.data.message;

            if (message === "Login Sucessfull !") {
                navigate("/courses");
            } else {
                setMessage(message || "Login failed.");
            }

        } catch (error) {
            console.error(error);

            setMessage(
                error.response?.data?.message ||
                "Something went wrong. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <main
            className="
                min-h-screen
                w-full
                bg-[#B4C7AC]
                flex
                items-center
                justify-center
                px-4
                py-8
                sm:px-6
                sm:py-10
                md:px-8
                lg:px-12
            "
        >
            <section
                className="
                    w-full
                    max-w-[420px]
                    sm:max-w-[460px]
                    md:max-w-[480px]
                    lg:max-w-[500px]
                "
            >

                {/* Login Card */}
                <div
                    className="
                        w-full
                        bg-[#F7F8F3]
                        rounded-[24px]
                        sm:rounded-[28px]
                        md:rounded-[32px]
                        px-5
                        py-7
                        sm:px-8
                        sm:py-9
                        md:px-10
                        md:py-10
                        lg:px-12
                        lg:py-11
                        shadow-[0_20px_50px_rgba(35,55,45,0.12)]
                    "
                >

                    {/* Heading */}
                    <div className="mb-7 sm:mb-8 md:mb-9">

                        <h1
                            className="
                                text-3xl
                                sm:text-4xl
                                md:text-[42px]
                                lg:text-5xl
                                leading-tight
                                font-semibold
                                tracking-tight
                                text-[#D9953D]
                            "
                        >
                            Login
                        </h1>

                        <p
                            className="
                                mt-2
                                sm:mt-3
                                text-sm
                                sm:text-base
                                leading-6
                                text-[#68736B]
                                max-w-sm
                            "
                        >
                            Continue your learning journey with Course X.
                        </p>

                    </div>


                    {/* Login Form */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5 sm:space-y-6"
                    >

                        {/* Email */}
                        <div className="w-full">

                            <label
                                htmlFor="email"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#263E3A]
                                "
                            >
                                Email
                            </label>

                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={input.email}
                                onChange={handleChange}
                                placeholder="Enter your email"
                                required
                                autoComplete="email"
                                className="
                                    block
                                    w-full
                                    min-w-0
                                    h-12
                                    sm:h-[52px]
                                    px-4
                                    sm:px-5
                                    rounded-xl
                                    bg-[#EEF2EA]
                                    border
                                    border-[#D5DDD0]
                                    text-[#173630]
                                    text-sm
                                    sm:text-base
                                    placeholder:text-[#9AA198]
                                    outline-none
                                    transition-all
                                    duration-200
                                    focus:bg-white
                                    focus:border-[#D9953D]
                                    focus:ring-4
                                    focus:ring-[#D9953D]/10
                                "
                            />

                        </div>


                        {/* Password */}
                        <div className="w-full">

                            <label
                                htmlFor="password"
                                className="
                                    block
                                    mb-2
                                    text-sm
                                    font-medium
                                    text-[#263E3A]
                                "
                            >
                                Password
                            </label>

                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={input.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                required
                                autoComplete="current-password"
                                className="
                                    block
                                    w-full
                                    min-w-0
                                    h-12
                                    sm:h-[52px]
                                    px-4
                                    sm:px-5
                                    rounded-xl
                                    bg-[#EEF2EA]
                                    border
                                    border-[#D5DDD0]
                                    text-[#173630]
                                    text-sm
                                    sm:text-base
                                    placeholder:text-[#9AA198]
                                    outline-none
                                    transition-all
                                    duration-200
                                    focus:bg-white
                                    focus:border-[#D9953D]
                                    focus:ring-4
                                    focus:ring-[#D9953D]/10
                                "
                            />

                        </div>


                        {/* Login Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                w-full
                                h-12
                                sm:h-[52px]
                                rounded-xl
                                bg-[#173F39]
                                text-[#F7F8F3]
                                text-sm
                                sm:text-base
                                font-semibold
                                hover:bg-[#24564F]
                                disabled:opacity-60
                                disabled:cursor-not-allowed
                                active:scale-[0.99]
                                transition-all
                                duration-200
                                cursor-pointer
                                touch-manipulation
                            "
                        >
                            {loading ? "Logging in..." : "Login"}
                            {!loading }
                        </button>

                    </form>


                    {/* Server Message */}
                    {message && (
                        <div
                            className="
                                mt-5
                                px-4
                                py-3
                                rounded-xl
                                bg-[#EEF2EA]
                                border
                                border-[#D5DDD0]
                                text-sm
                                text-[#35534C]
                                break-words
                            "
                        >
                            {message}
                        </div>
                    )}


                    {/* Signup */}
                    <div
                        className="
                            mt-7
                            sm:mt-8
                            pt-5
                            sm:pt-6
                            border-t
                            border-[#E1E5DE]
                            text-center
                        "
                    >

                        <p
                            className="
                                text-sm
                                sm:text-base
                                text-[#7A817A]
                            "
                        >
                            Don't have an account?
                        </p>

                        <Link
                            to="/user/signup"
                            className="
                                inline-block
                                mt-2
                                mb-6
                                text-sm
                                sm:text-base
                                font-semibold
                                text-[#D9953D]
                                hover:text-[#B8782C]
                                transition-colors
                                duration-200
                                py-1
                            "
                        >
                            Create an account 
                        </Link>

                        <p
                            className="
                                text-sm
                                sm:text-base
                                text-[#7A817A]
                            "
                        >
                            Explore Instructor's side
                        </p>

                        <Link
                            to="/admin/signup"
                            className="
                                inline-block
                                mt-2
                                text-sm
                                sm:text-base
                                font-semibold
                                text-[#D9953D]
                                hover:text-[#B8782C]
                                transition-colors
                                duration-200
                                py-1
                            "
                        >
                            Create an account 
                        </Link>

                    </div>

                </div>


                {/* Branding */}
                <div
                    className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        mt-5
                        sm:mt-6
                    "
                >

                    <span
                        className="
                            w-1.5
                            h-1.5
                            sm:w-2
                            sm:h-2
                            rounded-full
                            bg-[#173F39]
                        "
                    />

                    <span
                        className="
                            text-xs
                            sm:text-sm
                            font-semibold
                            text-[#173F39]
                        "
                    >
                        Course X.
                    </span>

                    <span
                        className="
                            w-1.5
                            h-1.5
                            sm:w-2
                            sm:h-2
                            rounded-full
                            bg-[#D9953D]
                        "
                    />

                </div>

            </section>
        </main>
    );
}

export default Login;