import React, { useState, useEffect, useRef } from 'react';
import * as S from '../../styles/components/Sidebar/Search';
import loupe from '../../assets/loupe.svg';
import { useSelector } from 'react-redux';
import { setUsers, sidebarSelector } from '../../redux/sidebar/slice';
import { useAppDispatch } from '../../redux/store';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Profile } from '../../redux/chat/types';
import { chatSelector } from '../../redux/chat/slice';

const Search = () => {
    const { profile } = useSelector(chatSelector)
    const [value, setValue] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)
    const dispatch = useAppDispatch()

    const onChangeInput = (event: any) => {
        setValue(event.target.value)
    }

    const onClickCross = () => {
        setValue('')
        inputRef.current?.focus()
    }

    useEffect(() => {
        const q = query(
            collection(db, 'users'),
            value ? where('name', 'in', [value]) : where('uid', 'not-in', [profile?.uid])
        )
        const getUsers = onSnapshot(q, querySnapshot => {
            const users: Profile[] = []
            querySnapshot.forEach((user: any) => {
                users.push(user.data())
            })
            dispatch(setUsers(users))
        })
        return () => getUsers()
    }, [value])

    return (
        <S.Container>
            <S.Loupe src={loupe} alt='maginifying glass' />
            <S.Input ref={inputRef} value={value} onChange={(event: any) => setValue(event.target.value)} placeholder='Search user... ' />
            {
                value && <svg onClick={() => onClickCross()} width={28} height={28} style={{ opacity: 0.6, cursor: 'pointer' }} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                    <path d="m18.83 16 8.59-8.59a2 2 0 0 0-2.83-2.83L16 13.17 7.41 4.59a2 2 0 0 0-2.82 2.82L13.17 16l-8.58 8.59a2 2 0 1 0 2.83 2.83L16 18.83l8.59 8.59a2 2 0 0 0 2.83-2.83Z" data-name="Layer 57" fill="#ffffff">
                    </path></svg>
            }
        </S.Container>
    )
}

export default Search