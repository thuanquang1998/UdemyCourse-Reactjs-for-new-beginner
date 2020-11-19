import { yupResolver } from '@hookform/resolvers/yup';
import { Avatar, Button, LinearProgress, makeStyles, Typography } from '@material-ui/core';
import { LockOutlined } from '@material-ui/icons';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';
import PasswordField from '../../../../components/form-controls/PasswordField';

const useStyles = makeStyles (theme => ({
    root: {
        paddingTop: theme.spacing(4),
        position: 'relative'
    },
    avatar: {
        margin: '0 auto',
        backgroundColor: theme.palette.secondary.main, 
    },
    title: {
        textAlign: 'center',
        margin: theme.spacing(2,0,3,0) //top - right - bottom - left 
    },
    submit: {
        margin: theme.spacing(3, 0, 2, 0)
    },
    progress: {
        position: "absolute",
        top: theme.spacing(1),
        left: 0,
        right:0
    }
}))

const RegisterForm = props => {

    const classes = useStyles();
    // Put schema at hear to use multi languages  
    const schema = yup.object().shape({
        fullName: yup.string().required('Please Enter your Full Name')
                    .test('should has at least two words', 'Please enter at least two words.', value =>{
                        return value.split(" ").length >= 2
                    }),
        email: yup.string().required('Please Enter your Email').email('Please Enter a valid email address'),
        password: yup.string().required('Please Enter your Password').min(6, 'Please Enter at least 6 characters'),
        retypePassword: yup.string().required('Please Retype your Password')
                            .oneOf([yup.ref('password')], 'Password does not match'),
    });

    const form = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: '',
            retypePassword: ''
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = async (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            await onSubmit(values);
        }
        // form.reset();
    }

    const {isSubmitting} = form.formState;

    return (
        <div className={classes.root}>
            {isSubmitting && <LinearProgress className={classes.progress}/>}
            <Avatar className={classes.avatar}>
                <LockOutlined></LockOutlined>
            </Avatar>

            <Typography component="h3" variant="h5" className={classes.title}>
                Create An Acount
            </Typography>
            
            <form onSubmit={form.handleSubmit(handleSubmit)}>
                <InputField name='fullName' label="Full Name" form={form}/> 
                <InputField name='email' label="Email" form={form}/> 
                <PasswordField name='password' label="Password" form={form}/> 
                <PasswordField name='retypePassword' label="Retype Password" form={form}/> 
                <Button disabled={isSubmitting} type="submit" className={classes.submit} variant="contained" color="primary" fullWidth>Create An Acount</Button>
            </form>
        </div>
    )
}

RegisterForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default RegisterForm
