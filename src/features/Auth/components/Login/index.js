import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../../userSlice';
import LoginForm from '../LoginForm';


const Login = props => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async (values) => {
        console.log("Form Submit", values);
        try {
            const action = login(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            //close Dialog
            const {closeDialog} = props;
            if(closeDialog) {closeDialog()}

            //do something here on register successfully
            console.log("New user", user);
        }catch (error) {
            console.log('Failed to login',error);
            enqueueSnackbar(error.message, {variant:'error'});
            // bỏ hàm reset form
        }
    }
    return (
        <div>
            <LoginForm onSubmit={handleSubmit}/>
        </div>
    )
}
Login.propTypes = {
    closeDialog: PropTypes.func
}

export default Login
