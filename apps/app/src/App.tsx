import {
  BrowserRouter as Router,
  Navigate,
  Routes,
  Route
} from 'react-router-dom';
import {
  ChakraProvider,
  Box
} from '@chakra-ui/react'; 

import { AuthGate } from 'src/components/AuthGate';

import { AuthProvider } from "src/lib/useAuth"

import { Destinations } from "src/pages/Destinations";
import { Login } from "src/pages/Login";
import { Signup } from 'src/pages/Signup';

import { theme } from "src/theme";
import { AppRoutes } from './routes';

export const App = () => {
  return (
    <AuthProvider>
      <ChakraProvider theme = { theme }>
        <Box minH = "max" id = "App">
          <Router>
            <Routes>
              <Route path = "/" element = { <AuthGate><Navigate to = { AppRoutes.DESTINATIONS } /></AuthGate> } />
              <Route path = { AppRoutes.DESTINATIONS } element = { <AuthGate shouldBeSignedIn = { true }><Destinations /></AuthGate> } />
              <Route path = { AppRoutes.LOG_IN } element = { <AuthGate><Login /></AuthGate> } />
              <Route path = { AppRoutes.SIGN_UP } element = { <AuthGate><Signup /></AuthGate> } />
            </Routes>
          </Router>
        </Box>
      </ChakraProvider>
    </AuthProvider>
  )  
}