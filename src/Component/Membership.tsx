import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const MembershipBox = styled.div`
    width: 430px;
    height: 460px;
    font-size: 15px;
    background-color: rgba(255, 179, 128, 0.5);
    border-radius: 5px;
    margin: 0 auto;
`;

const H1 = styled.h1`
    text-align: center;
`;

const Form = styled.form`
    margin-top: 20px;
`

const Label = styled.label`
    font-size: 14px;
    margin-left: 56px;
`;

const Input = styled.input`
    display: block;
    width: 70%;
    height: 35px;
    border: 1px solid rgba(114, 143, 157, 0.93);
    border-radius: 5px;
    padding-left: 15px;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 10px;
`;

const Register = styled.button`
    display: block;
    margin: 0 auto;
    width: 45%;
    height: 35px;
    border: none;
    border-radius: 5px;
    margin-top: 15px;
    margin-bottom: 5px;
    
    &:active {
        background-color: rgba(17, 48, 69, 0.25);
    }
`;

const Back = styled.button`
    display: block;
    margin: 0 auto;
    background-color: mintcream;
    width: 15%;
    height: 20px;
    border: none;
    border-radius: 5px;
    color: purple;
    font-weight: bold;
    font-size: 13px;
    &:active {
        background-color: rgba(17, 48, 69, 0.25);
        color: black;
    }
`;

const Membership = () => {
    const navigate = useNavigate();

    return (
        <>
            <MembershipBox>
                <H1>회원가입</H1>
                <Form action="POST_register.php" method="POST">
                    <Label id="labelId">아이디</Label>
                    <Input type="text" placeholder="아이디를 입력해주세요" />

                    <Label id="labelPw">비밀번호</Label>
                    <Input type="password" placeholder="비밀번호를 입력해주세요" />

                    <Label id="labelRePw">비밀번호 확인</Label>
                    <Input type="password" placeholder="비밀번호를 입력해주세요" />

                    <Label id="labelName">이름</Label>
                    <Input type="text" placeholder="이름을 입력해주세요" />

                    <Register>회원가입</Register>
                </Form>
                <Back type="button" onClick={() => navigate(-1)}>back</Back>
            </MembershipBox>
        </>

    );
}

export default Membership;