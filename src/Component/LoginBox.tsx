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


    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        const formData = new FormData();
        formData.append('id', form.id); 
        formData.append('password', form.password); 

        e.preventDefault();
        if (isActive) {
            axios.post('http://localhost/Album/src/Data/login_check.php', formData)
            .then(res => {
                if (res.data.success) { 
                    // 로그인 성공 시
                    alert(res.data.message);
                    navigate('/album');
                } else { 
                    // 로그인 실패
                    alert(res.data.message);
                }
            })
            .catch(error => {
                alert("서버가 연결되어 있지 않습니다.");
            });
        }
    }, [isActive, form, navigate]);

    // // 상태 및 변수를 로깅
    // console.log('id:', id);
    // console.log('password:', password);
    // console.log('isActive:', isActive);
    return (
        <div className="LoginBox">
            <section className="login-form">
                <h1>추억을 로그인</h1>
                <form onSubmit={handleFormSubmit}>    
                    <div className="int-area">
                        <input 
                            type="text"
                            id="id" 
                            name="id" 
                            onChange={handleInputChange}
                            required 
                        />
                        <label htmlFor="id">ID</label>
                    </div>
                    <div className="int-area">
                        <input 
                            type="password" 
                            id="password"
                            name="password" 
                            onChange={handleInputChange}
                            required 
                        />
                        <label htmlFor="password">Password</label>
                    </div>
                    <button 
                        className={`btn-login ${isActive ? 'active' : 'inactive'}`}
                        disabled={!isActive}
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
                <Route path="/album" element={<Album />} />
                <Route path="/membership" element={<Membership />}></Route>
                <Route path="/hint" element={<Hint />}></Route>
            </Routes>
        </div>
    )
};

export default LoginBox;