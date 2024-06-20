import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import GoogleIcon from '@mui/icons-material/Google';
import GitHubIcon from '@mui/icons-material/GitHub';
import AuthCard from '../authCard';
import authService from '../../../api/services/authService';

function RegisterForm() {
  const initialValues = { name: '', email: '', password: '' };
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Enter a valid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleFormSubmit = async (values) => {
    await authService.register(values);
  };

  return (
    <AuthCard>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleFormSubmit}>
        {(props) => (
          <form noValidate onSubmit={props.handleSubmit}>
            <TextField
              name="name"
              label="Name"
              placeholder="Enter your name"
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.name}
              fullWidth
              required
              autoFocus
              error={props.touched.name && Boolean(props.errors.name)}
              helperText={props.touched.name && props.errors.name}
            />
            <TextField
              name="email"
              label="Email"
              placeholder="Enter your email"
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.email}
              fullWidth
              required
              error={props.touched.email && Boolean(props.errors.email)}
              helperText={props.touched.email && props.errors.email}
            />
            <TextField
              name="password"
              label="Password"
              placeholder="Enter your password"
              type={showPassword ? 'text' : 'password'}
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.password}
              fullWidth
              required
              error={props.touched.password && Boolean(props.errors.password)}
              helperText={props.touched.password && props.errors.password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword} edge="end">
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <Button fullWidth type="submit" variant="contained" disableElevation>
              Sign up
            </Button>
            <Button fullWidth type="submit" variant="outlined" disableElevation>
              Already have account? Sign in
            </Button>
            <Divider>or</Divider>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Sign in with Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<GitHubIcon />}>
              Sign in with GitHub
            </Button>
          </form>
        )}
      </Formik>
    </AuthCard>
  );
}

export default RegisterForm;
