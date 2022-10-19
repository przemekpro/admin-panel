import React, { useState } from "react";
import axios from "axios";

import { Button, Paper, TextField, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";

import { editUser } from '../redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from "react-hook-form";


const styledFormBtn = {
    textTransform: 'none', 
    fontSize: '1.1rem', 
    fontWeight: '300'
}

export default function EditUser() {
    
    
    const {editedUser} = useSelector(state => state.users)
    const dispatch = useDispatch()

    const [editedData, setEditedData] = useState(editedUser)

    const {register, handleSubmit, formState: {errors}} = useForm()

    const navigate = useNavigate();


    function editNewUser(e) {
        const {name, value} = e.target
        setEditedData(prevState => {
            return {
                ...prevState,
                [name]: value
            }
        })
    }

    function sendEditedUser() {
        axios.patch(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${editedData.id}`, editedData)
            .catch(err => console.log(err))
    }
    
    function onSubmit() {
        sendEditedUser()
        dispatch(editUser(editedData))
        setEditedData({name: '', email: ''})
        navigate('/');
    }
    
    return(
        <Paper elevation={3} sx={{p: '1em', borderRadius: '20px'}}>
            <div className="form--header">
                <Typography variant='h3' fontSize={'1.8rem'} fontWeight={400}>Edit user</Typography>
            </div>
            <form className="input--form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="name"
                    name="name"
                    defaultValue={editedUser.name}
                    type="text"
                    label="Name"
                    {...register("name", {
                        onChange: editNewUser,
                        required: 'Name is required',
                        minLength: {
                            value: 2, 
                            message:'Name should be of minimum 2 characters length'
                        },
                        maxLength: {
                            value: 100,
                            message:'Name should be of maximum 100 characters length'
                        },
                    })} 
                    error={!!errors?.name}                 
                    helperText={errors?.name ? errors.name.message : null}
                />

                <TextField
                    id="email"
                    name="email"
                    defaultValue={editedUser.email}
                    type="email"
                    label="Email"
                    {...register("email", {
                        onChange: editNewUser,
                        required: 'Email is required',
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Enter a valid email"
                        }
                })} 
                    error={!!errors?.email}                 
                    helperText={errors?.email ? errors.email.message : null}

                />
                <div className="btn--container">
                    <Button onClick={() => navigate('/')} variant="outlined" color="error" sx={styledFormBtn}>Cancel</Button>
                    <Button type="submit" variant="contained" color="success" sx={styledFormBtn}>Submit</Button>
                </div>
            </form>
                
        </Paper>
    )
}