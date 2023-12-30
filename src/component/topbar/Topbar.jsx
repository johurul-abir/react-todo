
import './Topbar.scss';
import { GrLinkedin } from "react-icons/gr";
import { MdOutlineSearch } from "react-icons/md";
import { IoHomeSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { HiOutlineUsers } from "react-icons/hi2";
import { IoBriefcase } from "react-icons/io5";
import { AiTwotoneMessage } from "react-icons/ai";
import { IoNotificationsSharp } from "react-icons/io5";
import { IoMdArrowDropdown } from "react-icons/io";
import { LiaTableSolid } from "react-icons/lia";

const Topbar = () => {
  return (
    <>
    <div className="topbar">
        <container className="topbar-area">
            <div className="log-Scarch-part">
                <li> <GrLinkedin/> </li>
                <div className="search">
                    <i><MdOutlineSearch/></i>
                    <input type="text" placeholder="Search"/>
                </div>
            </div>
            <div className="menu-part">
                <ul className="menu-area">
                    <li className="menu-item"> <Link to=""> <IoHomeSharp/> Home</Link> </li>
                    <li className="menu-item"> <Link to=""> <HiOutlineUsers/> My Network</Link> </li>
                    <li className="menu-item"> <Link to=""> <IoBriefcase/> Jobs</Link> </li>
                    <li className="menu-item"> <Link to=""> <AiTwotoneMessage/> Messaging</Link> </li>
                    <li className="menu-item"> <Link to=""> <IoNotificationsSharp/> Notifications </Link> </li>
                    <li className="menu-item" > 
                        <Link to=""> 
                            <img src="https://media.licdn.com/dms/image/D5603AQE14jrOMsBZzw/profile-displayphoto-shrink_800_800/0/1692680339642?e=1708560000&v=beta&t=y1wdwsyIpxhdbmGN1wzzBIrGPHtClPHFuYe-Cb63TrQ" alt="" />
                            <div className="me">
                                <span>Me</span>
                                <i> <IoMdArrowDropdown/> </i>
                            </div>
                        </Link> 
                    </li>  
                </ul>
                <div className="busyness-part">
                    <ul className="busyness-area">
                        <li className="menu-item"> 
                            <Link to="">    
                                <i> <LiaTableSolid/> </i>
                                <span>For Busyness <IoMdArrowDropdown/> </span>
                                    
                            </Link> 
                        </li>
                        <li className="menu-item">
                            <Link className="premium" >
                                Try Premium for <br />
                                BDT0
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </container>
    </div>
    </>
  )
}

export default Topbar