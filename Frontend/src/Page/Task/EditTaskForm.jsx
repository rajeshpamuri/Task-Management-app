import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Autocomplete, Grid, TextField, Button } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { useDispatch } from 'react-redux';
import { updateTask } from '../../ReduxToolkit/TaskSlice';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const tags = ["Angular", "React", "Vuejs", "SpringBoot", "Node js", "Python"];

export default function EditTaskForm({ item, handleClose, open }) {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        title: "",
        image: "",
        description: "",
        tags: [],
        deadline: dayjs(),
    });

    // When the modal opens, immediately grab the 'item' prop and fill the form!
    useEffect(() => {
        if (item) {
            setFormData({
                title: item.title || "",
                image: item.image || "",
                description: item.description || "",
                tags: item.tags || [],
                // This prevents the blank form crash by correctly parsing the backend date string
                deadline: item.deadline ? dayjs(item.deadline) : dayjs(),
            });
        }
    }, [item, open]);

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
            tags: value || [],
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

        // Format the date for Spring Boot
        const payload = {
            ...formData,
            deadline: formData.deadline ? formData.deadline.format('YYYY-MM-DDTHH:mm:ss') : null
        };

        console.log("Submitting to backend:", payload);
        dispatch(updateTask({ id: item.id, updatedTaskData: payload }));

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
                                    value={formData.tags}
                                    isOptionEqualToValue={(option, value) => option === value}
                                    getOptionLabel={(option) => option}
                                    renderInput={(params) => (
                                        <TextField label="Tags" fullWidth {...params} />
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
                                    Update Task
                                </Button>
                            </Grid>

                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}