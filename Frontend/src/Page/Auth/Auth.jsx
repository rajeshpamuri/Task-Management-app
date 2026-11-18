import React, { useState } from 'react'
import "./Auth.css"
import SignIn from './SignIn'
import SignUp from './SignUp'
const Auth = () => {
    const [isRegister,setIsRegister] = useState(false)
    const togglePanel=()=>{
        setIsRegister(!isRegister)
    }
  return (
    <div className='flex justify-center h-screen items-center overflow-hidden'>
      <div className='box lg:max-w-4xl'>
        <div className={`cover ${isRegister?"rotate-active":""}`}>
          <div className='front'>
            <img src="https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcRjAfwCuY8HEXbL9xOha5QmPySH2I9JQufPoPjR1pr3EUPMrmZDo32Q4CxQsQF_3qE906rLOZRds9OwmuU" alt=""/>
            <div className='text'>
                <span className='text-1'>Sucess is build well-organized tasks</span>
                <span className='text-2 text-xs'>Let's get connected</span>
            </div>
          </div>
          <div className='back'>
            <img src='https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=800&q=80' alt=''/>
          </div>
        </div>
            <div className='forms h-full'>
                <div className='form-content h-full'>
                    <div className='login-form'>
                      <SignIn togglePanel={togglePanel}/>
                    </div>

                    <div className='signup-form'>
                    <SignUp togglePanel={togglePanel}/>
                     
                    </div>

                </div>
            </div>
      </div>
    </div>
  )
}

export default Auth