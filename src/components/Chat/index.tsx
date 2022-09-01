import React from 'react';
import * as S from '../../styles/components/Chat'
import Body from './Body';
import Header from './Header';
import Input from './Input';

const Chat = () => {
    return (
        <S.Container>
            <Header />
            <Body />
            <Input />
        </S.Container>
    )
}

export default Chat