import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import imageData from '../Data/imageData';
import '../style/Images.scss';

const Images = () => {
    const location = useLocation();
    const title = location.state.albumTitle;
    
    return (
        <div className='gallary'>
            <h2>{title}</h2>
            <div className="grid-container">
                {imageData.map(content => (
                    <div key={content.id} className="location-image">
                        <img 
                            src={content.src}
                            alt={'image'+content.id}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Images;
