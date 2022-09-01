import React, { useState } from 'react';
import * as S from '../../styles/components/Sidebar/Search';
import loupe from '../../assets/loupe.svg'

const Search = () => {
    const [value, setValue] = useState('')

    return (
        <S.Container>
            <S.Loupe src={loupe} alt='maginifying glass' />
            <S.Input value={value} onChange={e => setValue(e.target.value)} placeholder='Search user...' />
        </S.Container>
    )
}

export default Search