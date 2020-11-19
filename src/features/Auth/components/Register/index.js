import { unwrapResult } from '@reduxjs/toolkit';
import { useSnackbar } from 'notistack';
import React from 'react';
import { useDispatch } from 'react-redux';
import { register } from '../../userSlice';
import RegisterForm from '../RegisterForm';
import PropTypes from 'prop-types';


const Register = props => {
    const dispatch = useDispatch();
    const {enqueueSnackbar} = useSnackbar();
    const handleSubmit = async (values) => {
        console.log("Form Submit", values);
        try {
            //auto set username= email
            values.username = values.email;
             
            const action = register(values);
            const resultAction = await dispatch(action);
            const user = unwrapResult(resultAction);

            //close Dialog
            const {closeDialog} = props;
            if(closeDialog) {closeDialog()}

            //do something here on register successfully
            console.log("New user", user);
            enqueueSnackbar('Register Successfully!!!', {variant:'success'})
        }catch (error) {
            console.log('Failed to register',error);
            enqueueSnackbar(error.message, {variant:'error'});
            // bỏ hàm reset form
        }
    }
    return (
        <div>
            <RegisterForm onSubmit={handleSubmit}/>
        </div>
    )
}
Register.propTypes = {
    closeDialog: PropTypes.func
}

export default Register
