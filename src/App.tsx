import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import DataProvider from "./Context/authContext";
import LoginPage from "./Pages/LoginPage";
import ForgotPassword from "./Components/Company/Password/ForgotPassword";
import VerifyOtp from "./Components/Company/Password/VerifyOtp";
import ResetPassword from "./Components/Company/Password/ResetPassword";
import PasswordCreated from "./Components/Company/PasswordCreatedModal/PasswordCreated";
import VerifyLink from "./Components/Company/VerifyLink/VerifyLink";
import TeamscorePage from "./Pages/TeamscorePage";
import CompanyDashbordPage from "./Pages/CompanyDashbordPage";
import PrivateRoute from "./PrivateRoute/PrivateRoute";

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

            <Route
              path="/company_dashboard"
              element={
                <PrivateRoute>
                  <CompanyDashbordPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/team-info"
              element={
                <PrivateRoute>
                  <TeamscorePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </DataProvider>
    </div>
  );
};

export default App;
