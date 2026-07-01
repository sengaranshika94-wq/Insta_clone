import { router} from "./app.routes"
import { RouterProvider } from "react-router"
import { AuthProvider } from "./features/auth/auth.context"
import {PostContextProvider} from "./features/posts/post.context"
import './features/shared/global.scss'
function App() {
  

  return (
    <AuthProvider>
      <PostContextProvider>
        <RouterProvider router={router}/>
      </PostContextProvider>
    </AuthProvider>
   
  )
}

export default App
