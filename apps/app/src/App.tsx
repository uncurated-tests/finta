import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';

import { AuthProvider } from "src/lib/useAuth"
import { Destinations } from "src/pages/Destinations"
import { Login } from "src/pages/Login";
import { AuthGate } from 'src/components/AuthGate';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path = "/" element = { <AuthGate><Navigate to = "/destinations" /></AuthGate> } />
          <Route path = "/destinations" element = { <AuthGate shouldBeSignedIn = { true }><Destinations /></AuthGate> } />
          <Route path = "/login" element = { <AuthGate><Login /></AuthGate> } />
        </Routes>
      </Router>
    </AuthProvider>
  )  
}