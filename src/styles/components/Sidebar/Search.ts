import styled from "styled-components";


export const Container = styled.div`
    width: 85%;
    height: 50px;
    background-color: #0a95ff;
    border-radius: 5px;
    display: flex;
    align-items: center;
    margin-top: 10px;
`;

export const Loupe = styled.img`
    width: 29px;
    height: 29px;
    opacity: 0.6;
    margin-right: 10px;
    margin-left: 20px;
`;

export const Input = styled.input`
    width: 70%;
    height: 30px;
    background: none;
    font-size: 18px;
    color: #fff;
    margin-right: 10px;
    letter-spacing: 1.5px;

    &::placeholder {
        color: #fff;
        letter-spacing: 1.5px;
    }
`;