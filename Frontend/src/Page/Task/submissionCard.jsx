import React from 'react'
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
// 1. Import the Button from Material UI
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import { acceptDeclineSubmission } from '../../ReduxToolkit/SubmissionsSlice';

const SubmissionCard = ({item}) => {
  const dispatch = useDispatch();


  const handleAcceptDecline = (status)=>{
  dispatch(acceptDeclineSubmission({id:item.id,status}))
    console.log(status)
  }
  return (
    <div className='rounded-md bg-black p-5 flex items-center justify-between'>
      <div className='space-y-2'>
         <div className='flex items-center gap-2'>
           <span className='text-gray-200'>Git Hub: </span>
           <div className='flex items-center gap-1 text-[#c24dd0] hover:text-purple-400 transition-colors'>
              <OpenInNewIcon fontSize="small" />
              <a href={item.githubLink} target="_blank" rel="noopener noreferrer">Go To Link</a>
           </div>
         </div>
          
          <div className='flex items-center gap-2 text-xs'>
               <p className='text-gray-200'>Submission Time:</p>
               <p className='text-gray-400'>{item.submissionTime}</p>
          </div>     
      </div>
      <div>
         {
          // 2. Capitalize Button and fix the spelling of "success"
          // Added variant="contained" so the background color fills in
          item.status==="PENDING" ? <div className='flex gap-5'>
          <div className='text-green-500'>
            <IconButton color='success'  onClick={()=>handleAcceptDecline("ACCEPTED")}>
               <CheckIcon/>
            </IconButton>
          </div>
          <div className='text-red-500'>
           <IconButton color='error' onClick={()=>handleAcceptDecline("DECLINED")}>
            <CloseIcon/>
            </IconButton>  
          </div>
          </div> : <Button variant="contained" color={item.status==="ACCEPTED" ? "success" : "error"} size="small">{item.status}</Button>
         }
      </div>
    </div>
  )
}

export default SubmissionCard