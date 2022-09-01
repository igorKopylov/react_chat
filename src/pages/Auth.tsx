import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSelector } from 'react-redux';
import AuthBlock from '../components/AuthBlock';
import Profile from '../components/AuthBlock/Profile';
import { auth } from '../firebase';
import { chatSelector } from '../redux/chat/slice';

const Auth = () => {
    const [step, setStep] = useState(1)
    const [isSignUp, setIsSignUp] = useState(true)
    const { profile } = useSelector(chatSelector)

    return step === 2 ? <Profile /> : <AuthBlock step={step} setStep={setStep} isSignUp={isSignUp} setIsSignUp={setIsSignUp} />
}

export default Auth