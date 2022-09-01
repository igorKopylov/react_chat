import React, { FC, useEffect, useRef, useState, MouseEvent } from 'react';
import * as S from '../../styles/components/Chat/Message';
import person from '../../assets/person.svg'
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../redux/chat/slice';
import { doc, onSnapshot } from 'firebase/firestore';
import { Message as MessageType } from '../../redux/chat/types';

type MessageProps = {
    message: MessageType
}

const Message: FC<MessageProps> = ({ message }) => {
    const [user] = useAuthState(auth)
    const isOwnMessage = message.uid === user?.uid
    const [coords, setCoords] = useState<{ x: number, y: number } | null>(null)
    const [isPopup, setIsPopup] = useState(false)
    const avatarSize = message.avatar.size
    const messageRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        messageRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [message])

    const showPopup = (event: MouseEvent) => {
        setCoords({ x: event.clientX, y: event.clientY })
    }
    console.log(coords)

    return (
        <S.Container onMouseDown={(e: MouseEvent) => showPopup(e)} ref={messageRef} isOwnMessage={isOwnMessage}>
            {
                isPopup && (
                    <S.Popup coords={coords}>
                        d
                    </S.Popup>
                )
            }
            <S.Avatar isOwnMessage={isOwnMessage}>
                <img src={message.avatar.url || person} width={avatarSize} height={avatarSize} alt='avatar' />
            </S.Avatar>
            <S.Time isOwnMessage={isOwnMessage}>9:00 AM</S.Time>
            <S.Message isOwnMessage={isOwnMessage}>
                {message.text}
            </S.Message>
        </S.Container>
    )
}

export default Message