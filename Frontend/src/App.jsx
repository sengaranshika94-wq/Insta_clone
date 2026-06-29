import { router} from "./app.routes"
import { RouterProvider } from "react-router"
import { AuthProvider } from "./features/auth/auth.context"
import './features/shared/global.scss'
function App() {
  

  return (
    <AuthProvider>
       <RouterProvider router={router}/>
    </AuthProvider>
   
  )
}

export default App
