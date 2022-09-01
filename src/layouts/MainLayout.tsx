import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from 'styled-components'

const App = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(#0099ff, #003cad);
`;

const MainLayout = () => {

    return (
        <App>
            <Outlet />
        </App>
    )
}

export default MainLayout