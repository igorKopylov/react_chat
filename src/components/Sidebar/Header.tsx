import React, { useEffect, useState } from 'react';
import * as S from '../../styles/components/Sidebar/Header';
import icon from '../../assets/icon.svg';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../firebase';
import threeDots from '../../assets/threeDots.svg';
import profile from '../../assets/profile.svg';
import logOutImage from '../../assets/logOut.svg';
import { CSSTransition } from 'react-transition-group';
import { useAppDispatch } from '../../redux/store';
import { chatSelector, setChat, setProfile } from '../../redux/chat/slice';
import { setIsModal } from '../../redux/sidebar/slice';
import { doc, updateDoc } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';

const Header = () => {
    const [isPopup, setIsPopup] = useState(false)
    const [user] = useAuthState(auth)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const onClickBody = () => {
            setIsPopup(false)
        }

        document.body.addEventListener('click', onClickBody)
        return () => document.body.removeEventListener('click', () => setIsPopup(false))
    }, [])

    const onClickThreeDots = (event: React.MouseEvent<HTMLImageElement>) => {
        event?.stopPropagation()
        setIsPopup(!isPopup)
    }

    const logOut = async() => {
        await updateDoc(doc(db, 'users', user!.uid), {isOnline: false})
        signOut(auth)
        dispatch(setProfile(null))
        dispatch(setChat(null))
    }

    return (
        <S.Container>
            <S.Content>
                <S.Logo>
                    <img width={52} height={52} src={icon} alt='messanger icon' />
                    Messenger
                </S.Logo>
                <CSSTransition
                    in={isPopup}
                    timeout={0}
                    classNames={{
                        enterDone: 'enter-active'
                    }}
                >
                    <S.ThreeDotsWrapper>
                        <S.ThreeDots
                            onClick={(event) => onClickThreeDots(event)}
                            src={threeDots}
                            style={{ cursor: 'pointer' }}
                            alt='three dots'
                        />
                    </S.ThreeDotsWrapper>
                </CSSTransition>
                <CSSTransition
                    timeout={280}
                    in={isPopup}
                    classNames={{
                        enterActive: 'popup-show',
                        exitActive: 'popup-hide'
                    }}
                    mountOnEnter
                    unmountOnExit
                >
                    <S.Popup>
                        <S.PopupContent>
                            <S.Profile onClick={() => dispatch(setIsModal(true))}>
                                <img width={32} height={32} src={profile} style={{ margin: '0 10px' }} alt='man icon' />
                                Profile
                            </S.Profile>
                            <S.LogOut onClick={logOut}>
                                <img width={34} height={34} src={logOutImage} style={{ margin: '0 10px' }} alt='log out' />
                                Log Out
                            </S.LogOut>
                        </S.PopupContent>
                    </S.Popup>
                </CSSTransition>
            </S.Content>
        </S.Container>
    )
}

export default Header