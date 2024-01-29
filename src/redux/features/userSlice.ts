import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
    id: string;
    password: string;
    password_confirm: string;
    username: string;
    phone: string;
}

const initialState: UserState = {
    id: '',
    password: '',
    password_confirm: '',
    username: '',
    phone: ''
}
/* PartialUserState 타입
{
  id?: string | undefined;
  password?: string | undefined;
  password_confirm?: string | undefined;
  username?: string | undefined;
  phone?: string | undefined;
} */
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setForm: (state, action: PayloadAction<Partial<UserState>>) => {
            return { ...state, ...action.payload };
        }
    }
});

export const { setForm } = userSlice.actions;
export default userSlice.reducer;