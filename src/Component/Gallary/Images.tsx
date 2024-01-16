import { useCallback, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import imageData from '../../Data/imageData';
import '../../style/Images.scss';
import Paging from './Paging';

interface TitleProp {
    titleProp: string;
}

const Images: React.FC<TitleProp>= ({ titleProp }) => {
    const location = useLocation(); // title 초기 값 => 앨범 펼쳐보기에 해당되는 title 값
    const [title, setTitle] = useState('');

    const [page, setPage] = useState(1); // 현재 페이지 번호  
    const postPerPage: number = 20; // 페이지 당 이미지 개수

    const indexOfLastPost: number = page * postPerPage; 
    const indexOfFirtPost: number = indexOfLastPost - postPerPage;  
    const currentPost = imageData.slice(indexOfFirtPost, indexOfLastPost); // 갤러리에 보여줄 이미지

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
    }, [page]);

    useEffect(() => {
        setTitle(titleProp);
    }, [titleProp]);

    return (
        <>
            <p 
                className='title' 
                style={{ display: title !== '' ? "none" : "block"}}
            >
                {location.state.albumTitle}
            </p>
            <p 
                className='title'
                style={{ display: title === '' ? "none" : "block" }}
            >
                {title}
            </p>
            <div className='scroll'>
                <div className='grid-container'>
                    {currentPost.map((content ,id) => (
                        <div key={id} className="location-image">
                            <img src={content.src} />
                        </div>
                    ))}
                </div>
            </div>
            <Paging 
                page={page}
                postPerPage={postPerPage}
                totalPosts={imageData.length}
                currentPage={handlePageChange} 
            />
        </>
    );
}

export default Images;
