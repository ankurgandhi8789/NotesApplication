import { createBrowserRouter } from "react-router-dom";

import Home from "../pages/Home";
import CreateNote from "../pages/CreateNote";
import OpenNote from "../pages/OpenNote";
import EditNote from "../pages/EditNote";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Home/>
    },
    {
        path:'/create',
        element:<CreateNote/>
    },
    {
        path:'/note/:id',
        element:<OpenNote/>
    },
    {
        path:'/edit/:id',
        element:<EditNote/>
    }

])

export default router;