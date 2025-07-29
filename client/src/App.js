import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from './servicies/protectedRoute';
import Login from "./pages/Login";
import Register from "./pages/Register";
import Main from "./pages/Main";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Main />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        {/* Optionally keep this if you want to allow /main directly without token protection */}
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
}

export default App;
