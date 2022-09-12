import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatSliceState, Profile } from "../chat/types";
import { RootState } from "../store";
import SidebarSliceState from "./types";


const initialState: SidebarSliceState = {
    users: [],
    isModal: false
}

const sidebarSlice = createSlice({
    name: 'sidebar',
    initialState,
    reducers: {
        searchUser(state, action) {
            state.users = state.users.filter(user => user.name.includes(action.payload))
        },
        setUsers(state, action: PayloadAction<Profile[]>) {
            state.users = action.payload
        },
        setIsModal(state, action: PayloadAction<boolean>) {
            state.isModal = action.payload
        }
    }
})

export const { searchUser, setUsers, setIsModal } = sidebarSlice.actions

export const sidebarSelector = (state: RootState) => state.sidebarSlice

export default sidebarSlice.reducer