import Taskcard from '../Task/TaskCard/Taskcard'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from "react";

import { fetchTasks, fetchUserTasks } from '../../ReduxToolkit/TaskSlice';
import { useLocation } from 'react-router-dom';

const TaskList = () => {
  const dispatch = useDispatch();
  const { task, auth } = useSelector(store => store);
  const location = useLocation();
  const queryParames = new URLSearchParams(location.search);
  const filterValue = queryParames.get("filter");
  
   useEffect(() => {
    if(auth.user?.role === "ROLE_ADMIN"){
      dispatch(fetchTasks({status: filterValue})); 
    } else {
      dispatch(fetchUserTasks({status: filterValue}));
    }
   }, [filterValue, auth.user?.role, dispatch]);

  console.log("Task", task)
  
  return (
    <div className='w-[67vw]'>
       <div className='space-y-3'>
          {auth.user?.role === "ROLE_ADMIN" 
            ? task.tasks?.map((item) => ( 
                <Taskcard key={item.id} item={item} />
              ))
            // FIX: Removed the extra 's' from usersTask. It is now exactly 'userTask'
            : task.userTask?.map((item) => ( 
                <Taskcard key={item.id} item={item} />
              ))
          }
       </div> 
    </div>
  )
}

export default TaskList;