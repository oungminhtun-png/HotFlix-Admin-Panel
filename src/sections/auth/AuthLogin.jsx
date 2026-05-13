import PropTypes from 'prop-types';
import React from 'react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';

// material-ui
import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';

// third-party
import * as Yup from 'yup';
import { Formik } from 'formik';
import axios from 'axios';

// project imports
import IconButton from 'components/@extended/IconButton';
import AnimateButton from 'components/@extended/AnimateButton';
import { ENDPOINTS } from '../../endpoints/endpoints'; 

// assets
import EyeOutlined from '@ant-design/icons/EyeOutlined';
import EyeInvisibleOutlined from '@ant-design/icons/EyeInvisibleOutlined';

export default function AuthLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <Formik
        initialValues={{
          email: '', 
          password: '',
          submit: null
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string().max(255).required('Email or Username is required'),
          password: Yup.string().required('Password is required').max(10)
        })}
        onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
          try {
            const response = await axios.post(ENDPOINTS.LOGIN, {
              username: values.email, 
              password: values.password
            });

            // tokens ရှိမရှိ အရင်စစ်ပါမယ်
            if (response.data && response.data.tokens) {
              
              /**
               * အရေးကြီးဆုံးပြင်ဆင်ချက်- 
               * 'access_token' အစား 'serviceToken' ဆိုတဲ့ နာမည်နဲ့ သိမ်းရပါမယ်။
               * ဒါမှ AuthGuard က Login ဝင်ထားတယ်လို့ အသိအမှတ်ပြုမှာပါ။
               */
              localStorage.setItem('serviceToken', response.data.tokens.access);
              localStorage.setItem('refresh_token', response.data.tokens.refresh);
              localStorage.setItem('user_info', JSON.stringify(response.data.user));

              setStatus({ success: true });
              setSubmitting(false);
              
              // Login အောင်မြင်ရင် Dashboard ကို ပို့ပါမယ်
              navigate('/dashboard/default', { replace: true });
            }
          } catch (err) {
            console.error(err);
            setStatus({ success: false });
            // Error message ပြတဲ့အခါ API ကလာတဲ့ စာသားကို သေချာဖမ်းပြပါမယ်
            setErrors({ submit: err.response?.data?.detail || err.response?.data?.message || 'Login failed. Please check your credentials.' });
            setSubmitting(false);
          }
        }}
      >
        {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
          <form noValidate onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              {/* Error Alert */}
              {errors.submit && (
                <Grid item xs={12}>
                  <Alert severity="error">{errors.submit}</Alert>
                </Grid>
              )}
              
              {/* Email/Username Section */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="email-login">Email Address / Username</InputLabel>
                  <OutlinedInput
                    id="email-login"
                    type="text"
                    value={values.email}
                    name="email"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    placeholder="Enter email or username"
                    fullWidth
                    error={Boolean(touched.email && errors.email)}
                  />
                  {touched.email && errors.email && (
                    <FormHelperText error id="helper-text-email-login">
                      {errors.email}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* Password Section */}
              <Grid item xs={12}>
                <Stack spacing={1}>
                  <InputLabel htmlFor="password-login">Password</InputLabel>
                  <OutlinedInput
                    id="password-login"
                    fullWidth
                    error={Boolean(touched.password && errors.password)}
                    type={showPassword ? 'text' : 'password'}
                    value={values.password}
                    name="password"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                          color="secondary"
                        >
                          {showPassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
                        </IconButton>
                      </InputAdornment>
                    }
                    placeholder="Enter password"
                  />
                  {touched.password && errors.password && (
                    <FormHelperText error id="helper-text-password-login">
                      {errors.password}
                    </FormHelperText>
                  )}
                </Stack>
              </Grid>

              {/* Login Button */}
              <Grid item xs={12}>
                <AnimateButton>
                  <Button
                    disableElevation
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    {isSubmitting ? 'Logging in...' : 'Login'}
                  </Button>
                </AnimateButton>
              </Grid>
            </Grid>
          </form>
        )}
      </Formik>
    </>
  );
}