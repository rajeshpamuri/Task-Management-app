import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { createTask } from '../../ReduxToolkit/TaskSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    outline: 'none',
    boxShadow: 24,
    p: 4,
};

const tags = ["Angular", "React", "Vuejs", "SpringBoot", "Node js", "Python"];

export default function CreateNewTaskForm({ handleClose, open }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        tags: [],
        deadline: dayjs(), // Initialized as a dayjs object for the UI
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleTagsChange = (event, value) => {
        setFormData({
            ...formData,
            tags: value || [], // Ensures it never becomes null or undefined
        });
    };

    const handleDeadlineChange = (newValue) => {
        setFormData({
            ...formData,
            deadline: newValue,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Format the payload for Spring Boot before sending
        const payload = {
            ...formData,
            // Formats dayjs to '2024-02-29T18:30:00'
            deadline: formData.deadline ? formData.deadline.format('YYYY-MM-DDTHH:mm:ss') : null
        };
        
        // Dispatch the formatted payload instead of the raw formData
        dispatch(createTask(payload));
         
        console.log("Submitting to backend:", payload);

        // 1. Close the modal automatically
        handleClose();

        // 2. Reset the form state for the next time it is opened
        setFormData({
            title: "",
            image: "",
            description: "",
            tags: [],
            deadline: dayjs(),
        });
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
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">

                            <Grid item xs={12}>
                                <TextField
                                    label="Title"
                                    fullWidth
                                    name='title'
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Image URL"
                                    fullWidth
                                    name='image'
                                    value={formData.image}
                                    onChange={handleChange}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <TextField
                                    label="Description"
                                    fullWidth
                                    multiline
                                    rows={4}
                                    name='description'
                                    value={formData.description}
                                    onChange={handleChange}
                                    required
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <Autocomplete
                                    multiple
                                    id="multiple-limit-tags"
                                    options={tags}
                                    onChange={handleTagsChange}
                                    value={formData.tags} // Keep this strictly tied to state
                                    isOptionEqualToValue={(option, value) => option === value} // Added this to help MUI track the strings
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField
                                            label="Tags"
                                            fullWidth
                                            {...params}
                                        />
                                    )}
                                />
                            </Grid>

                            <Grid item xs={12}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DateTimePicker
                                        label="Deadline"
                                        value={formData.deadline}
                                        onChange={handleDeadlineChange}
                                        renderInput={(params) => <TextField {...params} fullWidth required />}
                                    />
                                </LocalizationProvider>
                            </Grid>

                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2, py: 1.5, backgroundColor: '#c24dd0', '&:hover': { backgroundColor: '#a03bb0' } }}
                                >
                                    Create Task
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}