import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  editedUser: [],
  editedIndex: ''
}

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    getUsers: (state, action) => {
      const users = action.payload
      state.users = users
      
    },
    addUser: (state, action) => {
        const user = action.payload
        state.users = [...state.users, user]
    },
    editData: (state, action) => {
        const userId = action.payload
        const userIndex = state.users.findIndex(user => user.id === userId)
        state.editedIndex = userIndex
        state.editedUser = state.users[userIndex]
    },
    editUser: (state, action) => {
      state.users.splice(state.editedIndex, 1, action.payload)
    },
    deleteUser: (state, action) => {
        const user = state.users.filter(user => user.id !== action.payload)
        state.users = user
      },
  },
})


export const { getUsers, addUser, editData, editUser, deleteUser } = usersSlice.actions

export default usersSlice.reducer