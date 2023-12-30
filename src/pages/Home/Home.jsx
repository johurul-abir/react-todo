import { Card, CardBody, Col, Container, Modal, ModalBody, ModalHeader, Row } from "react-bootstrap";
import './Home.scss';
import { CiEdit } from "react-icons/ci";
import { MdDeleteSweep } from "react-icons/md";
import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { toast } from "react-toastify";


const Home = () => {

  const todoReducer = (state, action) => {

    switch (action.type) {

      case "DELETE":
        return action.payload = axios.delete("http://localhost:5050/todos") ;
      
      case "DATA":
        return action.payload;

      case "CREATE":
        return [...state, action.payload]

      case "FILTER_TODOS":
        return action.payload;

      case "FILTER_ALL":
        return action.payload ;
        
      case "EDIT":
        return action.payload ;

      
        
    
      default:
        return state;
    }
  }

const [todo, dispach] = useReducer(todoReducer, []);


const [input, setInput] = useState({
  name: "",
  type: ""
})


  
//cost [editInput, setEditInput] = useState();

const handleInputChange= (e) => {
  setInput((prevState) => ({
    ...prevState, [e.target.name] : e.target.value

  }))
}



//submit form
const handleSubmit = async(e) => {
  e.preventDefault()

const create_todos_data = await axios.post("http://localhost:5050/todos", input)
dispach({type:"CREATE", payload: create_todos_data.data});
getAllTodos();
setInput({
  name :"",
  type: ""
})
toast.success("Todo add successfully done") 


};

const handleDeleteTodos = async(id) => {

  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      const delete_respons = axios.delete(`http://localhost:5050/todos/${id}`)
      dispach({type: "DELETE", payload:delete_respons })
      getAllTodos()
      Swal.fire({
        title: "Deleted!",
        text: "Your file has been deleted.",
        icon: "success"
      });
    }
  });
 
}


//seach todo
const handleSearchTodo = async(type) => {

  const seachData = await axios.get(`http://localhost:5050/todos?type=${type}`);
  dispach({type:"FILTER_TODOS", payload: seachData.data})

}
//search all todo data
const handleSearchAll= async() => {
 const allSearch = await axios.get("http://localhost:5050/todos")
  dispach({type:"FILTER_ALL", payload:allSearch.data })
}

//show hide modal state
const [modal,  setModal] = useState(false)
//hide edit modal
const handleHideEditModal =()=> {
  setModal(false)
}

//eidt input change state
const [edit, setEdit] = useState({
  name:"",
  type: ""
})

const handleShowModla =(id) => {
  setModal(true);
  setEdit(todo.find((data) => data.id === id))
}

//edit input chanage
const editInputChange = (e) => {
  setEdit((prevState) => ({
    ...prevState, [e.target.name]: e.target.value
    
  }))

}
//edit submit
const editSubmitTodo = async(e) => {
    e.preventDefault()
  const getEditTodos = await axios.patch(`http://localhost:5050/todos/${edit.id}`, edit)
 dispach({type:"EDIT", payload: getEditTodos})
 getAllTodos();
 setModal(false)
 toast.success("Todo Edit successfully done") 
}



//get all todos
const getAllTodos = async() => {
  const get_respons = await axios.get("http://localhost:5050/todos");
  dispach({type:"DATA", payload:get_respons.data})
  }
 
  useEffect(()=> {
    getAllTodos()
  }, [])
 


  return (
   <>

    <div className="todo_area">

      <Container className="my-5">
        <Row className="justify-content-center" >
          <Col md={8}>
            <Modal show={modal}>
              <ModalHeader>
                <h2>Edit todo list</h2>
                <button className="btn btn-danger btn btn-sm" onClick={handleHideEditModal} >X</button>
              </ModalHeader>
              <ModalBody>
                <form action="">
                  <div className="item">
                    <label htmlFor="">Name</label>
                    <input type="text" name="name" className="form-control" value={edit.name} onChange={editInputChange} />
                  </div>
                  <div className="item my-3">
                    <button className="btn btn-success"  type="submit" onClick={editSubmitTodo} > Edit Now</button>
                  </div>
                </form>
              </ModalBody>
            </Modal>
            <Card>
              <Card.Header>
              <h1>My Todo list</h1>
              </Card.Header>
              <CardBody >
                 <form action="" className="todo-top" > 
                    <input type="text" name="name" className="form-control" onChange={handleInputChange}/>
                    <select className="form-control w-25" name="type" value={input} onChange={handleInputChange} >
                      <option value="">--selcet type --</option>
                      <option name="type" value="success" > Success</option>
                      <option name="type" value="pending" > Pending</option>
                      <option name="type" value="runing" > Runing</option>
                    </select>
                    <button className="btn btn-sm btn btn-primary" type="submit" onClick={handleSubmit}> Add item</button>
                 </form> 
                 <div className="search-btn mt-3">
                    <button className="btn btn-sm btn btn-success me-2" onClick={()=>handleSearchTodo("success")}> Success</button>
                    <button className="btn btn-sm btn btn-info me-2" onClick={()=>handleSearchTodo("pending")}> Pending</button>
                    <button className="btn btn-sm btn btn-warning me-2" onClick={()=>handleSearchTodo("runing")}> runnig</button>
                    <button className="btn btn-sm btn btn-warning" onClick={handleSearchAll}> All</button>
                  </div>     
                <div className="todo-list">
                  {
                   todo?.length?
                    todo.map((item, index)=>{
                      return(
                        <div className="list" key={index}>
                          <h5> {index + 1}. {item.name}</h5>
                          <div className="action">
                            <button className="btn btn-sm btn btn-info me-1" onClick={()=>handleShowModla(item.id)} > <CiEdit/> </button>
                            <button className="btn btn-sm btn btn-danger" onClick={()=>handleDeleteTodos(item.id) } > <MdDeleteSweep/> </button>
                          </div>
                        </div>
                      )
                    }) :"todo not found"
                  }
                  
                </div>

              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
   </>
  )
}

export default Home