import Layouts from "../component/layout/Layouts";
import Home from "../pages/Home/Home";


const publicRouter = [
    {
        element:<Layouts/>,
        children:[
            {
                path: "/",
                element:<Home/>
            }
        ]
    }
]

//export default 
export default publicRouter