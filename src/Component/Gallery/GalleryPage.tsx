import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Images from './Images';
import '../../style/GallaryPage.scss';
import useTokenCheck from '../useTokenCheck';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginForm } from '../../redux/features/authSlice';
import { RootState } from '../../redux/store';
import { setForm } from '../../redux/features/userSlice';

interface List {
    title: string;
}

const GalleryPage = () => {    
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const title: string = location.state.albumTitle;

    const userId = useSelector((state: RootState) => state.auth.loginForm.id);
    const username = useSelector((state: RootState) => state.user.username);
    
    const [list, setList] = useState<List[]>([]); // 전체 title 담을 list
    const [selectedTitle, setSelectedTitle] = useState(title); // 현재 선택한 앨범 title
    const [titleProp, setTitleProp] = useState(title); // 현재 선택한 title (자식 컴포넌트에게 prop으로 전달)

    const { tokenExpired } = useTokenCheck(); // 토큰 체크 훅 사용

    useEffect(() => {
        // 토큰 체크
        if (tokenExpired) {
            const popup = alert('토큰이 만료되었습니다. 다시 로그인해주세요.');
            popup === undefined && navigate('/', { replace: true });
            dispatch(setLoginForm({ id: '', password: '' }));
            dispatch(setForm({ username: '' }));
        }
    }, [tokenExpired, navigate, dispatch]);

    useEffect(() => {        
        /* 앨범 title 리스트 불러오기 */
        const postData = new FormData();
        postData.append('id', userId);

        axios.post('http://localhost/album/src/Data/GET_db.php', postData)
        .then(res => {
            const data = res.data;
            const titleInfo: List[] = [];
            for (let i in data) {
                if (data[i].title !== '') {
                    titleInfo.push({ title: data[i].title });
                }
            }
            setList(titleInfo);
        })
        .catch(error => {
            console.log(error);
        });
    }, [userId]);

    const handleLogout = useCallback((e: React.FormEvent) => {
        // 로그아웃 시 로컬 스토리지에서 토큰 제거
        localStorage.removeItem('token');
        navigate('/', { replace: true });
        dispatch(setLoginForm({ id: '', password: '' }));
        dispatch(setForm({ username: '' }));
    }, [dispatch, navigate]);

    const onClick = useCallback((e: React.MouseEvent) => {
        // sidebar의 title 클릭 시 해당 title 값으로 변경
        const targetElement = e.target as HTMLElement;
        setTitleProp(targetElement.innerText); // 선택한 title 값 넣음
        setSelectedTitle(targetElement.innerText); // 선택한 title 값 넣음
    }, []);

    return (
        <div className='container fadeIn'>
            <div className='navibar'>
                <button 
                    className='backBtn' 
                    onClick={() => navigate('/album')}
                >⇦</button>
                <h1>추억을 로그인</h1>
                <form onSubmit={handleLogout}>
                    <button className='logoutBtn'>
                        <b>{username}</b><br/>로그아웃
                    </button>
                </form>
            </div>
            <div className='sidebar'>
                <ul>
                    {list.map((item, id) => (
                        <li 
                            key={id} 
                            onClick={onClick}
                            className={selectedTitle === item.title ? 'bgColor' : ''}
                        >
                            <img 
                                src="../images/arrow.png" 
                                alt={"arrow" + id} 
                            />
                            {item.title}
                        </li>
                    ))}
                </ul>
            </div>
            <Images titleProp={titleProp}/> 
            {/* 변경된 title 값을 Images 컴포넌트에 prop으로 넘겨주기 */}
        </div>
    );
}

export default GalleryPage;
