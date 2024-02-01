import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loginForm: {
    id: string;
    password: string;
  };
  tokenExpired: boolean; 
  darkMode: boolean;
}

const initialState: AuthState = {
  loginForm: {
    id: '',
    password: ''
  },
  tokenExpired: false,
  darkMode: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setLoginForm: (state, action: PayloadAction<Partial<AuthState['loginForm']>>) => {
      state.loginForm = { ...state.loginForm, ...action.payload };
    },
    setTokenExpired: (state, action: PayloadAction<boolean>) => {
      state.tokenExpired = action.payload;
      if (action.payload) { // 토큰 만료 시, 모든 상태 변수 초기화
        state.loginForm = initialState.loginForm;
        state.darkMode = initialState.darkMode;
      }
    },
    setDarkMode: (state, action: PayloadAction<boolean>) => {
      state.darkMode = action.payload;
    },
    logout: (state) => { // 로그아웃 시, 모든 상태 변수 초기화
      state.loginForm = initialState.loginForm;
      state.darkMode = initialState.darkMode;
    },
  },
});

export const { setLoginForm, setTokenExpired, setDarkMode, logout } = authSlice.actions;
export default authSlice.reducer;
