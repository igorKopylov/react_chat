import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: 500px;
    height: 480px;
    border-radius: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    flex-direction: column;

    span {
        margin-top: 30px;
        font-size: 20px;
    }
`;

export const GoogleBtn = styled.button`
    display: flex;
    align-items: center;
    text-align: center;
    width: 420px;
    height: 60px;
    border-radius: 10px;
    margin-top: 30px;
    font-size: 22px;
    background-color: #fff;
    border: 2px solid #8c8c8c;
    transition: .2s;
    cursor: pointer;

    &:hover {
        box-shadow: 0 3px 7px #8c8c8c;
        border: 2px solid transparent;
    }

    &:active {
        transform: translateY(-5px);
    }

    img {
        margin: 0 40px;
    }
`;

export const InputWrapper = styled('label') <{ isActive: boolean }>`
    position: relative;
    width: 390px;
    height: 50px;
    border: 2px solid ${({ isActive }) => isActive ? '#2f5cff' : '#525252'};
    border-radius: 10px;
    margin-top: 30px;
    display: flex;
    align-items: center;
    transition: .2s;
`;

export const Placeholder = styled('p') <{ isActive: boolean }>`
    position: absolute;
    bottom: ${({ isActive }) => isActive ? '40px' : '10px'};
    left: ${({ isActive }) => isActive ? '10px' : '12px'};
    font-size: ${({ isActive }) => isActive ? '17px' : '22px'};
    color: ${({ isActive }) => isActive ? '#2f5cff' : '#434343'};
    background-color: ${({ isActive }) => isActive && '#fff'};
    padding: 0 8px;
    transition: .4s;
    cursor: text;
`;


export const Input = styled('input') <{ isPassword: boolean }>`
    width: ${({ isPassword }) => isPassword ? '300px' : '360px'};
    margin-left: 20px;
    font-size: 22px;
    
    &::-ms-reveal {
        display: none
    }
`;

export const SigUpnBtn = styled.button`
    position: relative;
    width: 200px;
    height: 50px;
    border-radius: 20px;
    background: linear-gradient(to right, #ffa641, #ff1100);
    color: #fff;
    font-weight: 600;
    letter-spacing: 2px;
    font-size: 17px;
    margin-top: 25px;
    z-index: 1;
    transition: .2s;
    cursor: pointer;

    &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: linear-gradient(to right, #ffc414, #fd3b3b);
        z-index: -1;
        opacity: 0;
        border-radius: 20px;
        transition: .3s;
        cursor: pointer;
    }

    &:hover {
        &::before {
            opacity: 1;
        }
    }

    &:active {
        transform: translateY(-5px);
    }
`;

export const Question = styled.p` 
    font-size: 23px;
    margin-top: 30px;

    button {
        font-size: 23px;
        background: none;
        margin-left: 10px;
        color: #0041a3;
        font-weight: 500;
        transition: .2s;
        cursor: pointer;

        &:hover {
            color: #0063f8;
        }
    }
`;
