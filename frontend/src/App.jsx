import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OTPVerification from "./pages/OtpVerification";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";

function App() {
  return (
    <BrowserRouter>
    <Layout>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/signup"
          element={
            <ProtectedRoute>
              <Signup />
            </ProtectedRoute>
          }
        />
        <Route
          path="/signin"
          element={
            <ProtectedRoute>
              <SignIn />
            </ProtectedRoute>
          }
        />
        <Route path="/otp-verification" element={<OTPVerification />} />
        <Route path="/dashboard" element={<Dashboard />}></Route>
      </Routes>
    </Layout>
    </BrowserRouter>
  );
}

export default App;
