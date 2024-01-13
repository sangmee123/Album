import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import imageData from '../../Data/imageData';
import '../../style/Images.scss';
import Paging from './Paging';

interface titleProp {
    titleProp: string;
}

const Images: React.FC<titleProp>= ({ titleProp }) => {
    const location = useLocation(); // title 초기 값 => 앨범 펼쳐보기에 해당되는 title 값
    const [title, setTitle] = useState('');
    const [page, setPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);
    
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
                    {imageData.map((content ,id) => (
                        <div key={id} className="location-image">
                            <img src={content.src} />
                        </div>
                    ))}
                </div>
            </div>
            <Paging 
                postPerPage={postPerPage}
                totalPosts={imageData.length}
                currentPage={setPage} 
            />
        </>
    );
}

export default Images;
