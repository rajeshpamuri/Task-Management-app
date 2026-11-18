import { Avatar } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';

const Navbar = () => {
    const {task,auth} = useSelector(store=>store);
  return (
    <div className='w-full z-10 sticky left-0 right-0 top-0 py-3 px-5 lg:px-10 flex justify-between items-center'>
       <p className='font-bold text-lg'>Rajesh Task Manager</p>
       <div className='flex items-center gap-5'>
          <p>{auth.user.fullName}</p>
          <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces">C</Avatar>
       </div>
       
    </div>
  )
}

export default Navbar