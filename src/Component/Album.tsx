import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import axios from 'axios';
import '../style/Album.scss';

interface ImageData {
    idx: string;
    title: string;
    urlLeft: string[];
    urlRight: string[];
    txt: string[];
}

const Album = ()  => {
    const [ darkMode, setDarkMode ] = useState(false);
    const [ loading, setLoading ] = useState(true); // 데이터 로딩 상태
    const [ btnLogout, setBtnLogout ] = useState(true); // 로그아웃 버튼 상태
    const [ userInfo, setUserInfo ] = useState(''); // 사용자 이름 상태 
    const [ imageData, setImageData ] = useState<ImageData[]>([]); // 이미지 데이터 상태

    const navigate = useNavigate();
    const location = useLocation();
    const userId:string = location.state.id;

    useEffect(() => {
        // 로그인 정보 가져오기
        const postData = new FormData();
        postData.append('id', userId);

        axios.post('http://localhost/album/src/Data/login.php', postData)
        .then(res => {
            const data = res.data;
            if(data.success) {
                setUserInfo(data.username + '님');
            } 
        })
        .catch(error => {
            setBtnLogout(false);
        });

        // // 이미지 관련 파일 DB에 저장하기
        // axios.get('../Data/INSERT_db.php')
        // .then(response => {
        //     // 성공적인 응답을 처리하는 로직
        //     console.log(response.data);
        // })
        // .catch(error => {
        //     // 오류 발생 시 처리하는 로직
        //     console.error('Error:', error);
        // });
        
        // 이미지 관련 데이터 불러오기
        axios.post('http://localhost/album/src/Data/GET_db.php', postData)
        .then(res => {
            const data = res.data;
            const updatedImageData: ImageData[] = [];
            for(let i in data) {
                if(data[i].title !== '') {
                    updatedImageData.push({
                        "idx": data[i].idx,
                        "title": data[i].title,
                        "urlLeft": JSON.parse(data[i].urlLeft),
                        "urlRight": JSON.parse(data[i].urlRight),
                        "txt": JSON.parse(data[i].txt)
                    })
                }
            }
            // console.log('updateImgData = ', updatedImageData);
            setImageData(updatedImageData);
            setLoading(false); // 데이터 로딩이 완료됐음을 표시
        })
        .catch(error => {
            console.log(error);
            setLoading(false); // 데이터 로딩 실패 시도 표시
        });
    }, []);

    const onClick = useCallback(() => setDarkMode(prev => !prev), []);
    const handleLogout = useCallback((e: React.FormEvent) => {
        e.preventDefault();
        navigate('/');
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
            <form 
                // method="POST" 
                // action="http://localhost/album/src/Data/logout.php"
                onSubmit={handleLogout}
            >
                <button className={`exit ${btnLogout ? '': 'hide'}`}>
                    <b>{userInfo}</b><br/>로그아웃
                </button>
            </form>

            <div 
                className="notServer"
                style={{ display: imageData.length === 0 ? "block" : "none" }}
            >  
                서버가 연결되어 있지 않습니다.
            </div>
            
            <Carousel 
                className="crsl"
                autoPlay={false}  
            >

                {imageData.map(content  => (
                    <div key={content.idx} className="albumBox">
                        <div className="leftBox">   
                            <h3>{content.title} 앨범집</h3>
                            {content.urlLeft.map((url, urlIndex) => (
                                <img key={urlIndex} src={url} width={165} alt="이미지" />
                            ))}
                            {content.txt.map((txt, txtIndex) => (
                                <span className="contents" key={txtIndex}>{txt}</span>
                            ))}
                        </div>

                        <div className="rightBox">
                            <h3>추억을 열어 보세요.</h3>
                            {content.urlRight.map((url, urlIndex) => (
                                <img key={urlIndex} src={url} width={165} alt="이미지" />
                            ))}
                            <button type="button" className="entrance">펼쳐보기</button>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Album;
