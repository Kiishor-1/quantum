import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PiUserCircleFill } from "react-icons/pi";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { isValidCredentials } from "../utility/isValidCredentials";
import toast from "react-hot-toast";
import { login, register } from "../store/authSlice";

const AuthPage = ({ type }) => {
    const isLogin = type === "login";
    const [formData, setFormData] = useState({
        name: "",
        dob: "",
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user, token, isLoading, error } = useSelector((state) => state.auth);

    const [isDisabled, setIsDisabled] = useState(true);

    useEffect(() => {
        const { email, password } = formData;
        setIsDisabled(!email || !password || isLoading);
    }, [formData, isLoading]);

    useEffect(() => {
        if (user && token) {
            navigate("/");
        }
    }, [user, token, navigate]);

    useEffect(() => {
        if (error) {
            toast.error(error);
        }
    }, [error]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newErrors = {};
        if (!formData.email) newErrors.email = "Email is required";
        if (!formData.password) newErrors.password = "Password is required";
        else if (!isValidCredentials(formData.password, formData.email)) {
            return;
        }
        const firstError = Object.values(newErrors)[0];
        if (firstError) {
            toast.error(firstError);
            return;
        }

        if (isLogin) {
            try {
                await dispatch(login(formData));
                navigate("/");
            } catch (err) {
                toast.error(err || "Login failed");
            }
        } else {
            try {
                await dispatch(register(formData));
                setFormData({ name: "", dob: "", email: "", password: "" });
                navigate("/login");
            } catch (err) {
                toast.error(err || "Registration failed");
            }
        }
    };

    return (
        <div className="flex flex-col md:p-0 p-4 items-center justify-center h-screen bg-gradient-to-b from-teal-600 to-teal-800">
            <div className="relative md:w-[40%] w-full bg-gray-900 rounded-lg">
                <h2 className="absolute left-0 right-0 top-[-1rem] z-[3] text-center w-[50%] mx-auto text-xl bg-teal-400 p-4 uppercase mb-4">
                    {isLogin ? "SIGN IN" : "SIGN UP"}
                </h2>
                <div className="relative w-full bg-gray-900 h-40 rounded-lg">
                    <img
                        className="absolute bottom-0 z-[2] opacity-30"
                        src="./waveLeft.svg"
                        alt=""
                    />
                    <img
                        className="absolute bottom-0 z-[2] opacity-70"
                        src="./wavePlane.svg"
                        alt=""
                    />
                    <img
                        className="absolute bottom-0 z-[2] opacity-40"
                        src="./waveRight.svg"
                        alt=""
                    />
                </div>
                <div className="relative p-8 py-16 rounded-lg shadow-lg w-full text-white">
                    <div className="absolute left-0 right-0 top-[-4rem] z-[5] text-center">
                        <PiUserCircleFill className="text-[8rem] w-full" />
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {!isLogin && (
                            <input
                                type="text"
                                name="name"
                                placeholder="Name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 focus:outline-none"
                                required
                            />
                        )}
                        {!isLogin && (
                            <input
                                type="date"
                                name="dob"
                                value={formData.dob}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 focus:outline-none"
                                required
                            />
                        )}
                        <input
                            type="email"
                            name="email"
                            placeholder="Email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full p-2 rounded bg-gray-700 focus:outline-none"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-2 rounded bg-gray-700 focus:outline-none pr-10"
                                required
                            />
                            <button
                                type="button"
                                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
                            </button>
                        </div>
                        <button
                            type="submit"
                            className={`w-full p-2 rounded font-bold ${isDisabled
                                    ? "bg-gray-500 cursor-not-allowed"
                                    : "bg-teal-500 hover:bg-teal-600"
                                }`}
                            disabled={isDisabled}
                        >
                            {isLoading
                                ? isLogin
                                    ? "Logging in..."
                                    : "Registering..."
                                : isLogin
                                    ? "LOGIN"
                                    : "REGISTER"}
                        </button>
                    </form>
                    <div className="text-center mt-4">
                        {isLogin ? (
                            <p>
                                Don't have an account?{" "}
                                <Link to="/register" className="text-teal-400">
                                    Register
                                </Link>
                            </p>
                        ) : (
                            <p>
                                Already have an account?{" "}
                                <Link to="/login" className="text-teal-400">
                                    Login
                                </Link>
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthPage;