import { useState, useCallback, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const CenterBox = styled.div`    
    background-color: rgba(255, 179, 128, 0.8);
    width: 450px;
    height: 400px;
    text-align: center;
`;

const Font = styled.div`
    font-family: 'Sunflower', 'sans-serif';
    margin-bottom: 20px;
`;

const Icon = styled.img`
    /* 아이콘  제작자: Creative Squad - Flaticon */
    width: 70px;
    margin-top: 5px;
`;

const Input = styled.input<{ checked?: boolean }>`
    width: 320px;
    height: 30px;
    font-size: 15px;
    border: 1px solid gray;
    border-bottom: 1.5px solid rgb(84, 84, 82);
    border-radius: 5px;
    padding: 8px 8px 5px 20px;
    margin-bottom: 15px;
    &:focus {
        outline: none;
        border: 1px solid orange;
        box-shadow: 0 0 4px orange;
    }
    &::placeholder {
        color: #585858;
    }
    &:-webkit-autofill,
    &:-webkit-autofill:hover,
    &:-webkit-autofill:focus,
    &:-webkit-autofill:active {
        transition: background-color 5000s;
    }
    ${props => 
      props.checked === true &&
      css`
        display: none;
    `};
`;

const ChangeBtn = styled.button<{checked: boolean}>`   
    width: 350px;
    height: 50px;
    background: rgba(209, 206, 206, 0.733);
    color: #fff;
    font-weight: bold;
    font-size: 15px;
    border: none;
    border-radius: 5px;
    ${props => 
      props.checked === true &&
      css`
        background-color: #FF9966;
        &:active { 
            background-color: #d78055; 
        }
    `};
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
    password: string,
    password_confirm: string,
};
interface ActiveState {
    confirmPassword: boolean,
    changePassword: boolean
};

const AnswerPw = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId  = location.state.userId;

    const [ form, setForm ] = useState<FormState>({
        password: '',
        password_confirm: '',
    });
    const { password, password_confirm } = form;

    const [ isActive, setIsActive ] = useState<ActiveState>({
        confirmPassword: true, // 기본 설정값 (비밀번호 일치) 
        changePassword: false // 기본 버튼 비활성화 색상 설정 
    });
    const { confirmPassword, changePassword } = isActive;

    useEffect(() => {
        setIsActive(prev => ({
            ...prev,
            // 같이 같으면 비밀번호 불일치 문구 숨기기
            confirmPassword: password === password_confirm, 

            // password, password_confirm 값이 모두 있으면 버튼 색상 활성화
            changePassword: 
                password !== '' && password_confirm !== ''
                && confirmPassword === true // 비밀번호 불일치 문구가 안 보여야 버튼 색상 활성화

        }));
    }, [password, password_confirm, , confirmPassword]); 

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    }, []); 

    const handleFormSubmit = useCallback((e:React.FormEvent) => {
        console.log("폼 제출됨");
        if(changePassword === false) {
            e.preventDefault();
        } 
    }, [changePassword]);

    return (
        <CenterBox>    
            <Font>
                <h1>비밀번호 재설정</h1>
                <div>
                    <Icon src="/../images/icon-person.png"></Icon>
                    <br /><span>{userId}</span>
                </div>
            </Font>   
            <form
                method="POST"
                action="http://localhost/album/src/Data/change_password.php"
                onSubmit={handleFormSubmit}
            >
                <Input 
                    type="text" 
                    name="id" 
                    value={userId} 
                    checked={true}
                    readOnly >
                </Input>
                <Input
                    type="password"
                    name="password"
                    onChange={handleInputChange}
                    placeholder='새 비밀번호'
                    required
                >
                </Input>
                
                <Input
                    type="password"
                    name="password_confirm"
                    onChange={handleInputChange}
                    placeholder='새 비밀번호 확인'
                    required
                >
                </Input>
                
                <div>
                    <ChangeBtn checked={changePassword} type="submit">변경하기</ChangeBtn>
                    <Check checked={confirmPassword}>비밀번호가 일치하지 않습니다.</Check> 
                </div> 
            </form>    
        </CenterBox>
    )
}

export default AnswerPw;
