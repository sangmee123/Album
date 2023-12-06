import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

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
`

const Label = styled.label<{ phone?: string }>`
    font-size: 14px;
    margin-left: 60px;
    ${props => 
      props.phone === "phoneLabel" &&
      css`
        margin-left: 35px;
    `}
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
    ${props =>
     props.name === 'username' &&
     css`
       width: 70%;
       margin-left: 56px;
    `}
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

interface FormState {
    id: string,
    password: string,
    password_confirm: string,
    username: string,
    phone: string,
};
interface ActiveState {
    confirmPassword: boolean,
    register: boolean
};

const Membership = () => {
    const navigate = useNavigate();

    const [ form, setForm ] = useState<FormState>({
        id: '',
        password: '',
        password_confirm: '',
        username: '',
        phone: ''
    });
    const { id, password, password_confirm, username, phone } = form;

    // 비밀번호 불일치 문구 & 회원가입 버튼 색상 => 활성화 상태 변수
    const [ isActive, setIsActive ] = useState<ActiveState>({
        confirmPassword: true,
        register: false
    });
    const { confirmPassword, register } = isActive;
    
    useEffect(() => {
        setIsActive(prev => ({
            ...prev,
            // 같이 같으면 비밀번호 불일치 문구 숨기기
            confirmPassword: password_confirm === password, 

            // id, password, password_confirm, username, phone 값이 모두 있으면 회원가입 버튼 색상 활성화
            register: 
                id !== '' && password !== '' 
                && password_confirm !== '' && username !== '' 
                && confirmPassword === true // 비밀번호 불일치 문구까지 안 보여야 회원가입 버튼 색상 활성화
                && phone !== ''
        }));
    }, [id, password_confirm, password, username, confirmPassword, phone]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
    
        if (name === "phone") {
            // 휴대폰 번호 입력 시 자동으로 하이픈 추가
            const phoneNum = value.replace(/[^0-9]/g, '').replace(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g, '$1-$2-$3')
                                  .replace(/(\-{1,2})$/g, '');
            setForm(prev => ({ ...prev, [name]: phoneNum }));
        } else {
            setForm(prev => ({ ...prev, [name]: value }));
        }
    }, []);    


    // // 상태 및 변수를 로깅
    // console.log('id:', id);
    // console.log('password = ', password);
    // console.log('rePassword = ', password_confirm);
    // console.log('confirmPassword = ', confirmPassword);
    // console.log('register = ', register);
    // console.log('username:', username);

    return (
        <>
            <MembershipBox>
                <H1>회원가입</H1>
                <Form 
                    method="POST"
                    action="http://localhost/Album/src/Data/register.php"
                    onSubmit={(e) => register === false && e.preventDefault()}
                >
                    <Label>아이디</Label>
                    <Input 
                        type="text" 
                        name="id" 
                        onChange={handleInputChange}
                        required
                    />

                    <Label>비밀번호</Label>
                    <Input 
                        type="password" 
                        name="password" 
                        onChange={handleInputChange}
                        required
                    />

                    <Label>비밀번호 확인</Label>
                    <Input 
                        type="password" 
                        name="password_confirm" 
                        onChange={handleInputChange}
                        required
                    />

                    <Conlumn>
                        <ColumnName>
                            <Label>이름</Label>
                            <Input
                                type="text" 
                                name="username" 
                                onChange={handleInputChange}
                                required
                            />
                        </ColumnName>

                        <ColumnPhone>
                            <Label phone="phoneLabel">휴대폰 번호</Label>
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

                    <Register 
                        checked={register}
                    >
                        회원가입
                    </Register>
                    <Back type="button" onClick={() => navigate(-1)}>back</Back>
                    <Check checked={confirmPassword}>비밀번호가 일치하지 않습니다.</Check> 
                </Form>
            </MembershipBox>
        </>
    );
}

export default Membership;