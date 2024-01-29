import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import userReducer from './features/userSlice';

export const store = configureStore({
  reducer: {
  	auth: authReducer,
    user: userReducer,
  },
})

// useSelector의 파라미터인 state의 type을 지정할때 사용한다.
// state는 위에서 정의한, store의 reducer들이다.
export type RootState = ReturnType<typeof store.getState>

// 나중에 사용할 useDispatch의 type을 지정할때 사용한다.
export type AppDispatch = typeof store.dispatch