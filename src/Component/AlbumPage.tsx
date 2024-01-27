import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import useTokenCheck from './useTokenCheck';
import CarouselImg from './CarouselImg'; 
import '../style/Album.scss';

const Album = ()  => {
    const [darkMode, setDarkMode] = useState(false);
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const [btnLogout, setBtnLogout] = useState(true); // 로그아웃 버튼 상태
    const [userInfo, setUserInfo] = useState(''); // 사용자 이름 상태

    const navigate = useNavigate();
    const location = useLocation();
    const userId: string = location.state.id;
    
    const { tokenExpired } = useTokenCheck(); // 토큰 체크 훅 사용
    
    useEffect(() => {
        // 토큰 체크
        if (tokenExpired) {
            const popup = alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
            popup === undefined && navigate('/', { replace: true });
        }
    }, [tokenExpired, navigate]);

    useEffect(() => {
        // 로그인 정보 가져오기
        const postData = new FormData();
        postData.append('id', userId);

        axios.post('http://localhost/album/src/Data/login.php', postData)
        .then(res => {
            const data = res.data;
            if (data.success) {
                setUserInfo(data.username + '님');
                setLoading(false); // 데이터 로딩 완료 표시
            }
        })
        .catch(() => {
            setBtnLogout(false);
            setLoading(false); // 데이터 로딩 실패 표시
        });
    }, [userId]);

    const onClick = useCallback(() => setDarkMode(prev => !prev), []);
    const handleLogout = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        localStorage.removeItem('token'); // 토큰 삭제
        navigate('/', { replace: true });
    }, [navigate]);
    
    if (loading) {
        // 데이터 로딩 중일 때 표시할 내용
        return (
            <div className="loading-container">
                <div className="loading"></div>
                <div className="loading-text">loading</div>
            </div>
        )
    }

    return (
        <div className={darkMode === true ? "dark" : "light"}>
            <img
                src={darkMode === true ? "images/light.png" : "images/dark.png"}
                className="icon"
                width="40"
                onClick={onClick}
                alt="Icon"
            />
            <form onSubmit={handleLogout}>
                <button className={`exit ${btnLogout ? '' : 'hide'}`}>
                    <b>{userInfo}</b><br/>로그아웃
                </button>
            </form>
            
            <div
                className="notServer"
                style={{ display: userInfo.length === 0 ? "block" : "none" }}
            >  
                서버가 연결되어 있지 않습니다.
            </div> 
            <CarouselImg userId={userId} />
        </div>
    );
};

export default Album;
