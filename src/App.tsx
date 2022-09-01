import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout'
import AuthMethod from './pages/Auth';
import Home from './pages/Home';
import NotFound from './pages/NotFound';
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from './firebase';
import { useSelector } from 'react-redux';
import { chatSelector } from './redux/chat/slice';

function App() {
  const { profile } = useSelector(chatSelector)

  return (
    <Routes>
      <Route path='/' element={<MainLayout />} >
        <Route index element={profile ? <Home /> : <Navigate to='auth' />} />
        <Route path='/auth' element={profile ? <Navigate to='/' /> : <AuthMethod />} />
        <Route path='*' element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
