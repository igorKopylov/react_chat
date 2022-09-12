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
    const [lastMessage, setLastMessage] = useState('')
    const [authUser] = useAuthState(auth)
    const avatarSize = user.avatar.size - 65
    const user1 = authUser?.uid
    const user2 = user!.uid
    const id = user1 && user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

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
                    {lastMessage?.length > 38 ? `${lastMessage.slice(0, 31)}...` : lastMessage}
                </S.LastMessage>
            </S.MainInfo>
            <S.UnreadMessages>
                <span>2</span>
            </S.UnreadMessages>
        </S.Container>
    )
}

export default ChatsItem