import { Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { login } from '../../ReduxToolkit/AuthSlice';

const SignIn = ({togglePanel}) => {
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: "",
        password: "" 
    });
    
    // 1. THE FIX: State to block Chrome autofill on load
    const [isReadOnly, setIsReadOnly] = useState(true);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value })
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formData));
        setFormData({ email: "", password: "" });
        
        // Lock the fields again after submitting/logging out
        setIsReadOnly(true); 
    }
    
    return (
        <div style={{ width: "100%", maxWidth: "350px", margin: "0 auto" }}>
            <h1 className='text-lg font-bold text-center pb-8'>Login</h1>
            
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Email"
                    name='email'
                    type='email'
                    value={formData.email}
                    onChange={handleChange}
                    placeholder='enter your email.....'
                    sx={{ mb: 3 }} 
                    // 2. Unlock the field when the user actually clicks it
                    onFocus={() => setIsReadOnly(false)}
                    // 3. Keep it locked on load so Chrome can't inject data
                    inputProps={{ readOnly: isReadOnly }} 
                />
                <TextField
                    fullWidth
                    label="Password"
                    name='password'
                    type='password'
                    value={formData.password}
                    onChange={handleChange}
                    placeholder='enter your password.....'
                    sx={{ mb: 3 }} 
                    onFocus={() => setIsReadOnly(false)}
                    inputProps={{ readOnly: isReadOnly }} 
                />
                <div>
                    <Button 
                        fullWidth
                        variant="contained"
                        className='customeButton'
                        type='submit'
                        sx={{ padding: "0.9rem" }}>
                        Login
                    </Button>
                </div>
            </form>
            <div className='mt-5 flex items-center gap-2 py-5 justify-center'>
                <span>Don't have an account?</span>
                <Button onClick={togglePanel}>SignUp</Button>
            </div>
        </div>
    )
}

export default SignIn