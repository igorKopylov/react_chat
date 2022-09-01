import React, { FC, useEffect, useState } from 'react'
import { addDoc, collection, onSnapshot, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import ChatsItem from './ChatsItem';
import { useAuthState } from 'react-firebase-hooks/auth';
import * as S from '../../styles/components/Sidebar/Chats'
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/store';
import { chatSelector, setChat, setMessages } from '../../redux/chat/slice';
import { Profile } from '../../redux/chat/types';

const Chats: FC = () => {
  const [users, setUsers] = useState<Profile[]>([])
  const { profile } = useSelector(chatSelector)
  const [user] = useAuthState(auth)
  const [userId, setUserId] = useState<number>(-1)

  const usersRef = collection(db, 'users')
  const loggedUserUid = user?.uid;
  const dispatch = useDispatch()

  const selectChat = async (chat: any, index: number) => {
    dispatch(setChat(chat))
    setUserId(index)
    const chatUid = chat?.uid
    const id = loggedUserUid && chatUid && loggedUserUid > chatUid ? `${loggedUserUid + chatUid}` : `${chatUid + loggedUserUid}`
    const chatRoomRef = collection(db, 'messages', id, 'chat')
    const q = query(chatRoomRef, orderBy('createdAt'))
    onSnapshot(q, querySnapshot => {
      const messages: any[] = []
      querySnapshot.forEach(message => {
        messages.push({ ...message.data() })
      })
      dispatch(setMessages(messages))
    })
  }

  useEffect(() => {
    const q = query(usersRef, where('uid', 'not-in', [profile?.uid]))
    const getUsers = onSnapshot(q, querySnapShot => {
      const users: Profile[] = []
      querySnapShot.forEach((user: any) => {
        users.push(user.data())
      })
      setUsers(users)
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