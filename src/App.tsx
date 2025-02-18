import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import UserList from "./pages/UserList";
import Navbar from "./components/Navbar";
import PaintingList from "./pages/PaintingList";
import PaintingForm from "./pages/PaintingForm";
import PaintingDetail from "./pages/PaintingDetail";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import CategoryManager from "./pages/CategoryManager";

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="flex flex-col">
          <Navbar />
          <Toaster position="top-center" reverseOrder={false} />
          <div className="flex grow justify-center items-center">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/userList" element={<UserList />} />
              <Route path="/paintings" element={<PaintingList />} />
              <Route path="/paintings/:id" element={<PaintingDetail />} />
              <Route path="/paintings/new" element={<PaintingForm />} />
              <Route path="/paintings/edit/:id" element={<PaintingForm />} />
              <Route path="/categories" element={<CategoryManager />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;