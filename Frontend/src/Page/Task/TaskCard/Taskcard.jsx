import React, { useState } from 'react'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { IconButton, Menu, MenuItem } from '@mui/material';
import UserList from '../UserList';
import SubmissionList from '../SubmissionList';
import EditTaskForm from '../EditTaskForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask } from '../../../ReduxToolkit/TaskSlice';
import { useLocation, useNavigate } from 'react-router-dom';
import store from '../../../ReduxToolkit/Store';
import SubmissionFormModel from './SubmistionFormModal';

const Taskcard = ({ item }) => {
    const dispatch = useDispatch();
    const {auth} = useSelector(store=>store)
    const location = useLocation();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleMenuClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const [openUserList, SetOpenUserList] = useState(false);

    const handleCloserUserList = () => {
        SetOpenUserList(false)
    }

    const handleOpenUserList = () => {
        SetOpenUserList(true)
        handleMenuClose()
    }

     const [openSubmitFormModel, SetSubmitFormModel] = useState(false);

    const handleCloserSubmitFormModel = () => {
        SetSubmitFormModel(false)
    }

    const handleOpenSubmitFormModel = () => {
        const updatedParames = new URLSearchParams(location.search);
        updatedParames.set("taskId",item.id);
        navigate(`${location.pathname}?${updatedParames.toString()}`)
        SetSubmitFormModel(true)
        handleMenuClose()
    }

    const [openSubmissionList, SetSubmissionList] = useState(false);

    const handleCloserSubmissionList = () => {
        SetSubmissionList(false)
    }

    const handleOpenSubmissinList = () => {
        const updatedParames = new URLSearchParams(location.search);
        updatedParames.set("taskId",item.id);
        navigate(`${location.pathname}?${updatedParames.toString()}`)
        SetSubmissionList(true)
        handleMenuClose()
    }

    const [EditTask, SetEditTask] = useState(false);

    const handleCloserEditTask = () => {
        const queryParams = new URLSearchParams(location.search);
        queryParams.delete("taskId");
        navigate({ search: queryParams.toString() });
        SetEditTask(false);
    }

    const handleOpenUpdateTaskModel = () => {
        const updatedParames = new URLSearchParams(location.search)
        SetEditTask(true)
        updatedParames.set("taskId", item.id);
        navigate(`${location.pathname}?${updatedParames.toString()}`)
        handleMenuClose();
    }
    
    const handleDeleteTask = () => {
        dispatch(deleteTask({ taskId: item.id }))
        handleMenuClose()
    }

    return (
        <div>
            <div className='card lg:flex justify-between items-center p-4 bg-[#0c071b]'>

                <div className='flex items-center gap-5 w-[90%] lg:w-[70%]'>
                    <div className='flex-shrink-0 bg-[#0c071b] rounded-lg overflow-hidden'>
                        <img
                            className='w-[5rem] h-[5rem] lg:w-[7rem] lg:h-[7rem] rounded-lg object-cover bg-[#0c071b]'
                            src={item?.image}
                            alt=""
                        />
                    </div>

                    <div className='space-y-2'>
                        <h1 className='font-bold text-lg text-white'>{item?.title}</h1>
                        <p className='text-gray-400 text-sm'>{item?.description}</p>

                        <div className='flex flex-wrap gap-2 items-center pt-1'>
                            {item?.tags?.map((tag, index) => (
                                <span key={index} className='py-1 px-3 rounded-full text-xs techStack'>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className='flex items-center mt-4 lg:mt-0'>
                    <IconButton
                        id="basic-button"
                        aria-controls={openMenu ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={openMenu ? 'true' : undefined}
                        onClick={handleMenuClick}
                        className='text-white'
                    >
                        <MoreVertIcon className='text-white' />
                    </IconButton>

                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={openMenu}
                        onClose={handleMenuClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        {auth.user?.role === "ROLE_ADMIN" ? (
                            <div>
                                <MenuItem onClick={handleOpenUserList}>Assigned User</MenuItem>
                                <MenuItem onClick={handleOpenSubmissinList}>See Submissions</MenuItem>
                                <MenuItem onClick={handleOpenUpdateTaskModel}>Edit</MenuItem>
                                <MenuItem onClick={handleDeleteTask}>Delete</MenuItem>
                            </div>
                        ) : (
                            <div>
                                <MenuItem onClick={handleOpenSubmitFormModel}>Submit</MenuItem>
                            </div>
                        )}
                    </Menu>
                </div>

            </div>
            
            <UserList item={item} open={openUserList} handleClose={handleCloserUserList}></UserList>
            <SubmissionList item={item} open={openSubmissionList} handleClose={handleCloserSubmissionList}></SubmissionList>
            <EditTaskForm item={item} open={EditTask} handleClose={handleCloserEditTask}></EditTaskForm>
            <SubmissionFormModel item={item} open={openSubmitFormModel} handleClose={handleCloserSubmitFormModel}></SubmissionFormModel>
        </div> 
    );
};

export default Taskcard;