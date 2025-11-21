import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./components/MainLayout";
import Dashboard from "./pages/Dashboard";
import Todo from "./pages/Todo";
import Activities from "./pages/Activities";
import Analytics from "./pages/Analytics";
import Community from "./pages/Community";
import Messages from "./pages/Messages";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./Authentication/forgotpassword";
import CodeVerification from "./Authentication/code";
import ResetPassword from "./Authentication/reset";
import { seedStoresIfEmpty } from "./utils/seedData";
import { applyTheme } from "./utils/themeConfig";
import usePreferencesStore from "./store/usePreferencesStore";

function App() {
  const darkMode = usePreferencesStore((state) => state.appearance.darkMode);

  // Initialize theme and seed data on first load
  useEffect(() => {
    applyTheme(darkMode);
    seedStoresIfEmpty();
  }, []);

  // Apply theme when it changes
  useEffect(() => {
    applyTheme(darkMode);
  }, [darkMode]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Routes - No Layout */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/code" element={<CodeVerification />} />
        <Route path="/reset" element={<ResetPassword />} />

        {/* Protected Routes - With Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/community" element={<Community />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
