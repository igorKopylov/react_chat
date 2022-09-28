import React, { useEffect, useState } from 'react';
import * as S from '../styles/components/Modal';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { auth, db, storage } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import cross from '../assets/cross.svg';
import person from '../assets/person.svg';
import { useAppDispatch } from '../redux/store';
import { chatSelector, setProfile } from '../redux/chat/slice';
import { setIsModal } from '../redux/sidebar/slice'
import camera from '../assets/camera.svg';
import { useSelector } from 'react-redux';
import { doc, updateDoc } from 'firebase/firestore';

const Modal = () => {
    const { profile } = useSelector(chatSelector)
    const [name, setName] = useState(profile!.name)
    const [file, setFile] = useState<any>()
    const [avatarUrl, setAvatarUrl] = useState(profile ? profile.avatar.url : '')
    const [size, setSize] = useState(profile!.avatar.size)
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()

    const changeAvatar = async () => {
        if (!file) return
        const imageRef = ref(storage, `avatars/${file.name}_${user?.uid}`)
        const uploadTask = await uploadBytes(imageRef, file)
        const url = await getDownloadURL(ref(storage, uploadTask.ref.fullPath))
        setAvatarUrl(url)
    }

    const onClickSave = async () => {
        await updateDoc(doc(db, 'users', user!.uid), { name, avatar: { url: avatarUrl, size, } })
        dispatch(setProfile({
            name,
            avatar: { size, url: avatarUrl },
            isOnline: true,
            uid: user!.uid
        }))
        dispatch(setIsModal(false))
    }

    useEffect(() => {
        changeAvatar()
    }, [file])


    return (
        <S.Container>
            <S.Content>
                <S.Cross onClick={() => dispatch(setIsModal(false))} src={cross} alt='cross' />
                <S.AvatarWrapper>
                    <label>
                        <S.Avatar>
                            <img src={avatarUrl || person} width={size} height={size} alt='avatar' />
                        </S.Avatar>
                        <input type='file' accept='images/*' id='file' onChange={(e: any) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                        <S.Camera>
                            <img width={30} height={30} src={camera} alt='camera' />
                        </S.Camera>
                    </label>
                    <S.SizeInput type='range' value={size} min='80' max='420' height={10} onChange={e => setSize(Number(e.target.value))} />
                </S.AvatarWrapper>
                <S.NameInput type='text' value={name} maxLength={15} onChange={e => setName(e.target.value)} placeholder='Name' />
                <S.SaveBtn onClick={onClickSave}>Save</S.SaveBtn>
            </S.Content>
        </S.Container>
    )
}

export default Modal
