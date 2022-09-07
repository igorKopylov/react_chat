import styled from "styled-components";


export const Container = styled.div`
    width: 38vw;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const InputWrapper = styled.div`
    width: 30vw;
    height: 50px;
    border: 1px solid #4d4d4d;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
`;

export const Input = styled.input`
    font-size: 20px;
    width: 80%;
    margin: 0 20px;
`;

export const Airplane = styled.div`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    background-color: #0672ff;
    box-shadow: none;
`;

export const Button = styled.button`
    border-radius: 50%;
    width: 45px;
    height: 45px;
    transition: .2s;
    cursor: pointer;

    &:hover {
        transform: translateY(-4px);
        box-shadow: 0 3px 5px  #8e8e8e;
    }
`;