import { useEffect, useState, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import Images from './Images';
import '../../style/GallaryPage.scss';

interface List {
    title: string;
}

const GallaryPage = () => {    
    const navigate = useNavigate();
    const location = useLocation();
    const userId: string = location.state.id;
    const title: string = location.state.albumTitle;
    
    const [userInfo, setUserInfo] = useState(''); // 사용자 이름 상태
    const [list, setList] = useState<List[]>([]); // 전체 title 담을 list
    const [selectedTitle, setSelectedTitle] = useState(title); // 현재 선택한 앨범 title
    const [titleProp, setTitleProp] = useState(''); // 현재 선택한 title (자식 컴포넌트에게 prop으로 전달)

    useEffect(() => {        
        // 로그인 정보 가져오기
        const postData = new FormData();
        postData.append('id', userId);

        axios.post('http://localhost/album/src/Data/login.php', postData)
        .then(res => {
            const data = res.data;
            if (data.success) {
                setUserInfo(data.username + '님');
            }
        })
        .catch(error => {
            console.log(error);
        });

        // 이미지 관련 데이터 불러오기
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
        e.preventDefault();
        navigate('/');
    }, [navigate]);

    const onClick = useCallback((e: React.MouseEvent) => {
        // sidebar의 title 클릭 시 해당 title 값으로 변경
        const targetElement = e.target as HTMLElement;
        setTitleProp(targetElement.innerText); // 선택한 title 값 넣음
        setSelectedTitle(targetElement.innerText); // 선택한 title 값 넣음
    }, []);

    return (
        <div className='container'>
            <div className='navibar'>
                <h1>추억을 로그인</h1>
                <form onSubmit={handleLogout}>
                    <button className='logoutBtn'>
                        <b>{userInfo}</b><br/>로그아웃
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

export default GallaryPage;
