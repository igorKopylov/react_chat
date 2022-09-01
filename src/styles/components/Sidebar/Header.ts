import styled, { keyframes } from "styled-components";


export const Container = styled.div`
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-size: 29px;
    font-weight: 500;
`;

export const Content = styled.div`
    position: relative;
    width: 90%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const Logo = styled.div`
    width: 205px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    `;

const ShowPopup = keyframes`
    0% {
        height: 0;
    }
    100% {
        height: 110px;
    }
`;

const ShowBackground = keyframes`
    0% {
        width: 0;
        height: 0;
        margin-right: 22px;
    }
    100% {
        width: 45px;
        height: 45px;
        margin-right: 0;
    }
`;

export const ThreeDotsWrapper = styled.div`
    width: 0;
    height: 0;
    border-radius: 50%;
    background-color: #59595953;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 22px;

    &.enter-active {
        animation: ${ShowBackground} .2s forwards;
    }
`;

export const ThreeDots = styled.img`
    width: 35px;
    height: 35px;
`;

export const Popup = styled.div`
    position: absolute;
    width: 170px;
    height: 110px;
    right: 0;
    top: 50px;
    overflow: hidden;
    background-color: #fff;
    border-radius: 5px;
    display: flex;
    align-items: center;

    &.popup-show {
        animation: ${ShowPopup} .3s forwards
    }
    
    &.popup-hide {
        animation: ${ShowPopup} .3s reverse
    }
`;


export const PopupContent = styled.div`
    width: 170px;
    height: 100px;
    font-size: 23px;
    overflow: hidden;
`;

export const Profile = styled.div`
    height: 50px;
    font-size: 23px;
    color: #313131;
    display: flex;
    align-items: center;
    transition: .2s;
    cursor: pointer;

    &:hover {
        background-color: #7b7b7b50;
    }
`;

export const LogOut = styled.div`
    height: 50px;
    color: #ff1100;
    display: flex;
    align-items: center;
    transition: .2s;
    cursor: pointer;

    &:hover {
        background-color: #7b7b7b50;
    }
`;
