import React from 'react';
import { useSelector } from 'react-redux';
import { chatSelector } from '../../redux/chat/slice';
import * as S from '../../styles/components/Chat/Header';

const Header = () => {
    const { chat } = useSelector(chatSelector)

    return (
        <S.Container>
            <S.ChatName>{chat?.name}</S.ChatName>
        </S.Container>
    )
}

export default Header