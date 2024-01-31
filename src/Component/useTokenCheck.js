import { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTokenExpired } from '../redux/features/authSlice';
import { jwtDecode } from "jwt-decode";

export default function useTokenCheck() {
    const dispatch = useDispatch();
    const tokenExpired = useSelector(state => state.auth.tokenExpired);

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
                    const decodedToken = jwtDecode(token); // token의 만료시간은 sec 단위  
                    let isTokenExpired = decodedToken.exp * 1000 < Date.now(); // Date객체는 ms 단위
                    // token과 Date 객체의 단위를 같게 하려면 1000(1sec)을 곱해야함.
                    isTokenExpired === true ? handleTokenExpired() : dispatch(setTokenExpired(false));
                } catch {
                    // console.error('Error decodedToken:', error);
                    handleTokenExpired();
                }
            }            
        }, 60000);
        
        return () => clearInterval(tokenCheck);
    }, [dispatch, handleTokenExpired]);

    return { tokenExpired };
}
