import styled from '@emotion/styled';
import { Button, TableCell } from '@mui/material';

export const modalBox = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: "#f5f5f5",
    p: 0,
    borderRadius: '10px'
  };

export const StyledTableCell = styled(TableCell)({
    textAlign: "center"
})

export const StyledRowBtn = styled(Button)({
    padding: '0.5em 2.5em',
    textTransform: 'lowercase', 
    fontWeight: 300, 
    fontSize: '1rem', 
    boxShadow: 'none',
})

export const StyledModalBtn = styled(Button)({
    textTransform: 'none',
    fontWeight: 300, 
    fontSize: '1rem', 
    boxShadow: 'none'
})

export const addUserBtn = {
    p: '0.5em 3.5em', 
    boxShadow: 'none', 
    textTransform: 'none', 
    fontSize: '1rem'
}

export const editRowBtn = {
    backgroundColor: '#eea94f', 
    '&:hover': {backgroundColor: '#c98f42', boxShadow: 'none'}
}

export const deleteRowBtn = {
    backgroundColor: '#d8504e', 
    '&:hover': {backgroundColor: '#b3403e'}
}