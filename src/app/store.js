import counterReducer from '../features/Counter/counterSlice';
import userReducer from '../features/Auth/userSlice';
const { configureStore } = require("@reduxjs/toolkit");

// bao gom tat ca reducer project dang co
const rootReducer = {
    counter: counterReducer,
    user: userReducer,
}

const store = configureStore({
    reducer: rootReducer,
});

export default store;