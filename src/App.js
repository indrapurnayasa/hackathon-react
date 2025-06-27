// src/App.js
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import DashboardLayout from "./layout/DashboardLayout";
import UserDashboard from "./pages/UserDashboard";
import ChatPage from "./pages/ChatPage";
import UploadDocumentsPage from "./pages/UploadDocumentsPage";
import MarketInsightsPage from "./pages/MarketInsightPage.js";
// import UploadPage, InsightsPage, HelpPage (next kalau udah)

function App() {
  return (
    <Router>
      <Routes>
        {/* layout + nested routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Navigate to="home" />} />
          <Route path="home" element={<UserDashboard />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="upload" element={<UploadDocumentsPage />} />
          <Route path="insights" element={<MarketInsightsPage />} />

          {/* Tambahin route lain nanti */}
        </Route>

        {/* fallback */}
        <Route path="*" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;
