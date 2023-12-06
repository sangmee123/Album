import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Hint from './Hint';
import Membership from './Membership';
import Album from './Album';
import '../style/LoginBox.scss';

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

    // // 상태 및 변수를 로깅
    // console.log('id:', id);
    // console.log('password:', password);
    // console.log('isActive:', isActive);
    return (
        <div className="LoginBox">
            <section className="login-form">
                <h1>추억을 로그인</h1>
                <form 
                    method="POST"
                    action={'http://localhost/Album/src/Data/login.php'}
                    onSubmit={(e) => isActive === false && e.preventDefault()}
                    // onKeyDown={handleKeyDown}
                >    
                    <div className="int-area">
                        <input 
                            type="text" 
                            name="id" 
                            onChange={handleInputChange}
                            // onKeyDown={handleFormSubmit}
                            required 
                        />
                        <label>ID</label>
                    </div>
                    <div className="int-area">
                        <input 
                            type="password" 
                            name="password" 
                            onChange={handleInputChange}
                            // onKeyDown={handleFormSubmit}
                            required 
                        />
                        <label>Password</label>
                    </div>
                    <button 
                        className={`btn-login ${isActive ? 'active' : 'inactive'}`}
                        // onKeyDown={handleFormSubmit}
                        // onClick={handleFormClick}
                        // onClick={access}                
                    >
                        LOGIN
                    </button>
                </form>    
                
                <div className='link'>
                    <Link to="/hint">아이디 찾기</Link>
                    <Link to="/hint">비밀번호 찾기</Link>
                    <Link to="/membership">회원가입</Link>
                </div>
            </section>
            <Routes>
                <Route path="/album" element={<Album />}></Route>
                <Route path="/membership" element={<Membership />}></Route>
                <Route path="/hint" element={<Hint />}></Route>
            </Routes>
        </div>
    )
};

export default LoginBox;