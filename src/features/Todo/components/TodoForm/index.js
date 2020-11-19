import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from "yup";
import InputField from '../../../../components/form-controls/InputField';

const TodoForm = props => {
    // Put schema at hear to use multi languages  
    const schema = yup.object().shape({
        title: yup.string().required('Please Enter Title')
                .min(5, "Title is too short"), 
        // age: yup.number().positive().integer().required(),
      });

    const form = useForm({
        defaultValues: {
            title: '',
        },
        resolver: yupResolver(schema)
    })

    const handleSubmit = (values) => {
        const {onSubmit} = props;
        if (onSubmit) {
            onSubmit(values);
        }
        form.reset();
    }

    return (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
            <InputField name='title' label="Todo" form={form}/> 
        </form>
    )
}

TodoForm.propTypes = {
    onSubmit: PropTypes.func,
}

export default TodoForm
