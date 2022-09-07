import styled from "styled-components";

type Coords = {
    x: number,
    y: number
}

export const Container = styled('div') <{ isOwnMessage: boolean }>`
    position: relative;
    width: 360px;
    margin-left:  ${({ isOwnMessage }) => isOwnMessage ? '45vw' : '25px'};

    &:not(:first-child) {
        margin-top: 70px;
    }

    &:first-child {
        margin-top: 40px;
    }
`;

export const Popup = styled('div') <{ coords: Coords | null }>`
    position: absolute;
    width: 50px;
    height: 50px;
    background-color: #fff;
    left: ${({ coords }) => `${coords?.x}px`};
    bottom: ${({ coords }) => `${coords?.y}px`};
    z-index: 100;
`;

export const Message = styled('div') <{ isOwnMessage: boolean }>`
    width: 300px;
    word-wrap: break-word;
    background-color: ${({ isOwnMessage }) => isOwnMessage ? '#0066ff' : '#ccc'};
    border-radius: ${({ isOwnMessage }) => isOwnMessage ? '7px 7px 0 7px' : '7px 7px 7px 0'};
    color: ${({ isOwnMessage }) => isOwnMessage ? '#fff' : '#000'};
    margin-left: ${({ isOwnMessage }) => isOwnMessage ? '0' : '60px'};
    padding: 10px;
    font-size: 24px;
`;

export const Avatar = styled('div') <{ isOwnMessage: boolean }>`
    position: absolute;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
    width: 45px;
    height: 45px;
    border-radius: 50%;
    overflow: hidden;
    bottom: -34px;
    right: ${({ isOwnMessage }) => isOwnMessage ? '0' : 'none'};
    margin-left: 3px;
`;

export const Time = styled('div') <{ isOwnMessage: boolean }>`
    position: absolute;
    bottom: -55px;
    right: ${({ isOwnMessage }) => isOwnMessage ? '0' : 'none'};
    font-size: 14px;
`;

export const Delete = styled.p`
    position: absolute;
    top: 10px;
    right: 0;
`;