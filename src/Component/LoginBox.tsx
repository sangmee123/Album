import React, { useState, useEffect, useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import HintId from './StyledComponents/HintId';
import HintPw from './StyledComponents/HintPw';
import Membership from './StyledComponents/Membership';
import Album from './AlbumPage';
import '../style/LoginBox.scss';

interface FormState {
    id: string;
    password: string;
}

const LoginBox = () => {    
    const [isActive, setIsActive] = useState(false);
    const [form, setForm] = useState<FormState>({
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
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;  
        const formData = new FormData(formElement); 
    
        if (isActive) {
            axios.post('http://localhost/album/src/Data/login_check.php', formData)
            .then(res => {
                if (res.data.success) { 
                    // 로그인 성공 시
                    alert(res.data.message);
                    navigate('/album', { state: { id } });
                } else { 
                    // 로그인 실패
                    alert(res.data.message);
                }
            })
            .catch(error => {
                alert('서버가 연결되어 있지 않습니다.');
            });
        }
    }, [id, isActive, navigate]);

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
                    <button className={`btn-login ${isActive ? 'active' : 'inactive'}`}>
                        LOGIN
                    </button>
                </form>    
                
                <div className='link'>
                    <Link to="/id">아이디 찾기</Link>
                    <Link to="/pw">비밀번호 찾기</Link>
                    <Link to="/membership">회원가입</Link>
                </div>
            </section>
            <Routes>
                <Route path="/album" element={<Album />} />
                <Route path="/id" element={<HintId />}></Route>
                <Route path="/pw" element={<HintPw />}></Route>
                <Route path="/membership" element={<Membership />}></Route>
            </Routes>
        </div>
    )
};

export default LoginBox;