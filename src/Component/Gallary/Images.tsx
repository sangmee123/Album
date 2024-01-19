import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import gallaryData1 from '../../ImageData/gallaryData1';
import gallaryData2 from '../../ImageData/gallaryData2';
import gallaryData3 from '../../ImageData/gallaryData3';
import gallaryData4 from '../../ImageData/gallaryData4';
import blankData from '../../ImageData/blankData';
import '../../style/Images.scss';
import Paging from './Paging';

interface List {
    title: string;
}
interface TitleProps {
    titleProp: string;
}

interface Image {
    src: string;
}
interface GallaryDataArr {
    [title: string]: Image[];
}

const Images: React.FC<TitleProps>= ({ titleProp }) => {
    const navigate = useNavigate(); 
    const location = useLocation(); 
    const userId: string = location.state.id;

    const [title, setTitle] = useState(''); // sidebar에서 클릭한 title 값 넣기
    const [gallaryDataArr, setGallaryDataArr] = useState<GallaryDataArr>({});

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
            const array: GallaryDataArr = {
                [titleInfo[0].title]: gallaryData1,
                [titleInfo[1].title]: userId === 'oeanb' ? gallaryData2 : blankData,
                [titleInfo[2].title]: userId === 'oeanb' ? gallaryData3 : blankData,
                [titleInfo[3].title]: gallaryData4,
            };
            setGallaryDataArr(array);
        })
        .catch(error => {
            console.log(error);
        });
    }, [titleProp]);

    const [page, setPage] = useState(1); // 현재 페이지 번호  
    const postPerPage: number = 20; // 페이지 당 이미지 개수

    const indexOfLastPost: number = page * postPerPage; 
    const indexOfFirtPost: number = indexOfLastPost - postPerPage; 
   
    let currentPost: Image[] = []; // 현재 페이지에 보여줄 전체 이미지
    let totalImage: Image[] = []; // 현재 title에 해당하는 전체 이미지
    let totalImgCount: number = 0; // 현재 title에 해당하는 전체 이미지 개수
 
    if (Object.keys(gallaryDataArr).includes(titleProp)) {
        currentPost = gallaryDataArr[titleProp].slice(indexOfFirtPost, indexOfLastPost);
        totalImage = gallaryDataArr[titleProp];
        totalImgCount = gallaryDataArr[titleProp].length;
    }

    const handlePageChange = useCallback((page: number) => {
        setPage(page);
    }, [page]);

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
                    { title !== '고양이' &&  title !== '내가 먹은 음식' ?  
                        <span style={{ display: userId === 'oeanb' ? 'none' : 'inline' }}>
                            ({access})
                        </span>
                        : ''
                    }
                </p>
                <button className='upload'>사진 올리기</button>
            </div>
            <div className='scroll'>
                <div className='grid-container'>
                    {currentPost.map((content ,id) => (
                        <div key={id} className="location-image">
                                <img 
                                    src={content.src} 
                                    onClick={() => 
                                        userId !== 'oeanb' && // 타계정일 때
                                        (title !== '고양이' &&  title !== '내가 먹은 음식') ?
                                        '' : navigate('/zoom', { state: { totalImage, currentPost, id }})
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
