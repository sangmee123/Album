import React, { useCallback } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginForm, setTokenExpired } from '../redux/features/authSlice'; 
import { RootState } from '../redux/store';
import HintId from './StyledComponents/HintId';
import HintPw from './StyledComponents/HintPw';
import Membership from './StyledComponents/Membership';
import AlbumPage from './AlbumPage';
import '../style/LoginBox.scss';

const LoginBox = () => {    
    const navigate = useNavigate();
    const dispatch = useDispatch();
    dispatch(setTokenExpired(false)); // 로그아웃일 때 토큰 만료 false
    
    const form = useSelector((state: RootState) => state.auth.loginForm);
    const { id, password } = form;
    // id와 password 값의 유무에 따른 활성화 여부
    const isActive = id !== '' && password !== ''; 

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        // authSlice에서 제네릭 타입을 설정한 이유
        dispatch(setLoginForm({ [e.target.name]: e.target.value })); 
    }, [dispatch]); 

    const handleFormSubmit = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        const formElement = e.target as HTMLFormElement;  
        const formData = new FormData(formElement); 
    
        if (isActive) {
            axios.post('http://localhost/album/src/Data/login_check.php', formData)
            .then(res => {
                if (res.data.success) { 
                    // 로그인 성공 시 토큰을 로컬 스토리지에 저장
                    localStorage.setItem('token', res.data.token);
                    
                    // 로그인 성공 알림을 띄우고, 앨범 페이지로 이동
                    alert(res.data.message);
                    navigate('/album', { state: { userId: id }}); 
                } else { 
                    // 로그인 실패
                    alert(res.data.message);
                }
            })
            .catch(error => {
                alert('서버가 연결되어 있지 않습니다.');
            });
        }
    }, [isActive, navigate, id]);

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
                            value={form.id}
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
                            value={form.password}
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
                <Route path="/album" element={<AlbumPage />} />
                <Route path="/id" element={<HintId />}></Route>
                <Route path="/pw" element={<HintPw />}></Route>
                <Route path="/membership" element={<Membership />}></Route>
            </Routes>
        </div>
    )
};

export default LoginBox;
