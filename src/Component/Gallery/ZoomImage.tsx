import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import '../../style/ZoomImage.scss';
import useTokenCheck from '../useTokenCheck';
import { setLoginForm } from '../../redux/features/authSlice';
import { useDispatch } from 'react-redux';
import { setForm } from '../../redux/features/userSlice';

interface Image {
    src: string;
}

const ZoomImage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const title: string = location.state.albumTitle;

    const imageData: Image[] = location.state.totalImage;
    const pageNumber: number = location.state.page - 1;
    const currentIndex: number = (pageNumber * 20) + location.state.id;

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

    const handleDownload = () => {
        const currentImage = imageData[currentIndex];
        const link = document.createElement('a');
        link.href = currentImage.src;
        link.download = 'image.jpg'; 
        link.click();
    };

    return (
        <div className="full_image">
            <button 
                className='backBtn' 
                onClick={() => navigate(`/album/${title}`, {state: { albumTitle: title}, replace: true })}
            >⇦</button>
            <br /><span className='back'>back</span>
            
            <img 
                alt='Download Icon'
                src="../../images/download.png" 
                className='downloadBtn'
                onClick={handleDownload} 
            />
    
            <div className='carousel'> 
                <Carousel autoPlay={false}>
                    {imageData.map((content, i) => (
                        <div key={i} className='location-image'>  
                            <img 
                                alt={'image' + i} 
                                // imageData의 배열 길이가 i로 인해 초과되지 않도록 % 연산자 사용
                                src={imageData[(currentIndex + i) % imageData.length].src} 
                            />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
export default ZoomImage;