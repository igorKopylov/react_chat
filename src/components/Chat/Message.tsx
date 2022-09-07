import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import * as S from '../../styles/components/Chat/Message';
import person from '../../assets/person.svg'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../redux/chat/slice';
import { doc, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Message as MessageType } from '../../redux/chat/types';

type MessageProps = {
    message: MessageType
}

const Message: FC<MessageProps> = ({ message }) => {
    const [user] = useAuthState(auth)
    const isOwnMessage = message.uid === user?.uid
    const avatarSize = message.avatar.size
    const messageRef = useRef<HTMLDivElement>(null)
    const messageDate = new Date(message.createdAt?.seconds * 1000).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    return (
        <S.Container ref={messageRef} isOwnMessage={isOwnMessage}>
            <S.Avatar isOwnMessage={isOwnMessage}>
                <img src={message.avatar.url || person} width={avatarSize} height={avatarSize} alt='avatar' />
            </S.Avatar>
            <S.Time isOwnMessage={isOwnMessage}>{messageDate}</S.Time>
            <S.Message isOwnMessage={isOwnMessage}>
                {
                    message.media && <img width={280} src={message.media} alt='image' />
                }
                {message.text}
            </S.Message>
        </S.Container>
    )
}

export default Message