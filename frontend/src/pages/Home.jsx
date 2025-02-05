import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { logout } from "../store/authSlice";
import { MdOutlineLogout } from "react-icons/md";
import { FaHome } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { IoIosSettings } from "react-icons/io";
import LogoutConfirmation from "../components/LogoutConfirmation";
import Modal from "../components/Modal";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";


export default function Home() {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      navigate("/login");
    }
  }, [user, token, navigate]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    navigate("/login");
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
            <Link
              to={item.path}
              key={item.name}
              className="px-6 py-3 hover:bg-gray-200 rounded-md cursor-pointer flex items-center space-x-3"
            >
              {item.icon}
              <span className="block">
                {item.name}
              </span>
            </Link>
          ))}
        </ul>
        <button onClick={() => setShowLogoutModal(true)} className="mt-auto px-6 m-4 py-3 hover:bg-gray-200 rounded-md cursor-pointer flex items-center space-x-3">
          <MdOutlineLogout />
          <span className="block w-full text-left">
            Logout
          </span>
        </button>
      </div>

      <Modal isOpen={showLogoutModal} onClose={() => setShowLogoutModal(false)}>
        <LogoutConfirmation
          onConfirm={handleConfirmLogout}
          onCancel={() => setShowLogoutModal(false)}
        />
      </Modal>
      <Outlet context={{ toggleSidebar }} />
    </div>
  );
}