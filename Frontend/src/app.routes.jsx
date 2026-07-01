import {createBrowserRouter} from 'react-router'
import Login from './features/auth/pages/Login'
import Register from './features/auth/pages/Register'
import FeedPage from './features/posts/pages/FeedPage'
export const router = createBrowserRouter([
    {
        path: '/login',
        element: <Login/>
    },
    {
        path: '/register',
        element:<Register/>
    },
    {
        path: '/',
        element:<FeedPage/>
    }
])