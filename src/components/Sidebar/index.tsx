import React from 'react';
import * as S from '../../styles/components/Sidebar';
import Chats from './Chats';
import Header from './Header';
import Search from './Search';

const Sidebar = () => {
    return (
        <S.Container>
            <Header />
            <Search />
            <Chats />
        </S.Container>
    )
}

export default Sidebar