import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import axios from 'axios';
import '../style/Album.css';

interface ImageData {
    id: string;
    title: string;
    urlLeft: string[];
    urlRight: string[];
    txt: string[];
}

const Album = () => {
    const [darkMode, setDarkMode] = useState(false);
    const [imageData, setImageData] = useState<ImageData[]>([]); // 이미지 데이터 상태
    const [loading, setLoading] = useState(true); // 데이터 로딩 상태
    const navigate = useNavigate();

    const onClick = useCallback(() => setDarkMode(prev => !prev), []);
    const handleLogout = useCallback(() => navigate('/'), [navigate]);

    useEffect(() => {
        axios
            .get('http://localhost/Album/src/Data/GET_db.php')
            .then(res => {
                const data = res.data;
                const updatedImageData: ImageData[] = [];
                console.log('data = ', data);
                for (let i in data) {
                    if (data[i].title !== '') {
                        updatedImageData.push({
                            "id": data[i].id,
                            "title": data[i].title,
                            "urlLeft": JSON.parse(data[i].urlLeft),
                            "urlRight": JSON.parse(data[i].urlRight),
                            "txt": JSON.parse(data[i].txt)
                        })
                    }
                }
                setImageData(updatedImageData);
                setLoading(false); // 데이터 로딩이 완료됐음을 표시
            })
            .catch(error => {
                console.log(error);
                setLoading(false); // 데이터 로딩 실패 시도 표시
            });
    }, []);


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
            <button className='exit' onClick={handleLogout}>로그아웃</button>
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
                    <div key={content.id} className="albumBox">
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
                            <button className="entrance">펼쳐보기</button>
                        </div>
                    </div>
                ))}
            </Carousel>
        </div>
    );
};

export default Album;