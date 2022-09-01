import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { chatSelector } from '../../redux/chat/slice'
import { Message as MessageType } from '../../redux/chat/types'
import * as S from '../../styles/components/Chat/Body'
import Message from './Message'

const Body = () => {
    const { messages } = useSelector(chatSelector)

    return (
        <S.Container>
            {
                messages.map((message: MessageType, i) => {
                    return <Message message={message} key={i} />
                })
            }
        </S.Container>
    )
}

export default Body