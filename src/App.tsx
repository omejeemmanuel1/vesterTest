import React from "react";
import { Routes, BrowserRouter as Router, Route } from "react-router-dom";
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
import Score from "./Components/Company/Scorecard/Score";
import { ThemeProvider } from "./Context/ThemeContext";
import CompanyPerformancePage from "./Pages/CompanyPerformancePage";
import LandingPage from "./Pages/LandingPage";
import AdminLoginPage from "./Pages/AdminLoginPage";
import AdminDashboardPage from "./Pages/AdminDashboardPage";
import DataDisplayPage from "./Pages/DataDisplayPage";
import CompanyDataDisplay from "./Components/Admin/AdminDashboard/CompanyDataDisplay";
import TeamScoreDataDisplay from "./Components/Admin/AdminDashboard/TeamScoreDataDisplay";
import PitchDeckDataDisplay from "./Components/Admin/AdminDashboard/PitchDeckDataDisplay";
import CompanyProfilePage from "./Pages/CompanyProfilePage";

const App: React.FC = () => {
  return (
    <div>
      <DataProvider>
        <Router>
          <ThemeProvider>
            <Routes>
              <Route path="/admin-login" element={<AdminLoginPage />} />
              <Route path="/" element={<LandingPage />} />
              <Route path="/comp-reg" element={<RegisterPage />} />
              <Route path="/comp-login" element={<LoginPage />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/verify-otp" element={<VerifyOtp />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/password-created" element={<PasswordCreated />} />
              <Route path="/verify-link" element={<VerifyLink />} />

              <Route
                path="/adminDashboard"
                element={
                  <PrivateRoute>
                    <AdminDashboardPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/data"
                element={
                  <PrivateRoute>
                    <DataDisplayPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="company-data"
                element={
                  <PrivateRoute>
                    <CompanyDataDisplay />
                  </PrivateRoute>
                }
              />
              <Route
                path="teamscore-data"
                element={
                  <PrivateRoute>
                    <TeamScoreDataDisplay />
                  </PrivateRoute>
                }
              />
              <Route
                path="pitchdeck-data"
                element={
                  <PrivateRoute>
                    <PitchDeckDataDisplay />
                  </PrivateRoute>
                }
              />

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
              <Route
                path="/score"
                element={
                  <PrivateRoute>
                    <Score />
                  </PrivateRoute>
                }
              />
              <Route
                path="/performance"
                element={
                  <PrivateRoute>
                    <CompanyPerformancePage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/profile-update"
                element={
                  <PrivateRoute>
                    <CompanyProfilePage />
                  </PrivateRoute>
                }
              />
            </Routes>
          </ThemeProvider>
        </Router>
      </DataProvider>
    </div>
  );
};

export default App;
