import styled from "styled-components";


export const Container = styled('div') <{ isSelected: boolean }>`
    display: flex;
    align-items: center;
    height: 100px;
    transition: .1s;
    background-color: ${({ isSelected }) => isSelected ? '#36363648' : 'none'};
    cursor: pointer;
    
    &:hover {
        background-color: #36363648;
    }
`;

export const ChatAvatar = styled.div`
    position: relative;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #fff;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 20px; 
`;

export const Dot = styled.div`
    position: absolute;
    width: 17px;
    height: 17px;
    right: 1px;
    bottom: 1px;
    background-color: #10f000;
    border-radius: 50%;
`;

export const MainInfo = styled.div`
    width: 230px;
    margin-right: 40px;
    color: #fff;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    gap: 4px;
`;

export const UserName = styled.p`
    font-size: 30px;
    font-weight: 500;

`;

export const LastMessage = styled.p`
    font-size: 18px;
`;


export const UnreadMessages = styled.div`
    width: 30px;
    height: 30px;
    background-color: #fff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
`;