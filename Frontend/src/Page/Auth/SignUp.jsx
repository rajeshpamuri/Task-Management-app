import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { register } from '../../ReduxToolkit/AuthSlice';

const SignUp = ({ togglePanel }) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        password: "",
        role: ""
    });

    // 1. THE FIX: State to block Chrome autofill
    const [isReadOnly, setIsReadOnly] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(register(formData));
        console.log("register form", formData)
        
        setFormData({
            fullName: "",
            email: "",
            password: "",
            role: ""
        });
        
        // Lock the fields again after submitting
        setIsReadOnly(true);
    }

    return (
        <div style={{ width: "100%", maxWidth: "350px", margin: "0 auto" }}>
            <h1 className='text-lg font-bold text-center pb-8'>Register</h1>
            
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Full Name"
                    name='fullName'
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder='Enter your fullName.....'
                    sx={{ mb: 3 }}
                    onFocus={() => setIsReadOnly(false)}
                    inputProps={{ readOnly: isReadOnly }}
                />
                <TextField
                    fullWidth
                    label="Email"
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='Enter your email.....'
                    sx={{ mb: 3 }}
                    onFocus={() => setIsReadOnly(false)}
                    inputProps={{ readOnly: isReadOnly }}
                />
                <TextField
                    fullWidth
                    label="Password"
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='Enter your password.....'
                    sx={{ mb: 3 }}
                    onFocus={() => setIsReadOnly(false)}
                    inputProps={{ readOnly: isReadOnly }}
                />
                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={formData.role}
                        label="Role"
                        name='role'
                        onChange={handleChange}
                    >
                        <MenuItem value={"ROLE_CUSTOMER"}>USER</MenuItem>
                        <MenuItem value={"ROLE_ADMIN"}>ADMIN</MenuItem>
                    </Select>
                </FormControl>
                <div>
                    <Button
                        fullWidth
                        className='customeButton'
                        type='submit'
                        sx={{ mt: 3, padding: "0.9rem" }}>
                        Register
                    </Button>
                </div>
            </form>
            <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
                <span>Already have an account?</span>
                <Button onClick={togglePanel}>SignIn</Button>
            </div>
        </div>
    )
}

export default SignUp