import { useNavigate, useLocation } from 'react-router-dom';
import styled, { css } from 'styled-components';

const CenterBox = styled.div`
    text-align: center;
`;

const Font = styled.div`
    font-size: 40px;
    font-family: 'Sunflower', 'sans-serif';
`;

const Text = styled.p<{ value?: string }>`
    font-size: 25px;
    ${props => 
      props.value === 'id' &&
      css`
        font-size: 30px;
        margin: 0;
    `}
`;

const Icon = styled.img`
    /* 아이콘  제작자: Creative Squad - Flaticon */
    width: 70px;
    margin-top: 20px;
`;

const Id = styled.span`
    color: #3366FF;
    font-weight: bold;
`;

const Back = styled.button`
    width: 110px;
    height: 40px;
    margin: 5px;
    margin-top: 10%;
    border: 1px solid gray;
    border-radius: 10px;   
    opacity: 0.85;
    &:hover {
        background-color: #d8db31;
    }
`;

const AnswerId = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userId  = location.state.id;

    return (
        <CenterBox>    
            <Font>
                <Text>요청하신 아이디 찾기 결과 입니다.</Text>
                <Icon src="/../images/icon-person.png"></Icon>
                <Text value="id">조회된 아이디는 <Id>{userId}</Id>입니다.</Text>
            </Font>       
            <div>
                <Back type="button" onClick={() => navigate('/')}>로그인 하기</Back>
                <Back type="button" onClick={() => navigate(-1)}>다시 찾기</Back>
            </div> 
        </CenterBox>
    )
}

export default AnswerId;
