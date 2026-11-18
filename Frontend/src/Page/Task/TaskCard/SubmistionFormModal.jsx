import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { Grid, TextField, Button } from '@mui/material';
import { useDispatch } from 'react-redux';
import { submitTask } from '../../../ReduxToolkit/SubmissionsSlice';

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

export default function SubmissionFormModel({ item, handleClose, open }) {
    const dispatch = useDispatch();
    
    const [formData, setFormData] = useState({
        githubLink: "",
        description: "",
    });

    useEffect(() => {
        if (open) {
            setFormData({
                githubLink: "",
                description: "",
            });
        }
    }, [open]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(submitTask({
            taskId: item.id, // Safely grabbed directly from the passed prop!
            githubLink: formData.githubLink,
            description: formData.description
        }));

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
                    <h2 className="text-lg font-bold mb-4 text-white border-b border-gray-700 pb-2">
                        Submit Task
                    </h2>
                    
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} alignItems="center">
                            
                            <Grid item xs={12}>
                                <TextField
                                    label="Github Link"
                                    fullWidth
                                    name='githubLink'
                                    value={formData.githubLink}
                                    onChange={handleChange}
                                    required
                                    InputLabelProps={{ style: { color: '#9ca3af' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4b5563' }, '&:hover fieldset': { borderColor: '#c24dd0' } } }}
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
                                    InputLabelProps={{ style: { color: '#9ca3af' } }}
                                    InputProps={{ style: { color: 'white' } }}
                                    sx={{ '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: '#4b5563' }, '&:hover fieldset': { borderColor: '#c24dd0' } } }}
                                />
                            </Grid>
                            
                            <Grid item xs={12}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    fullWidth
                                    sx={{ mt: 2, py: 1.5, backgroundColor: '#c24dd0', '&:hover': { backgroundColor: '#a03bb0' } }}
                                >
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}