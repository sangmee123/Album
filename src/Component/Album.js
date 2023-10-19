import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/Album.css';

const Album = () => {
	const navigate = useNavigate();
    const handleLogout = () => navigate('/')

    return(
        <>            
            <button onClick={handleLogout}>로그아웃</button>
        </>
        
    );
};

export default Album;