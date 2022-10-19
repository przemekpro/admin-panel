import React, {useState} from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { Button, Paper, TextField, Typography } from '@mui/material';

import { addUser } from '../redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux'

import { useForm } from "react-hook-form";


const styledFormBtn = {
    textTransform: 'none', 
    fontSize: '1.1rem', 
    fontWeight: '300'
}


export default function AddNewUser() {

    const [newUser, setNewUser] = useState({
        name: '',
        email: ''
    })
    
    const {users} = useSelector(state => state.users)
    const dispatch = useDispatch()
    
    const {register, handleSubmit, formState: {errors}} = useForm()

    const navigate = useNavigate();


    function addNewUser(e) {
        const {name, value} = e.target
        const usersId = users.map(user => {
            return parseInt(user.id)
        })
        
        const lastId = usersId.length > 0 ? Math.max(...usersId) : 0
        setNewUser(prevState => {
            return {
                ...prevState,
                id: lastId + 1,
                [name]: value
            }
        })
    }

    function postUser() {
        axios.post('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data', newUser)
            .catch(err => console.log(err))
    }

    function onSubmit() {
        postUser()
        dispatch(addUser(newUser))
        setNewUser({name: '', email: ''})
        navigate('/');
    }


    return(

        <Paper elevation={3} sx={{p: '1em', borderRadius: '20px'}}>
            <div className="form--header">
                <Typography variant='h3' fontSize={'1.8rem'} fontWeight={400}>Add new user</Typography>
            </div>
            <form className="input--form" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    {...register("name", {
                        onChange: addNewUser,
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
                    type="email"
                    label="Email"
                    {...register("email", {
                        onChange: addNewUser,
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
                    <Button type='submit' variant="contained" color='success' sx={styledFormBtn}>Submit</Button>
                </div>
            </form>
        </Paper>
    )
}

