
import React,{useEffect, useState} from 'react'
import {FaCheck, FaPencilAlt, FaPlus, FaSearch, FaTrash} from 'react-icons/fa';
import {Toast, ToastContainer} from 'react-toastify'
import { CreateTask, GetAllTasks,DeleteTaskById,UpdateTaskById} from "./Api";
import {Notify} from './utils'

function TaskManager(){

    const [input,setInput] = useState('');
    const [tasks,setTasks] = useState([]);
    const [copyTasks,setcopyTasks] = useState([]);
    const [updateTask,setUpdateTask] = useState(null);

    const handleTask = ()=>{
      if(updateTask && input){
          // update api call
           const obj = {
             taskName: input,
             isDone: !updateTask.isDone,
             _id: updateTask._id,
           };
          handleUpdateItem(obj);
      } else if(!updateTask && input){
         // create API 
         handleAddTask();
      }

      setInput('')
    }

    useEffect(()=>{
      if(updateTask){
        setInput(updateTask.taskName)
      }
    },[updateTask])
    const handleAddTask = async()=>{
        const obj = {
            taskName:input,
            isDone:false
        }
        try{
          const {success,message} =  await CreateTask(obj);
          if(success){
              Notify(message,'success');
            }
            else{
            Notify(message,'error');
          }
          fetchAllTasks()
        }
        catch(err){
          console.log(err)
          Notify('Failed to create task', err)
        }
        fetchAllTasks()
    }
    
    const fetchAllTasks = async()=>{
      try{
        const {data} = await GetAllTasks();
        setTasks(data);
        console.log("data" ,data);
        setcopyTasks(data);
      }
      catch(err){
        console.log(err)
        Notify('Failed to Fetch All task', err)
      }
    }
    useEffect(()=>{
      fetchAllTasks();
    },[])
    
    const handleDeleteTask  = async(id)=>{
      try{
        const {success,message} = await DeleteTaskById(id);
       if (success) {
         Notify(message, "success");
       } else {
         Notify(message, "error");
       }
      }
      catch(err){
        console.log(err)
        Notify('Failed to Delete task', err)
      }
      fetchAllTasks();

    }

    const handleCheckAndUncheck = async (item)=>{
      const {_id,isDone,taskName} = item;
      const obj = {
        _id,
        taskName,
        isDone: !isDone
      };

      try{
        const {success,message} = await UpdateTaskById(_id,obj);
        if (success) {
          
          // setTasks(prev => {
          //     const itemList = tasks;

          //     const newArray = itemList.map((itemIn) => {
          //       if(itemIn._id === _id){
          //         return {
          //           ...itemIn,
          //           isDone : !itemIn.isDone
          //         }
          //       }

          //       return itemIn;
          //     })

          //     return newArray;
          //   })
          
         Notify(message, "success");
       } else {
         Notify(message, "error");
       }

        fetchAllTasks();
      }
      catch(err){
        console.log(err)
        Notify('Failed to Update task', err)
      }
      
    }

    const handleUpdateItem = async(item)=>{
        const {_id,isDone,taskName} = item;
      const obj = {
        _id,
        taskName,
        isDone: !isDone
      };

      try{
        const {success,message} = await UpdateTaskById(_id,obj);
        if (success) {
         Notify(message, "success");
       } else {
         Notify(message, "error");
       }

        fetchAllTasks();
      }
      catch(err){
        console.log(err)
        Notify('Failed to Update task', err)
      }
    }
    
    const handleSearch = (e)=>{
        const term = e.target.value.toLowerCase();
        const oldTasks = [...copyTasks];
        const results = oldTasks.filter((item)=> item.taskName.toLowerCase().includes(term))
        setTasks(results)
    }
    return (
      <div className="d-flex flex-column align-items-center w-50 m-auto mt-5">
        <h1 className="mb-4">Taskify App</h1>

        {/* Input and Serach Box */}
        <div className="d-flex justify-content-between align-items-center mb-4 w-100">
          <div className="input-group flex-grow-1 me-2">
            <input
              value={input}
              type="text"
              onChange={(e) => setInput(e.target.value)}
              className="form-control me-1"
              placeholder="Add new Task"
            />
            <button className="btn btn-info btn-sm me-2" onClick={handleTask}>
              <FaPlus className="m-2"></FaPlus>
            </button>
          </div>

          <div className="input-group flex-grow-1 me-2">
            <span className="input-group-text">
              {" "}
              <FaSearch />
            </span>
            <input
              type="text"
              onChange={handleSearch}
              className="form-control"
              placeholder="Search tasks"
            />
            {/* <button className="btn btn-info btn-sm me-2">Serach</button> */}
          </div>
        </div>

        {/* List of Items  */}
        <div className="d-flex flex-column w-100">
          {tasks.map((item) => (
            <div key={item._id} className="m-2 p-2 border bg-light w-100 rounded-3 d-flex justify-content-between align-items-center">
              <span
                className={item.isDone ? "text-decoration-line-through" : ""}
              >
                {item.taskName}
              </span>
              <div className="">
                <button
                  className="btn btn-info btn-sm me-2"
                  type="button"
                  onClick={() => handleCheckAndUncheck(item)}
                >
                  {" "}
                  <FaCheck />{" "}
                </button>
                <button
                  className="btn btn-secondary btn-sm me-2"
                  type="button"
                  onClick={() => setUpdateTask(item)}
                >
                  {" "}
                  <FaPencilAlt />{" "}
                </button>
                <button
                  className="btn btn-danger btn-sm me-2"
                  type="button"
                  onClick={() => handleDeleteTask(item._id)}
                >
                  {" "}
                  <FaTrash />{" "}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Toastify */}
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hiddenProgressBar={false}
        />
      </div>
    );
}

export { TaskManager };