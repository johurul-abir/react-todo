import { Helmet } from "react-helmet"
import { Outlet } from "react-router-dom"



const Layouts = () => {
  return (
    <>
       <Helmet>
            <meta charSet="utf-8" />
            <title>shareme</title>
          
        </Helmet>
       

        <Outlet/>

    </>
  )
}

export default Layouts