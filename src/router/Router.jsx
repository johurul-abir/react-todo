import { createBrowserRouter } from "react-router-dom";
import publicRouter from "./PublicRouter";
import PrivateRouter from "./PrivateRouter";


const router = createBrowserRouter([...publicRouter, ...PrivateRouter])


// export default 
export default router