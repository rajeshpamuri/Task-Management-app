import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import SubmissionCard from './submissionCard'; 
import { useDispatch, useSelector } from 'react-redux';
import { fetchSubmissionsById } from '../../ReduxToolkit/SubmissionsSlice';
import { useEffect } from 'react';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#0c071b', // Matched dark theme
  border: '2px solid #c24dd0',
  boxShadow: '0px 0px 20px rgba(215, 106, 255, 0.5)',
  borderRadius: '12px',
  p: 4,
};

export default function SubmissionList({ item, handleClose, open }) {
    const dispatch = useDispatch();
    
    // FIX 1: We grab both just in case your Store.js uses the singular 'submission' name
    const { submission, submissions } = useSelector(store => store);
    
    // Pick whichever one actually exists in your Redux store
    const submissionState = submission || submissions || {};

    useEffect(() => {
        if (open && item?.id) {
            dispatch(fetchSubmissionsById({ taskId: item.id }));
        }
    }, [item, open, dispatch]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <div>
              {/* FIX 2: Added `?.` so it never crashes even if the array is temporarily undefined! */}
              {submissionState?.submissions?.length > 0 ? (
              <div className='space-y-4'>
                {submissionState.submissions.map((subItem) => (
                    <SubmissionCard key={subItem.id} item={subItem} /> 
                ))}
              </div>
              ) : (
                <div className='text-center text-white p-4'> 
                    No Submission Found 
                </div>
              )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}