import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField} from '@material-ui/core'
import { Controller } from 'react-hook-form';
import { Visibility, VisibilityOff } from '@material-ui/icons';

function PasswordField(props) {
    const { form, name, label, disabled } = props;
    const { errors } = form;
    // const hasError = formState.touched[name] && errors[name];
    const hasError = !!errors[name];
    const [showPassword, setShowPassword] = useState(false);


    const toggleShowPassword = () => {
        setShowPassword(x=>!x);
    }

    return (
        <div>
            {/* <Controller
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
            /> */}

            <FormControl error={hasError}  fullWidth margin="normal" variant="outlined">
                <InputLabel htmlFor={name}>{label}</InputLabel>
                <Controller
                    name={name}
                    control = {form.control}
                    as={OutlinedInput}
                    id={name}
                    type={showPassword ? 'text' : 'password'}
                    label={label}
                    endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                        aria-label="toggle password visibility"
                        onClick={toggleShowPassword}
                        edge="end"
                        >
                        {showPassword ? <Visibility /> : <VisibilityOff/>}
                        </IconButton>
                    </InputAdornment>
                    }
                    disabled={disabled}
                />
                <FormHelperText >{errors[name]?.message}</FormHelperText>
            </FormControl>
        </div>
        
    )
}

PasswordField.propTypes = {
    form: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,

    label: PropTypes.string,
    disabled: PropTypes.bool,
}

export default PasswordField;

