import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { logout } from "../store/authSlice";
import { MdOutlineLogout } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";

export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch(); // Get dispatch function
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleLogout = () => {
    dispatch(logout()); // Dispatch logout action
    navigate("/login"); // Redirect to login page after logout
  };

  const navItems = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "Users", path: "/", icon: <FaUsers /> },
    { name: "Settings", path: "/settings", icon: <IoIosSettings /> },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        onClick={toggleSidebar}
        className={`fixed top-0 left-0 h-full flex flex-col z-[10] min-w-64 bg-white shadow-lg transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-64"
          } md:relative md:translate-x-0`}
      >
        <div className="p-4 text-3xl font-semibold">Dashboard</div>
        <ul className="mt-4 space-y-2 px-4 w-full flex-1">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="px-6 py-3 hover:bg-gray-200 rounded-md cursor-pointer flex items-center space-x-3"
            >
              {item.icon}
              <Link to={item.path} className="block">
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
        <li className="mt-auto px-6 m-4 py-3 hover:bg-gray-200 rounded-md cursor-pointer flex items-center space-x-3">
          <MdOutlineLogout />
          <button onClick={handleLogout} className="block w-full text-left">
            Logout
          </button>
        </li>
      </div>

      <Outlet context={{ toggleSidebar }} />
    </div>
  );
}
