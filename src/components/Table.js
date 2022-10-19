import React, {useState, useEffect} from 'react';
import axios from 'axios';

import { Button, CircularProgress, Modal, Paper, Typography, Table, TableBody, TableContainer, TableHead, TableRow } from '@mui/material';
import { Box } from '@mui/system';
import { ImportExport } from '@mui/icons-material';
import {modalBox, StyledTableCell, StyledRowBtn, StyledModalBtn, addUserBtn, editRowBtn, deleteRowBtn} from '../style/styledMUI'

import {Link} from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { deleteUser, getUsers, editData } from '../redux/usersSlice';


const loader = <Box sx={{p: '2em 0', textAlign: 'center'}}><CircularProgress /></Box>
const noUsersInfo = <Box sx={{p: '2em 0', textAlign: 'center'}}><Typography variant='h5' fontWeight={500} color={'#9d9fa1'}>No users found :(</Typography></Box>


export default function BasicTable() {

    const {users} = useSelector(state => state.users)
    const dispatch = useDispatch()

    
    const [open, setOpen] = useState(false);
    const [toggleSort, setToggleSort] = useState(true)
    const [render, setRender] = useState(true)
    const [deletedUser, setDeletedUser] = useState()
    
    useEffect(()=> {
        if (users.length === 0 && render) {
            axios.get('https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data')
                .then(response => dispatch(getUsers(response.data)))
                .catch(error => console.log(error))
        }
    },[users, render, dispatch])


    function findDeletedUser(id) {
        const newArray = [...users]
        const filteredUser = newArray.filter(user => user.id === parseInt(id))
        setDeletedUser(filteredUser)
    }


    function handleOpen(e) {
        setOpen(true)
        findDeletedUser(e.target.value)
    }

    function handleClose() {
        setOpen(false)
    }


    function editUserData(e) {
        const eventId = parseInt(e.target.value)
        dispatch(editData(eventId))
    }

    function sendDeletedUser() {
        const eventId = parseInt(deletedUser[0].id)
        axios.delete(`https://my-json-server.typicode.com/karolkproexe/jsonplaceholderdb/data/${eventId}`)
            .then(response => dispatch(deleteUser(eventId)))
            .catch(err => console.log(err))
    }

    function deleteUserData() {
        const eventId = parseInt(deletedUser[0].id)

        sendDeletedUser()
        dispatch(deleteUser(eventId))
        setDeletedUser()
        handleClose()
        setRender(false)
    }

    function sortUsers() {
        setToggleSort(prevState => !prevState)
        const sortAToZ = [...users].sort((a, b) => a.username?.localeCompare(b.username))
        const sortZToA = [...users].sort((a, b) => b.username?.localeCompare(a.username))

        const toggle = toggleSort ? sortAToZ : sortZToA
        dispatch(getUsers(toggle))
    }


    const userHTML = users.map((row) => (

        <TableRow key={row.id}>
            <StyledTableCell>{row.id}</StyledTableCell>
            <StyledTableCell>{row.name}</StyledTableCell>
            <StyledTableCell>{row.username && (row.username).toLowerCase()}</StyledTableCell>
            <StyledTableCell>{row.email && (row.email).toLowerCase()}</StyledTableCell>
            <StyledTableCell>{row.address && row.address.city}</StyledTableCell>
            <StyledTableCell>
                <Link to="/edituser">
                    <StyledRowBtn 
                        variant="contained" 
                        onClick={editUserData}
                        value={row.id}
                        sx={editRowBtn}     
                    >
                    edit
                    </StyledRowBtn>
                </Link>
            </StyledTableCell>
            <StyledTableCell>
                <StyledRowBtn variant="contained" 
                    onClick={handleOpen}
                    value={row.id}
                    sx={deleteRowBtn}
                    >
                    delete
                </StyledRowBtn>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        BackdropProps= {{style: {backgroundColor: 'rgba(0, 0, 0, 0.1)'}}}
                    >
                        <Box sx={modalBox}>
                            <Typography id="modal-modal-title" variant="h6" component="h2" p={2} pb={0}>
                                Delete
                            </Typography>
                            <hr></hr>
                            {deletedUser && <Typography sx={{ m: '2em 1em' }}>
                                Are you sure you want to delete <strong>{deletedUser[0].name}</strong>?
                            </Typography>}
                            <hr></hr>

                            <div className='btn--container__delete'>
                                
                                <StyledModalBtn variant="contained"  
                                    onClick={handleClose}
                                    sx={{padding: '0.5em 1.5em', backgroundColor: "#616161", '&:hover': {bgcolor: '#4d4c4c'}}}
                                >
                                    Cancel
                                </StyledModalBtn>
                                

                                <StyledModalBtn variant="contained" 
                                    onClick={deleteUserData}
                                    value={row.id}
                                    sx={{padding: '0.5em 3em', backgroundColor: '#d8504e', '&:hover': {backgroundColor: '#b3403e'},}}
                                >
                                    Delete
                                </StyledModalBtn>
                            </div>
                        </Box>
                    </Modal>
            </StyledTableCell>
        </TableRow>
    ))


    return (
            <Paper elevation={3} sx={{p: '1em', mb: '5em', borderRadius: '20px'}}>
                <div className='form--header'>
                    <Typography variant='h3' fontSize={'1.8rem'} fontWeight={400}>User list</Typography>
                    <Link to="/newuser">
                        <Button variant="contained" sx={addUserBtn}>Add new</Button>
                    </Link>
                </div>


                <TableContainer sx={{border: '1px solid lightgray', borderRadius: 0, margin: '1em 0'}}>
                    <Table sx={{ minWidth: 650}} aria-label="table">
                        <TableHead sx={{ backgroundColor: "#f5f5f5"}}>
                            <TableRow>
                                <StyledTableCell>Id</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>
                                    <Button 
                                        onClick={sortUsers} 
                                        sx={{textTransform: 'none', color: '#000'}} >
                                            Username<ImportExport fontSize='small' />
                                    </Button>
                                </StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>City</StyledTableCell>
                                <StyledTableCell>Edit</StyledTableCell>
                                <StyledTableCell>Delete</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {userHTML}
                        </TableBody>
                    </Table>
                    {users.length === 0 && render && loader}
                    {users.length === 0 && !render && noUsersInfo}
                </TableContainer>
            </Paper>
    );
}