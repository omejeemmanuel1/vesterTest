import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import DataProvider from "./Context/authContext";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Company/Password/ForgotPassword";
import VerifyOtp from "./Company/Password/VerifyOtp";
import ResetPassword from "./Company/Password/ResetPassword";
import PasswordCreated from "./Company/PasswordCreatedModal/PasswordCreated";
import VerifyLink from "./Company/VerifyLink/VerifyLink";
import CompDashboard from "./Company/Dashboard/CompDashboard";

const App: React.FC = () => {
  return (
    <div>
      <DataProvider>
        <Router>
          <Routes>
            <Route path="/comp-reg" element={<RegisterPage />} />
            <Route path="/comp-login" element={<LoginPage />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/verify-otp" element={<VerifyOtp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/password-created" element={<PasswordCreated />} />
            <Route path="/verify-link" element={<VerifyLink />} />
            <Route path="/company_dashboard" element={<CompDashboard />} />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
};

export default App;
