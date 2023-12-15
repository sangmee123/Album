import { useState, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';
import axios from 'axios';

const CenterBox = styled.div`
    text-align: center;
    font-family: 'Sunflower', 'sans-serif';
`;

const Input = styled.input`
    background: transparent;
    width: 350px;
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
        box-shadow: 0 0 7px #d6a8e9;
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
`;

const Find = styled.button<{checked: boolean}>`
    width: 100%;
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

interface FormState {
    username: string,
    phone: string
}

const HintId = () => {
    const navigate = useNavigate();
    const [ isActive, setIsActive ] = useState(false);
    const [ form, setForm ] = useState<FormState>({
        username: '',
        phone: ''
    });
    const { username, phone } = form;
    
    useEffect(() => {
        // username와 phone 값의 유무에 따른 활성화 상태 
        setIsActive(username !== '' && phone !== '');
    }, [username, phone]);

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

    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;
        const formData = new FormData(formElement);
        
        if(isActive) {
            axios.post("http://localhost/Album/src/Data/member_find_id.php", formData)
            .then(res => {
                if(res.data.success) { 
                    const id = res.data.id;
                    navigate('/answerId', { state: { id }});
                } else {
                    alert(res.data.message);
                }
            })
            .catch(error => {
                alert('서버가 연결되어 있지 않습니다.');
                console.log(error);
            })
        }
    }, [isActive, navigate]);

    return (
        <CenterBox>           
            <h1>아이디 찾기</h1>
            <form onSubmit={handleFormSubmit}>
                <div>
                    <Input 
                        type="text"
                        name="username" 
                        onChange={handleInputChange}
                        placeholder='이름을 입력하세요.'
                        required
                    >
                    </Input>
                </div>

                <div>
                    <Input 
                        type="text"
                        name="phone"
                        maxLength={13}
                        value={form.phone}
                        onChange={handleInputChange}  
                        placeholder='휴대폰 번호를 입력하세요.'    
                        required                  
                    >
                    </Input>
                </div>
                
                <Find checked={isActive}>찾아보기</Find>
            </form>
        </CenterBox>
    )
}

export default HintId;
