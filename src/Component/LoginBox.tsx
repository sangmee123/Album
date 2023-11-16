import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import Hint from './Hint';
import Album from './Album';
import '../style/LoginBox.css';

interface FormState {
    id: string;
    password: string;
}

const LoginBox = () => {
    const [ isActive, setIsActive ] = useState(false);
    const [ form, setForm ] = useState<FormState>({
        id: '',
        password: ''
    });
    const { id, password } = form;
    const navigate = useNavigate();

    useEffect(() => {
        // id와 password 값의 유무에 따른 활성화 상태 
        setIsActive(id !== '' && password !== '');
    }, [id, password]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setForm(prevForm => ({
            ...prevForm,
            [e.target.name]: e.target.value
        }));
    }, []);
    const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
        e.key === "Enter" && access();
    }, [id, password]);

    const access = useCallback(() => {
        if(id === '이상미' && password === '981223') navigate('/album')
        else if(id === '') alert('아이디를 입력해주세요.');
        else if(password === '') alert('비밀번호를 입력해주세요.');
        else alert('아이디 또는 비밀번호가 맞지 않습니다. 다시 입력해주세요.');
    }, [id, password, navigate]);


    // // 상태 및 변수를 로깅
    // console.log('id:', id);
    // console.log('password:', password);
    // console.log('isActive:', isActive);
    return (
        <>
            <section className="login-form">
                <h1>추억을 로그인</h1>
                <form 
                    onKeyDown={handleKeyDown}
                >    
                    <div className="int-area">
                        <input 
                            type="text" 
                            name="id" 
                            value={id}
                            onChange={handleInputChange}
                            id="name-input" 
                            required 
                        />
                        <label>Username</label>
                    </div>
                    <div className="int-area">
                        <input 
                            type="password" 
                            name="password" 
                            value={password}
                            onChange={handleInputChange}
                            id="password-input" 
                            required 
                        />
                        <label>Password</label>
                    </div>
                </form>    
                
                <button 
                    id="btn-login"   
                    type="submit"           
                    onClick={access}                       // 노란색 : 회색
                    style={{ backgroundColor: isActive ? "#d8db31" : "rgba(209, 206, 206, 0.733)" }} // style 동적으로 변경
                >
                    LOGIN
                </button>
                <div id="hint">
                    <Link to="/hint">Click to get a hint</Link>
                </div>
            </section>
            <Routes>
                <Route path="/album" element={<Album />}></Route>
                <Route path="/hint" element={<Hint />}></Route>
            </Routes>
        </>
    )
};

export default LoginBox;