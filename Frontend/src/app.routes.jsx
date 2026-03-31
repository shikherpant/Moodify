import { createBrowserRouter } from "react-router"
import Register from "./features/auth/pages/Register"
import Login from "./features/auth/pages/Login"
import EmotionDetector from "./features/Expression/components/EmotionDetector"
import Protected from "./features/auth/components/Protected"

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected><h1>HOME</h1></Protected>
    },
    {
        path: "/register",
        element: <Register/>
    },
    {
        path: "/login",
        element: <Login/>
    },
    {
        path:"/moodify",
        element: <EmotionDetector />
    }
])