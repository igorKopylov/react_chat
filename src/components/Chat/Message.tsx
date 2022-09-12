import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import * as S from '../../styles/components/Chat/Message';
import person from '../../assets/person.svg'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import trashCan from '../../assets/trashCan.svg';
import { Message as MessageType } from '../../redux/chat/types';
import { doc, deleteDoc } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { chatSelector, deleteMessage } from '../../redux/chat/slice';
import { useAppDispatch } from '../../redux/store';

type MessageProps = {
    message: MessageType
}

const Message: FC<MessageProps> = ({ message }) => {
    const [user] = useAuthState(auth)
    const isOwnMessage = message.uid === user?.uid
    const { chat } = useSelector(chatSelector)
    const avatarSize = message.avatar.size
    const messageRef = useRef<HTMLDivElement>(null)
    const messageDate = new Date(message.createdAt?.seconds * 1000).toLocaleString('en-US', { hour: 'numeric', minute: '2-digit' })
    const dispatch = useAppDispatch()

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    const onClickTrashCan = async () => {
        if (!isOwnMessage) return
        const user1 = user!.uid
        const user2 = chat!.uid
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        const messagesRef = doc(db, 'messages', id, 'chat', message.id)
        await deleteDoc(messagesRef)
        dispatch(deleteMessage(message.id))
    }

    return (
        <S.Container ref={messageRef} isOwnMessage={isOwnMessage}>
            <S.Avatar isOwnMessage={isOwnMessage}>
                <img src={message.avatar.url || person} width={avatarSize} height={avatarSize} alt='avatar' />
            </S.Avatar>
            <S.Time isOwnMessage={isOwnMessage}>{messageDate}</S.Time>
            <S.TrashCan isOwnMessage={isOwnMessage} className='trash-can' onClick={() => onClickTrashCan()} src={trashCan} alt='delete' />
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