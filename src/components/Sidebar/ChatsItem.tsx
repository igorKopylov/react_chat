import React, { FC, useEffect, useState } from 'react';
import * as S from '../../styles/components/Sidebar/ChatsItem';
import person from '../../assets/person.svg';
import { Profile } from '../../redux/chat/types';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../redux/chat/slice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { collection, deleteDoc, doc, onSnapshot, orderBy, query, updateDoc } from 'firebase/firestore';
import { useAppDispatch } from '../../redux/store';

type ChatsItemProps = {
    user: Profile;
    onClickChat: (user: Profile, index: number) => void;
    index: number;
    isSelected: boolean;
}

const ChatsItem: FC<ChatsItemProps> = ({ user, onClickChat, isSelected, index }) => {
    const { profile, messages: messagesFromRedux } = useSelector(chatSelector)
    const [messages, setMessages] = useState<any>([])
    const [lastMessage, setLastMessage] = useState('')
    const [authUser] = useAuthState(auth)
    const dispatch = useAppDispatch()
    const avatarSize = user.avatar.size - 65
    const user1 = authUser?.uid
    const user2 = user!.uid
    const id = user1 && user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    
    useEffect(() => {
        const q = query(collection(db, 'messages', id, 'chat'), orderBy('createdAt'))
        onSnapshot(q, querySnapshot => {
            const messages: any = []
            querySnapshot.forEach(message => {
                messages.push(message.data())
            })
            setMessages(messages)
        })
    }, [messagesFromRedux])
    
    useEffect(() => {
        messages[messages.length - 1]?.text 
        ? updateDoc(doc(db, 'lastMessage', id), {text: messages[messages.length - 1]?.text})
        : deleteDoc(doc(db, 'lastMessage', id))
    })

    onSnapshot(doc(db, 'lastMessage', id), doc => {
        setLastMessage(doc.data()?.text)
    })
    return (
        <S.Container isSelected={isSelected} onClick={() => onClickChat(user, index)}>
            <S.ChatAvatar>
                <img width={avatarSize} height={avatarSize} src={user.avatar.url || person} alt='avatar' />
            </S.ChatAvatar>
            <S.MainInfo>
                <S.UserName>{user.name}</S.UserName>
                <S.LastMessage>
                    {lastMessage?.length > 45 ? `${lastMessage.slice(0, 45)}...` : lastMessage}
                </S.LastMessage>
            </S.MainInfo>
            <S.UnreadMessages isOnline={user.isOnline} />
        </S.Container>
    )
}

export default ChatsItem