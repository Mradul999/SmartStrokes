import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import OTPVerification from "./pages/OtpVerification";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
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
    </BrowserRouter>
  );
}

export default App;
