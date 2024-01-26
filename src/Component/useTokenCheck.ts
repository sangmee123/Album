import { useEffect, useState } from "react";

export default function useTokenCheck() {
    const [tokenExpired, setTokenExpired] = useState(false);
    const handleTokenExpired = () => {
        setTokenExpired(true);
        localStorage.removeItem('token'); // 토큰 삭제
    };

    useEffect(() => {
        const tokenCheck = setInterval(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                // 로컬 스토리지에서 토큰이 없는 경우
                handleTokenExpired();
                return; // 토큰 없으면 종료
            } else {
                try {
                    const { jwtDecode } = require('jwt-decode');
                    const decodedToken = jwtDecode(token);     
                    const sec = 1000; // 1초
                    const isTokenExpired = decodedToken.exp * sec < Date.now();
                    isTokenExpired === true ? handleTokenExpired() : setTokenExpired(false);
                } catch (error) {
                    console.error('Error decoding token:', error);
                    handleTokenExpired();
                }
            }            
        }, 30000);
        
        return () => clearInterval(tokenCheck);
    }, []);
    return { tokenExpired };
}

