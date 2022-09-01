import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, ChatSliceState, Message, Profile } from "./types";
import { RootState } from "../store";


const initialState: ChatSliceState = {
    chat: null,
    messages: [],
    profile: null,
    isModal: false
}

const chatSlice = createSlice({
    name: 'chat',
    initialState,
    reducers: {
        setChat(state, action: PayloadAction<Chat | null>) {
            state.chat = action.payload
        },
        setMessages(state, action: PayloadAction<Message[]>) {
            state.messages = action.payload
        },
        setProfile(state, action: PayloadAction<Profile | null>) {
            state.profile = action.payload
        },
        setIsModal(state, action: PayloadAction<boolean>) {
            state.isModal = action.payload
        }
    }
})

export const { setChat, setMessages, setProfile, setIsModal } = chatSlice.actions

export const chatSelector = (state: RootState) => state.chatSlice

export default chatSlice.reducer