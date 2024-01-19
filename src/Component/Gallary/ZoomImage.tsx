import { useLocation, useNavigate } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import '../../style/ZoomImage.scss';

interface Image {
    src: string;
}

const ZoomImage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const imageData: Image[] = location.state.totalImage;
    const index: number = location.state.id;
    // console.log(index);

    return (
        <div className="full_image">
            <button className='backBtn'onClick={() => navigate(-1)}>
                ⇦
            </button>
            <br /><span className='back'>back</span>

            <div className='carousel'> 
                <Carousel autoPlay={false}>
                    {imageData.map((content, id) => (
                        <div key={id} className='location-image'>    
                            <img src={imageData[(index + id) % imageData.length].src} />
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
}
export default ZoomImage;