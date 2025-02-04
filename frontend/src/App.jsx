import {Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import UserDetails from "./components/UserDetails";
import NotFound from './pages/NotFound'

function App() {
  return (
    <Routes>
        <Route path="/login" element={<AuthPage type="login" />} />
        <Route path="/register" element={<AuthPage type="register" />} />
        <Route path="/" element={<Home/>}>
          <Route index element={<UserDetails/>}/>
        </Route>
        <Route path="*" element={<NotFound/>} />
      </Routes>
  );
}

export default App;