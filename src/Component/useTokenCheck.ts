import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenExpired } from '../redux/features/authSlice';
import { RootState } from "../redux/store";

export default function useTokenCheck() {
    const dispatch = useDispatch();
    const tokenExpired = useSelector((state: RootState) => state.auth.tokenExpired);

    const handleTokenExpired = useCallback(() => {
        dispatch(setTokenExpired(true));
        localStorage.removeItem('token'); // 토큰 삭제
    }, [dispatch]);

    useEffect(() => {
        const tokenCheck = setInterval(() => {
            const token = localStorage.getItem('token');
            if (!token) {
                // 로컬 스토리지에서 토큰이 없는 경우
                handleTokenExpired();
                return; // 토큰 없으면 종료
            } else {
                try {
                    const jwtDecode = require('jwt-decode');
                    const decodedToken = jwtDecode(token);  
                    const isTokenExpired = decodedToken.exp < Date.now();
                    isTokenExpired === true ? handleTokenExpired() : dispatch(setTokenExpired(false));
                } catch (error) {
                    // console.error('Error decodedToken:', error);
                    handleTokenExpired();
                }
            }            
        }, 60000);
        
        return () => clearInterval(tokenCheck);
    }, [dispatch, handleTokenExpired]);

    return { tokenExpired };
}
