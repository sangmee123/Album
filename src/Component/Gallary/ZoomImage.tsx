import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import '../../style/ZoomImage.scss';

interface Image {
    src: string;
}

const ZoomImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const imageData: Image[] = location.state.totalImage;
    const pageNumber: number = location.state.page - 1;
    const currentIndex: number = (pageNumber * 20) + location.state.id;

    return (
        <div className="full_image">
            <button className='backBtn'onClick={() => navigate(-1)}>
                ⇦
            </button>
            <br /><span className='back'>back</span>

            <div className='carousel'> 
                <Carousel autoPlay={false}>
                    {imageData.map((content, i) => (
                        <div key={i} className='location-image'>  
                            {/* imageData의 배열 길이가 i로 인해 초과되지 않도록 % 연산자 사용 */}
                            <img src={imageData[(currentIndex + i) % imageData.length].src} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
export default ZoomImage;