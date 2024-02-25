import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setForm } from '../../redux/features/userSlice';

const MembershipBox = styled.div`
    width: 450px;
    height: 460px;
    font-size: 15px;
    background-color: rgba(255, 179, 128, 0.8);
    border-radius: 5px;
    margin: 0 auto;
`;

const H1 = styled.h1`
    text-align: center;
`;

const Form = styled.form`
    margin-top: 20px;
`;

const Label = styled.label<{ id?: string }>`
    font-size: 14px;
    margin-left: 60px;
    ${props => 
      props.id === "phoneLabel" &&
      css`
        margin-left: 35px;
    `}
`;

const Input = styled.input`
    display: block;
    width: 70%;
    height: 35px;
    background: #F5F5F5;
    border: 1px solid rgba(114, 143, 157, 0.93);
    border-radius: 5px;
    padding-left: 15px;
    margin: 0 auto;
    margin-top: 5px;
    margin-bottom: 10px;
    ${props =>
     props.name === 'username' &&
     css`
       width: 70%;
       margin-left: 56px;
    `}
    &:focus {
        outline: none;
        border: 1px solid orange;
        box-shadow: 0 0 4px orange;
    }
`;

const Conlumn = styled.div`
    display: inline-block;
    width: 100%;
    height: 70px;
    margin: 0 auto;
`;
const ColumnName = styled.div`    
    display: inline-block;
    width: 38%;
`;
const ColumnPhone = styled.div`    
    display: inline-block;
    width: 55%;
    margin-left: 2px;
`;

const Register = styled.button<{ checked: boolean }>`
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
    ${props => 
      props.checked === true &&
      css`
        background-color: #d8db31; 
    `}
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

const Check = styled.div<{ checked: boolean }>`
    display: none;
    ${props => 
      props.checked === false &&
      css`
        display: block;
        color: #be0000;
        font-weight: bold;
        text-align: center;
        margin-top: 8px;
    `};
`;

interface ActiveState {
    confirmPassword: boolean,
    registerBtn: boolean
};

const Membership = () => {
    const navigate = useNavigate(); 
    const dispatch = useDispatch();

    const form = useSelector((state: RootState) => state.user);
    const { id, password, password_confirm, username, phone } = form;

    const [ isActive, setIsActive ] = useState<ActiveState>({
        confirmPassword: true, // 비밀번호 일치 기본 설정값
        registerBtn: false // 회원가입 버튼 색상 기본 설정값
    });
    const { confirmPassword, registerBtn } = isActive;
    
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === "phone") {
            // 휴대폰 번호 입력 시 자동으로 하이픈 추가
            const phoneNum = value
                .replace(/[^0-9]/g, '')
                .replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                .replace(/(\-{1,2})$/g, '');
            dispatch(setForm({ [name]: phoneNum })); // userSlice에서 제네릭 타입을 설정한 이유
        } else {
            dispatch(setForm({ [name]: value }));
        }
    }, [dispatch]);   

    useEffect(() => {
        setIsActive(prev => ({
            ...prev,      // 같이 같으면 비밀번호 불일치 문구 숨기기
            confirmPassword: password === password_confirm, 

            // id, password, password_confirm, username, phone 값이 모두 있으면 회원가입 버튼 색상 활성화
            registerBtn: 
                id !== '' && password !== '' 
                && password_confirm !== '' && username !== '' 
                && confirmPassword === true // 비밀번호 불일치 문구까지 안 보여야 회원가입 버튼 색상 활성화
                && phone !== ''
        }));
    }, [dispatch, id, password, password_confirm, username, phone, confirmPassword]); 

    // // 상태 및 변수를 로깅
    // console.log('id:', id);
    // console.log('password = ', password);
    // console.log('rePassword = ', password_confirm);
    // console.log('username:', username);
    // console.log('phone:', phone);
    // console.log('confirmPassword = ', confirmPassword);
    // console.log('registerBtn = ', registerBtn);

    return (
        <>
            <MembershipBox>
                <H1>회원가입</H1>
                <Form 
                    method="POST"
                    action="../../Data/register.php"
                    onSubmit={(e) => registerBtn === false && e.preventDefault()}
                >
                    <Label>아이디</Label>
                    <Input 
                        type="text" 
                        name="id" 
                        value={form.id}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>비밀번호</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        value={form.password}
                        onChange={handleInputChange}
                        required
                    />

                    <Label>비밀번호 확인</Label>
                    <Input 
                        type="password" 
                        name="password_confirm" 
                        value={form.password_confirm}
                        onChange={handleInputChange}
                        required
                    />

                    <Conlumn>
                        <ColumnName>
                            <Label>이름</Label>
                            <Input
                                type="text" 
                                name="username" 
                                value={form.username}
                                onChange={handleInputChange}
                                required
                            />
                        </ColumnName>

                        <ColumnPhone>
                            <Label id="phoneLabel">휴대폰 번호</Label>
                            <Input
                                type="text" 
                                name="phone" 
                                maxLength={13}
                                value={form.phone}
                                onChange={handleInputChange}
                                required
                            />
                        </ColumnPhone>
                    </Conlumn>

                    <Register checked={registerBtn}>회원가입</Register>
                    <Back type="button" onClick={() => navigate('/')}>back</Back>
                    <Check checked={confirmPassword}>비밀번호가 일치하지 않습니다.</Check> 
                </Form>
            </MembershipBox>
        </>
    );
}

export default Membership;