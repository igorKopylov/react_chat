import React, { FC, useEffect, useState } from 'react'
import { addDoc, collection, getDocs, limit, onSnapshot, orderBy, query, startAfter, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import ChatsItem from './ChatsItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as S from '../../styles/components/Sidebar/Chats'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { chatSelector, setChat, setMessages } from '../../redux/chat/slice';
import { Profile, Message } from '../../redux/chat/types';
import { setUsers, sidebarSelector } from '../../redux/sidebar/slice';

const Chats: FC = () => {
  const { profile } = useSelector(chatSelector)
  const { users } = useSelector(sidebarSelector)
  const [user] = useAuthState(auth)
  const [userId, setUserId] = useState<number>(-1)
  const usersRef = collection(db, 'users')
  const dispatch = useAppDispatch()

  const selectChat = async (chat: any, index: number) => {
    dispatch(setChat(chat))
    setUserId(index)
    const user1 = user!.uid
    const user2 = chat!.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
    const chatRoomRef = collection(db, 'messages', id, 'chat')
    const q = query(chatRoomRef, orderBy('createdAt'))
    onSnapshot(q, querySnapshot => {
      const messages: Message[] = []
      querySnapshot.forEach((message: any) => {
        messages.push({ ...message.data(), id: message.id })
      })
      dispatch(setMessages(messages))
    })
  }

  useEffect(() => {
    const q = query(usersRef, where('uid', 'not-in', [profile?.uid]))
    const getUsers = onSnapshot(q, querySnapshot => {
      const users: Profile[] = []
      querySnapshot.forEach((user: any) => {
        users.push(user.data())
      })
      dispatch(setUsers(users))
    })
    return () => getUsers()
  }, []);

  return (
    <S.Container>
      {
        users && users.map((user, i) => {
          return <ChatsItem
            onClickChat={selectChat}
            user={user}
            index={i}
            isSelected={userId === i}
            key={i}
          />
        })
      }
    </S.Container>
  )
}

export default Chats