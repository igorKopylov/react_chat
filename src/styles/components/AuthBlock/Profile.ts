import styled from "styled-components";


export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const Content = styled.div`
    width: 400px;
    height: 440px;
    background-color: #fff;
    border-radius: 20px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 50px;
    padding-top: 30px;
`;

export const Cross = styled.img`
    position: absolute;
    top: 15px;
    right: 15px;
    width: 25px;
    height: 25px;
    cursor: pointer;
`;

export const MainContent = styled.div`
    width: 350px;
    margin: 40px auto;
`;

export const AvatarWrapper = styled.div`
    position: relative;
    width: 110px;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 20px;
`;

export const Avatar = styled.div`
    width: 130px;
    height: 130px;
    border-radius: 50%;
    overflow: hidden;
    border: 2px solid #000;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

export const Camera = styled.div`
    position: absolute;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background-color: #1f97ff;
    display: flex;
    align-items: center;
    justify-content: center;
    right: -10px;
    bottom: 35px;
`;

export const AvatarBtn = styled.label`
    width: 160px;
    height: 40px;
    color: #000;
    background-color: #6aff00;
    border-radius: 8px;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: .2s;
    cursor: pointer;
    
    &:hover {
        background-color: #2de200;
    }
`;

export const SizeInput = styled.input`
    width: 100px;
    cursor: pointer;
`;


export const NameInput = styled.input`
    width: 200px;
    height: 40px;
    border-bottom: 1px solid #000;
    font-size: 28px;

    &::placeholder {
        padding-left: 3px;
    }
`;

export const SaveBtn = styled.button`
    display: block;
    width: 270px;
    height: 50px;
    border-radius: 15px;
    font-size: 23px;
    margin: 0 auto;
    margin-top: 20px;
    background-color: #ff920e;
    transition: .3s;
    cursor: pointer;

    &:hover {
        background-color: #e06f05;
    }

    &:active {
        transform: translateY(-5px);
    }
`;