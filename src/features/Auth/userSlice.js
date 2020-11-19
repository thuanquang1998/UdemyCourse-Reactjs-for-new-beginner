import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';
const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");


// First, create the thunk
export const register = createAsyncThunk(
    'user/register',
    async (payload, thunkAPI) => {
      //call API to register
        const data = await userApi.register(payload);
      //save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

      //return user data
      return data.user;
    }
  )

  export const login = createAsyncThunk(
    'user/login',
    async (payload, thunkAPI) => {
      //call API to register
        const data = await userApi.login(payload);
      //save data to local storage
        localStorage.setItem(StorageKeys.TOKEN, data.jwt);
        localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

      //return user data
      return data.user;
    }
  )

const userSlice = createSlice({
    name: 'user',
    initialState: {
        current: JSON.parse(localStorage.getItem(StorageKeys.USER))||{},
        loading: {},
    },
    reducers: {},

    //when thunk success, update state in store
    extraReducers: {
        [register.fulfilled]: (state, action) => {
            state.current = action.payload; //action.payload === data.user
        },
        [login.fulfilled]: (state, action) => {
          state.current = action.payload; //action.payload === data.user
        }
    }
});

const {reducer} = userSlice;
export default reducer; //default exports