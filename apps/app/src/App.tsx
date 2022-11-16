import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';

import { AuthProvider } from "src/lib/useAuth"
import { Destinations } from "src/pages/Destinations"
import { AuthGate } from 'src/components/AuthGate';

export const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path = "/" element = { <AuthGate><Navigate to = "/destinations" /></AuthGate> } />
          <Route path = "/destinations" element = { <AuthGate shouldBeSignedIn = { true }><Destinations /></AuthGate> } />
        </Routes>
      </Router>
    </AuthProvider>
  )  
}