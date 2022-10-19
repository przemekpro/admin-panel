import React, {useState} from "react";
import { useNavigate } from "react-router-dom";

import { Button, Paper, TextField, Typography } from '@mui/material';

import { addUser } from '../redux/usersSlice';
import { useSelector, useDispatch } from 'react-redux'


const styledFormBtn = {
    textTransform: 'none', 
    fontSize: '1.1rem', 
    fontWeight: '300'
}


export default function AddNewUser() {

    const navigate = useNavigate();

    const [newUser, setNewUser] = useState({
        name: '',
        email: ''
    })


    const {users} = useSelector(state => state.users)
    const dispatch = useDispatch()


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

    function handleSubmit(e) {
        e.preventDefault()
        dispatch(addUser(newUser))
        setNewUser({name: '', email: ''})
        navigate('/');
    }


    return(

        <Paper elevation={3} sx={{p: '1em', borderRadius: '20px'}}>
            <div className="form--header">
                <Typography variant='h3' fontSize={'1.8rem'} fontWeight={400}>Add new user</Typography>
            </div>
            <form className="input--form" onSubmit={handleSubmit}>
                <TextField
                    required
                    id="name"
                    name="name"
                    type="text"
                    label="Name"
                    value={newUser.name}
                    onChange={addNewUser}
                />

                <TextField
                    required
                    id="email"
                    name="email"
                    type="email"
                    label="Email"
                    value={newUser.email}
                    onChange={addNewUser}                    
                />
                <div className="btn--container">
                    <Button onClick={() => navigate('/')} variant="outlined" color="error" sx={styledFormBtn}>Cancel</Button>
                    <Button type='submit' variant="contained" color='success' sx={styledFormBtn}>Submit</Button>
                </div>
            </form>
        </Paper>
    )
}