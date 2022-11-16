import { AuthProvider } from "src/lib/useAuth"

export const App = () => {
  return (
    <AuthProvider>
      <div>App</div> 
    </AuthProvider>
  )  
}