import {API_url} from './utils'

const CreateTask = async (taskobj)=>{
    const url = `${API_url}/tasks`;
    const options ={
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify(taskobj)
    };

    try{
        const result = await fetch(url,options);
        const data = await result.json();
        console.log(data)
        return data;
        
    }
    catch(err){
        return err;
    }
}

const GetAllTasks = async () => {
  const url = `${API_url}/tasks`;
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};

const DeleteTaskById = async (id) => {
  const url = `${API_url}/tasks/${id}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    const result = await fetch(url, options);
    const data = await result.json();
    console.log(data);
    return data;
  } catch (err) {
    return err;
  }
};


const UpdateTaskById = async(id,reqBody)=>{
   const url = `${API_url}/tasks/${id}`;
   const option ={
    method:"PUT",
    headers:{
        'Content-Type':'application/json',
    },
    body: JSON.stringify(reqBody)
   }

   try{
     const result = await fetch(url,option);
     const data =  await result.json();
     return data;
   }
   catch(err){
     return err;
   }
}
export { CreateTask, GetAllTasks, DeleteTaskById, UpdateTaskById };