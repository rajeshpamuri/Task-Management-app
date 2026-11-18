import React from 'react'
import Sidebar from '../Sidebar/sidebar'; // Make sure path matches your file name casing
import TaskList from '../TaskList/TaskList';

const Home = () => {
  return (
    <div className='lg:flex px-5 lg:px-20 pt-[2.9vh]'>
      {/* Fixed w-[25w] typo to w-[25vw] and rendered the Sidebar component */}
      <div className='hidden lg:block w-[25vw] relative'>
        <Sidebar />
      </div>
      <div className='right-side-part w-full flex justify-center mb-10'>
        {/* Main content goes here */}
        <TaskList/>
      </div>
    </div>
  )
}

export default Home;