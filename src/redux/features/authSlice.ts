import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  loginForm: {
    id: string;
    password: string;
  };
  tokenExpired: boolean; // 새로운 상태 변수 추가
}

const initialState: AuthState = {
  loginForm: {
    id: '',
    password: ''
  },
  tokenExpired: false // 초기값 설정
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
    },
  },
});

export const { setLoginForm, setTokenExpired } = authSlice.actions;
export default authSlice.reducer;
