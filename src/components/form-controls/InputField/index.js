import React from 'react'
import PropTypes from 'prop-types'
import {TextField} from '@material-ui/core'
import { Controller } from 'react-hook-form';

function InputField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    const hasError = errors[name];

    return (
        <Controller
            name={name}
            control = {form.control}
            as={TextField}

            margin="normal"
            variant="outlined"
            fullWidth
            label={label}
            disabled={disabled}

            error={!!hasError} //chuyen ve true false
            helperText={errors[name]?.message} // don't know errors message co ton tai hay k
        />
    )
}

InputField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
}

export default InputField;

