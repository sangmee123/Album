import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import Carousel from "react-material-ui-carousel";
import axios from 'axios';

interface ImageData {
    idx: string;
    title: string;
    urlLeft: string[];
    urlRight: string[];
    txt: string[];
}

interface CarouselImgProp {
    userId: string;
}

const CarouselImg: React.FC<CarouselImgProp> = ({ userId }) => {
    const [imageData, setImageData] = useState<ImageData[]>([]);
    const navigate = useNavigate();

    useEffect(() => {        
        const postData = new FormData();
        postData.append('id', userId);

        // // 이미지 관련 파일 DB에 저장하기
        // axios.post('http://localhost/album/src/Data/INSERT_db.php', postData)
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
                        idx: data[i].idx,
                        title: data[i].title,
                        urlLeft: JSON.parse(data[i].urlLeft),
                        urlRight: JSON.parse(data[i].urlRight),
                        txt: JSON.parse(data[i].txt)
                    })
                }
            }
            setImageData(updatedImageData);
            // setLoading(false); // 데이터 로딩이 완료됐음을 표시
        })
        .catch(error => {
            console.log(error);
            // setLoading(false); // 데이터 로딩 실패 시도 표시
        });
    }, [userId]);

    const handleButton = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
        const albumTitle = e.currentTarget.name;
        const id = userId;
        navigate(`/album/${albumTitle}`, { state: { albumTitle, id } });
    }, [navigate, userId]);
    
    return (
        <>
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
                            <button 
                                className="entrance"
                                name={content.title}
                                onClick={handleButton} 
                            >
                                펼쳐보기
                            </button>
                        </div>
                    </div>    
                ))}    
            </Carousel>
        </>
    );
};

export default CarouselImg;
