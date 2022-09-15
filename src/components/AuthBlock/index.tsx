import React, { FC, useState } from 'react';
import * as S from '../../styles/components/AuthBlock/index';
import google from '../../assets/google.svg';
import closedEye from '../../assets/closedEye.svg';
import openedEye from '../../assets/openedEye.svg';
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth, db } from '../../firebase';
import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useAppDispatch } from '../../redux/store';
import { setProfile } from '../../redux/chat/slice';

type AuthBlockProps = {
    step: number;
    setStep: (step: number) => void;
    isSignUp: boolean;
    setIsSignUp: (isSignUp: boolean) => void
}

const AuthBlock: FC<AuthBlockProps> = ({ step, setStep, isSignUp, setIsSignUp }) => {
    const [email, setEmail] = useState('')
    const [pass, setPass] = useState('')
    const [isEmailActive, setIsEmailActive] = useState(false)
    const [isPassActive, setIsPassActive] = useState(false)
    const [isOpenEye, setIsOpenEye] = useState(true)
    const dispatch = useAppDispatch()
    const provider = new GoogleAuthProvider()

    const authWithGoogle = async () => {
        const data = await signInWithPopup(auth, provider)
        setStep(step + 1)
        return data
    }

    const authWithEmailAndPass = async () => {
        if (isSignUp) {
            await createUserWithEmailAndPassword(auth, email, pass)
        } else {
            const result = await signInWithEmailAndPassword(auth, email, pass)
            await updateDoc(doc(db, 'users', result.user.uid), {isOnline: true})
            const oldProfile: any = await getDoc(doc(db, 'users', result.user.uid))
            dispatch(setProfile(oldProfile.data()))
        }
        setStep(step + 1)
    }
    return (
        <div>
            <S.Container>
                <S.Content>
                    <S.GoogleBtn onClick={authWithGoogle}>
                        <img src={google} alt='google icon' width={30} height={30} />
                        Continue with Google
                    </S.GoogleBtn>
                    <span style={{ fontSize: '28px' }}>or</span>
                    <S.InputWrapper isActive={isEmailActive}>
                        <S.Placeholder isActive={isEmailActive}>Email</S.Placeholder>
                        <S.Input
                            isPassword={false}
                            onFocus={() => setIsEmailActive(true)}
                            onBlur={() => !email && setIsEmailActive(false)}
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </S.InputWrapper>
                    <S.InputWrapper isActive={isPassActive}>
                        <S.Placeholder isActive={isPassActive}>Password</S.Placeholder>
                        <S.Input
                            isPassword={true}
                            onFocus={() => setIsPassActive(true)}
                            onBlur={() => !pass && setIsPassActive(false)}
                            type={isOpenEye ? 'password' : 'text'}
                            value={pass}
                            onChange={e => setPass(e.target.value)}
                        />
                        {
                            pass && <img
                                width={35}
                                height={35}
                                style={{ marginLeft: '15px', cursor: 'pointer' }}
                                src={isOpenEye ? openedEye : closedEye}
                                onClick={() => setIsOpenEye(!isOpenEye)}
                                alt={isOpenEye ? 'closed eye' : 'opened eye'}
                            />
                        }
                    </S.InputWrapper>
                    <S.SigUpnBtn onClick={authWithEmailAndPass}>{isSignUp ? 'SIGN UP' : 'LOG IN'}</S.SigUpnBtn>
                    <S.Question>
                        {isSignUp ? 'Already have an account?' : 'Not registered?'}
                        <button onClick={() => setIsSignUp(!isSignUp)}>{isSignUp ? 'Log In' : 'Sign Up'}</button></S.Question>
                </S.Content>
            </S.Container>
        </div>
    )
}

export default AuthBlock