import React, { FC, useEffect, useState } from 'react';
import * as S from '../../styles/components/Sidebar/ChatsItem';
import person from '../../assets/person.svg';
import { Profile } from '../../redux/chat/types';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../redux/chat/slice';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

type ChatsItemProps = {
    user: Profile;
    onClickChat: (user: Profile, index: number) => void;
    index: number;
    isSelected: boolean;
}

const ChatsItem: FC<ChatsItemProps> = ({ user, onClickChat, isSelected, index }) => {
    const { profile } = useSelector(chatSelector)
    const [lastMessage, setLastMessage] = useState<any>(null)
    const [user2] = useAuthState(auth)
    const loggedUserUid = user2?.uid
    const avatarSize = user.avatar.size - 65

    useEffect(() => {
        const chatUid = user?.uid
        const id = loggedUserUid && chatUid && loggedUserUid > chatUid ? `${loggedUserUid + chatUid}` : `${chatUid + loggedUserUid}`
        const getLastMessage = onSnapshot(doc(db, 'lastMessage', id), doc => {
            setLastMessage(doc.data())
        })
        return () => getLastMessage()
    }, [])

    return (
        <S.Container isSelected={isSelected} onClick={() => onClickChat(user, index)}>
            <S.ChatAvatar>
                <img width={avatarSize} height={avatarSize} src={user.avatar.url || person} alt='avatar' />
            </S.ChatAvatar>
            <S.MainInfo>
                <S.UserName>{user.name}</S.UserName>
                <S.LastMessage>
                    {lastMessage?.text.length > 38 ? `${lastMessage?.text.substring(0, 38)}...` : lastMessage?.text}
                </S.LastMessage>
            </S.MainInfo>
            <S.UnreadMessages>
                <span>2</span>
            </S.UnreadMessages>
        </S.Container>
    )
}

export default ChatsItem