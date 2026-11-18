// Updated UserList.jsx
import * as React from 'react';
import { useEffect } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Avatar, Button, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { assignedTaskToUser } from '../../ReduxToolkit/TaskSlice';
import { getUserList } from '../../ReduxToolkit/AuthSlice';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#0c071b', 
  color: 'white',
  border: '2px solid #c24dd0', 
  boxShadow: '0px 0px 20px rgba(215, 106, 255, 0.5)',
  borderRadius: '12px',
  p: 4,
};

export default function UserList({ item, handleClose, open }) {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  
  const taskId = item?.id;

  useEffect(() => {
    if (open) {
      dispatch(getUserList(localStorage.getItem("jwt")));
    }
  }, [open, dispatch]);

  const handleAssignedTask = (user) => {
     dispatch(assignedTaskToUser({ userId: user.id, taskId: taskId }));
     handleClose(); 
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <h2 className="text-lg font-bold mb-4 text-white border-b border-gray-700 pb-2">Assign to User</h2>
          
          <div className="space-y-2 max-h-[60vh] overflow-y-auto">
            
            {auth.users?.map((user, index) => (
              <div key={index} className='flex items-center justify-between w-full border-b border-gray-800 pb-2'>
                <div className='flex items-center'>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces" />
                    </ListItemAvatar>
                    <ListItemText 
                      primary={<span className="text-white font-medium">{`@${user.fullName?.split(" ").join("_").toLowerCase()}`}</span>}
                      secondary={<span className="text-gray-400 text-xs">{user.fullName}</span>}
                    />
                  </ListItem>
                </div>
                <div>
                  <Button 
                    onClick={() => handleAssignedTask(user)} 
                    variant="contained" 
                    size="small" 
                    className='customeButton normal-case'
                  >
                    Select
                  </Button>
                </div>
              </div>
            ))}

            {(!auth.users || auth.users.length === 0) && (
              <p className="text-gray-400 text-sm text-center py-4">No users found.</p>
            )}

          </div>
        </Box>
      </Modal>
    </div>
  );
}