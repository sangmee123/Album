import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import galleryData1 from '../../ImageData/galleryData1';
import galleryData2 from '../../ImageData/galleryData2';
import galleryData3 from '../../ImageData/galleryData3';
import galleryData4 from '../../ImageData/galleryData4';
import blankData from '../../ImageData/blankData';
import '../../style/Images.scss';
import Paging from './Paging';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface List {
    title: string;
}
interface TitleProps {
    titleProp: string;
}

interface Image {
    src: string;
}
interface GalleryDataArr {
    [title: string]: Image[];
}

const Images: React.FC<TitleProps>= ({ titleProp }) => {
    const navigate = useNavigate();
    const location = useLocation(); 
    
    const userId = useSelector((state: RootState) => state.auth.loginForm.id);
    const [title, setTitle] = useState(''); // sidebar에서 클릭한 title 값 넣기
    const [galleryDataArr, setGalleryDataArr] = useState<GalleryDataArr>({});

    useEffect(() => {
        setTitle(titleProp); // sidebar에서 클릭한 title 변경

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
            // 갤러리 이미지 - 타계정 접근 권한 제한
            const array: GalleryDataArr = {
                [titleInfo[0].title]: galleryData1,
                [titleInfo[1].title]: userId === 'oeanb' ? galleryData2 : blankData,
                [titleInfo[2].title]: userId === 'oeanb' ? galleryData3 : blankData,
                [titleInfo[3].title]: galleryData4,
            };
            setGalleryDataArr(array);
        })
        .catch(error => {
            console.log(error);
        });
    }, [userId, titleProp]);

    const [page, setPage] = useState(1); // 현재 페이지 번호  
    const postPerPage: number = 20; // 페이지 당 이미지 개수

    const indexOfLastPost: number = page * postPerPage; 
    const indexOfFirtPost: number = indexOfLastPost - postPerPage; 
   
    let currentPost: Image[] = []; // 현재 페이지에 보여줄 전체 이미지
    let totalImage: Image[] = []; // 현재 title에 해당하는 전체 이미지
    let totalImgCount: number = 0; // 현재 title에 해당하는 전체 이미지 개수
 
    if (Object.keys(galleryDataArr).includes(titleProp)) {
        currentPost = galleryDataArr[titleProp].slice(indexOfFirtPost, indexOfLastPost);
        totalImage = galleryDataArr[titleProp];
        totalImgCount = galleryDataArr[titleProp].length;
    }

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
    }, []);
    
    const access = '타계정 접근 권한 없음';

    return (
        <>
            <div className='top_area'>
                <p 
                    className='title' 
                    style={{ display: title !== '' ? "none" : "inline"}}
                >   {/*title 초기 값 => 앨범 펼쳐보기에 해당되는 title 값*/}
                    {location.state.albumTitle}
                </p>
                <p 
                    className='title'
                    style={{ display: title === '' ? "none" : "inline" }}
                >
                    {title}
                    {title !== '고양이' &&  title !== '내가 먹은 음식' ?  
                        <span style={{ display: userId === 'oeanb' ? 'none' : 'inline' }}>
                            ({access})
                        </span>
                        : ''
                    }
                </p>
            </div>
            <div className='scroll'>
                <div className='grid-container'>
                    {currentPost.map((content ,id) => (
                        <div key={id} className="location-image">
                                <img 
                                    alt={'image' + id}
                                    src={content.src} 
                                    onClick={() => 
                                        userId !== 'oeanb' && // 타계정일 때
                                        (title !== '고양이' &&  title !== '내가 먹은 음식') ?
                                        '' : navigate('/zoom', { 
                                                state: { totalImage, currentPost, page, id, userId, albumTitle: title}, 
                                                replace: true 
                                            })
                                    }
                                />
                        </div>
                    ))}
                </div>
            </div>
            <Paging 
                page={page}
                postPerPage={postPerPage}
                totalPosts={totalImgCount}
                currentPage={handlePageChange} 
            />
        </>
    );
}

export default Images;
