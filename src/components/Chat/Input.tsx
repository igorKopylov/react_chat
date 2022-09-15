import React, { useEffect, useRef, useState } from 'react';
import { addDoc, collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import { auth, db, storage } from '../../firebase';
import { chatSelector } from '../../redux/chat/slice';
import * as S from '../../styles/components/Chat/Input';
import cross from '../../assets/cross.svg';
import airplane from '../../assets/airplane.svg';
import upload from '../../assets/upload.svg';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

const Input = () => {
    const { chat, profile } = useSelector(chatSelector)
    const [user] = useAuthState(auth)
    const [text, setText] = useState('')
    const [file, setFile] = useState<any>(null)
    const [imageUrl, setImageUrl] = useState('')
    const inputRef = useRef<HTMLInputElement>(null)

    const onClickCross = () => {
        setText('')
        inputRef.current?.focus()
    }

    const sendMessage = async () => {
        if (!text) return
        setText('')
        const user1 = user!.uid
        const user2 = chat!.uid
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        const data = await addDoc(collection(db, 'messages', id, 'chat'), {
            text,
            avatar: { url: profile?.avatar.url, size: profile!.avatar.size - 80 },
            media: imageUrl ? imageUrl : null,
            createdAt: serverTimestamp(),
            unread: true,
            uid: user?.uid
        })
        await setDoc(doc(db, 'lastMessage', id), { text })
        return data
    }

    useEffect(() => {
        const onPressEnter = (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                sendMessage()
            }
        }
        document.body.addEventListener('keydown', onPressEnter)
        return () => document.body.removeEventListener('keydown', onPressEnter)
    }, [text])

    const selectFile = async () => {
        if (!file) return
        const user1 = user!.uid
        const user2 = chat!.uid
        const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`
        const imageRef = ref(storage, `avatars/${file.name}_${id}`)
        const uploadTask = await uploadBytes(imageRef, file)
        const imageUrl = await getDownloadURL(ref(storage, uploadTask.ref.fullPath))
        setImageUrl(imageUrl)
    }

    useEffect(() => {
        selectFile()
    }, [file])

    return (
        <S.Container>
            <label>
                <img style={{ cursor: 'pointer' }} width={35} height={35} src={upload} alt='upload file' />
                <input style={{ display: 'none' }} type='file' onChange={(e: any) => setFile(e.target.files[0])} />
            </label>
            <S.InputWrapper>
                <S.Input ref={inputRef} value={text} onChange={e => setText(e.target.value)} placeholder='enter message...' />
                {
                    text && (
                        <svg
                            onClick={onClickCross}
                            style={{ cursor: 'pointer' }}
                            width={25}
                            height={25}
                            viewBox="0 0 32 32"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="m18.83 16 8.59-8.59a2 2 0 0 0-2.83-2.83L16 13.17 7.41 4.59a2 2 0 0 0-2.82 2.82L13.17 16l-8.58 8.59a2 2 0 1 0 2.83 2.83L16 18.83l8.59 8.59a2 2 0 0 0 2.83-2.83Z"
                                data-name="Layer 57"
                                fill="#a8a8a8">
                            </path>
                        </svg>
                    )
                }
            </S.InputWrapper>
            <S.Button onClick={sendMessage}>
                <img width={45} height={45} src={airplane} alt='airplane' />
            </S.Button>
        </S.Container>
    )
}

export default Input