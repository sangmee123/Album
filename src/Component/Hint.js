import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../style/Hint.css';

const Hint = () => {
    const [visibleId, setVisibleId] = useState(false);
    const [visiblePw, setVisiblePw] = useState(false);
    const navigate = useNavigate();

    return (
        <div className="center">            
            <span 
                className="clickID" 
                onClick={() => setVisibleId(!visibleId)}
            >
                당신의 ID는?
            </span>
            {visibleId && <li>귀하의 <b>성함</b>을 입력하시면 됩니다.</li>}
            
            <span 
                className="clickPASSWORD" 
                onClick={() => setVisiblePw(!visiblePw)}
            >
                당신의 PASSWORD는?
            </span>
            {visiblePw && <li>귀하의 <b>생년월일</b>을 입력하세요.</li>}
            
            <div>
                <button onClick={() => navigate(-1)}>로그인 하기</button>
            </div>
        </div>
    )
}

export default Hint;