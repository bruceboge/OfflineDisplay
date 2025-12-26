import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import { Loader2 } from "lucide-react";

// Lazy Load Pages
const Login = lazy(() => import("./pages/Login"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Events = lazy(() => import("./pages/Events"));
const Members = lazy(() => import("./pages/Members"));
const Inventory = lazy(() => import("./pages/Inventory"));
const Announcements = lazy(() => import("./pages/Announcements"));
const Elections = lazy(() => import("./pages/Elections"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense 
          fallback={
            <div className="h-screen w-full flex items-center justify-center bg-slate-50 text-brand-600">
              <Loader2 className="animate-spin" size={48} />
            </div>
          }
        >
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* Protected App Routes */}
            <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
              <Route path="/events" element={<Events />} />
              <Route path="/members" element={<Members />} />
              <Route path="/inventory" element={<Inventory />} />
              <Route path="/announcements" element={<Announcements />} />
              <Route path="/elections" element={<Elections />} />
              
              {/* Fallback */}
              <Route path="*" element={<Dashboard />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;