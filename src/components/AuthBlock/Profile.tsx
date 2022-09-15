import React, { useState, useEffect } from 'react';
import * as S from '../../styles/components/AuthBlock/Profile';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { auth, db, storage } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import person from '../../assets/person.svg';
import { useAppDispatch } from '../../redux/store';
import camera from '../../assets/camera.svg';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
import { chatSelector, setProfile } from '../../redux/chat/slice';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { profile } = useSelector(chatSelector)
    const [name, setName] = useState('')
    const [file, setFile] = useState<any>(null)
    const [avatarUrl, setAvatarUrl] = useState('')
    const [size, setSize] = useState(160)
    const [user] = useAuthState(auth)
    const userRef = doc(db, 'users', `${user?.uid}`)

    const dispatch = useAppDispatch()

    const changeAvatar = async () => {
        if (!file) return
        const imageRef = ref(storage, `avatars/${file.name}_${user?.uid}`)
        const uploadTask = await uploadBytes(imageRef, file)
        const avatarUrl = await getDownloadURL(ref(storage, uploadTask.ref.fullPath))
        setAvatarUrl(avatarUrl)
    }
    const createProfile = async () => {
        const newUser = {
            name,
            avatar: { size, url: avatarUrl },
            isOnline: true,
            uid: user!.uid
        }
        const data = await setDoc(userRef, newUser)
        dispatch(setProfile(newUser))
        return data
    }

    useEffect(() => {
        changeAvatar()
    }, [file])

    return (
        <S.Container>
            <S.Content>
                <S.AvatarWrapper>
                    <label>
                        <S.Avatar>
                            <img src={avatarUrl || person} width={Number(size)} height={Number(size)} alt='avatar' />
                        </S.Avatar>
                        <input type='file' accept='images/*' id='file' onChange={(e: any) => setFile(e.target.files[0])} style={{ display: 'none' }} />
                        <S.Camera>
                            <img width={30} height={30} src={camera} alt='camera' />
                        </S.Camera>
                    </label>
                    <S.SizeInput type='range' value={size} min='80' max='420' height={10} onChange={e => setSize(Number(e.target.value))} />
                </S.AvatarWrapper>
                <S.NameInput type='text' value={name} maxLength={15} onChange={e => setName(e.target.value)} placeholder='Name' />
                <S.SaveBtn onClick={createProfile}>Create profile</S.SaveBtn>
            </S.Content>
        </S.Container>
    )
}

export default Profile