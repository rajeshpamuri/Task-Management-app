import React, { useState } from 'react';
import "./sidebar.css";
import CretateNewTaskForm from '../Task/CreateTask';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../ReduxToolkit/AuthSlice';

const menu = [
  { name: "Home", value: "Home", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "DONE", value: "DONE", role: ["ROLE_ADMIN", "ROLE_CUSTOMER"] },
  { name: "ASSIGNED", value: "ASSIGNED", role: ["ROLE_ADMIN"] },
  { name: "NOT ASSIGNED", value: "PENDING", role: ["ROLE_ADMIN"] },
  { name: "Create New Task", value: "", role: ["ROLE_ADMIN"] },
  { name: "Notification", value: "NOTIFICATION", role: ["ROLE_CUSTOMER"] },
];

const role = "ROLE_ADMIN";

const Sidebar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const updatedParames = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [activeMenu, setActiveMenu] = useState("Home");

  const [OpenCreateTaskForm, SetOpenCreateTaskForm] = useState(false);
   
  const handleCloserEditTask = () => {
      SetOpenCreateTaskForm(false);
  };
   
  const handleOpenUpdateTaskModel = () => {
      SetOpenCreateTaskForm(true);
  };

  const handleMenuChange = (item) => {
    // 1. Forcefully delete taskId on EVERY sidebar click so modals don't stay open
    updatedParames.delete("taskId");

    if(item.name === "Create New Task"){
      handleOpenUpdateTaskModel();
    } else if (item.name === "Home") {
         updatedParames.delete("filter");
         const queryString = updatedParames.toString();
         
         const updatedPath = queryString ? `${location.pathname}?${queryString}` : location.pathname;
         
         navigate(updatedPath);
    } else {
      updatedParames.set("filter", item.value);
      navigate(`${location.pathname}?${updatedParames.toString()}`)
    }
    setActiveMenu(item.name);
  };

  const handledLogout = () => {
     dispatch(logout())
    console.log("HandeledLogout");
  };

  return (
    <>
      <div className='card min-h-[85vh] flex flex-col fixed w-[20vw] p-5 text-white justify-between'>
      
      {/* Top Section: Profile Header & Navigation Menu */}
      <div className='flex flex-col space-y-6'>
        
        {/* Centered Profile Header */}
        <div className='flex flex-col items-center justify-center text-center space-y-3 pt-4'>
          <div className='w-24 h-24 rounded-full border-2 border-[#c24dd0] bg-[#070311] shadow-[0_0_20px_rgba(215,106,255,0.7)] flex items-center justify-center overflow-hidden'>
            <img 
              src="https://avatarfiles.alphacoders.com/375/375284.jpeg" 
              alt="Sung Jinwoo Full Face" 
              className='w-full h-full object-cover object-center'
            />
          </div>
          <div>
            <h1 className='font-bold text-lg tracking-wide'>Code with Rajesh</h1>
          </div>
        </div>

        {/* Filtered Navigation Menu List */}
        <div className='flex flex-col space-y-3 mt-4'>
          {menu
            .filter((item) => item.role.includes(role))
            .map((item) => (
              <div
                key={item.name}
                onClick={() => handleMenuChange(item)}
                className={`py-3 px-5 rounded-full text-center cursor-pointer transition-all duration-200 font-medium text-sm ${
                  activeMenu === item.name ? 'activeMenuItem shadow-lg' : 'menuItem'
                }`}
              >
                {item.name}
              </div>
            ))}
        </div>

      </div>

      {/* Bottom Footer / Logout Section */}
      <div className='pb-2'>
        <button onClick={handledLogout} className='w-full py-3 px-5 rounded-full text-center font-medium logoutButton transition-all duration-200 shadow-md'>
          Logout
        </button>
      </div>

    </div>
    
    <CretateNewTaskForm open={OpenCreateTaskForm} handleClose={handleCloserEditTask}></CretateNewTaskForm>
    </>
  );
};

export default Sidebar;