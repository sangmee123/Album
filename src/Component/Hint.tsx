import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { css } from 'styled-components';

const CenterBox = styled.div`
    text-align: center;
`;

const Font = styled.span<{ value?: string }>`
    font-size: 60px;
    font-family: 'Sunflower', 'sans-serif';
    &:hover {
        color:rgb(123, 168, 40);
    }

    ${props => 
      props.value === 'pw' &&
      css`
        display: block;
        margin-top: 30px;  
    `};
`;

const Li = styled.li`
    color: black;
    font-weight: lighter;
    font-size: 30px;
    list-style: none;
    margin-top: 20px;
    margin-bottom: 30px;    
`;

const Back = styled.button`
    width: 18%;
    height: 35px;
    margin-top: 10%;
    border: 1px solid gray;
    border-radius: 15px;   
    opacity: 0.85;
    &:hover {
        background-color: #d8db31;
    }
`;

const Hint = () => {
    const [visibleId, setVisibleId] = useState(false);
    const [visiblePw, setVisiblePw] = useState(false);
    const navigate = useNavigate();

    return (
        <CenterBox>            
            <Font onClick={() => setVisibleId(!visibleId)}>
                당신의 ID는?
            </Font>
            {visibleId && <Li>귀하의 <b>성함</b>을 입력하시면 됩니다.</Li>}
            
            <Font 
                value="pw" 
                onClick={() => setVisiblePw(!visiblePw)}
            >
                당신의 PASSWORD는?
            </Font>
            {visiblePw && <Li>귀하의 <b>생년월일</b>을 입력하세요.</Li>}
            
            <div>
                <Back type="button" onClick={() => navigate(-1)}>로그인 하기</Back>
            </div>
        </CenterBox>
    )
}

export default Hint;
