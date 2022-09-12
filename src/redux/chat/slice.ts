import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Chat, ChatSliceState, Message, Profile } from "./types";
import { RootState } from "../store";
import { stat } from "fs";


const initialState: ChatSliceState = {
    chat: null,
    messages: [],
    profile: null,
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
        deleteMessage(state, action: PayloadAction<string>) {
            state.messages = state.messages.filter(message => message.uid !== action.payload)
        },
        setProfile(state, action: PayloadAction<Profile | null>) {
            state.profile = action.payload
        }
    }
})

export const { setChat, setMessages, deleteMessage, setProfile } = chatSlice.actions

export const chatSelector = (state: RootState) => state.chatSlice

export default chatSlice.reducer