import React, { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import styled from 'styled-components'
import Chat from '../components/Chat'
import Modal from '../components/Modal';
import Sidebar from '../components/Sidebar';
import { auth } from '../firebase';
import { chatSelector, setChat, setMessages } from '../redux/chat/slice';
import { sidebarSelector } from '../redux/sidebar/slice';
import { useAppDispatch } from '../redux/store';

const Home = () => {
    const { isModal } = useSelector(sidebarSelector)

    return (
        <div style={{ display: 'flex' }}>
            <Sidebar />
            <Chat />
            {isModal && <Modal />}
        </div>
    )
}

export default Home