// import mui 
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import react hook for validation 
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { FormGroup } from '@mui/material';

// import helper function
import { history } from '../_helpers'

// import actions
import { registerUser } from '../slices';

// import components
import LoadingWrapper from '../components/LoadingWrapper';
import AlertMessage from '../components/AlertMessage';

const defaultTheme = createTheme();

export default function RegisterScreenMui() {

  const dispatch = useDispatch();
  const { loading, user, error } = useSelector(state=>state.register)

  // form validation schema 
  const validationSchema = Yup.object().shape({
      name: Yup.string()
        .required('User name is required.')
        .max(30, 'User name cannot exceed 30 letters'),
      email: Yup.string()
        .email('This is not an email format.').required('email is requried'),
      password: Yup.string()
        .required('Password is required')
        .min(5,'Password should be at least 5 letters.')
        .max(30, 'Password cannot be longer than 30 letters'),
      cpassword: Yup.string()
        .required('Confirm password is required')
        .max(30, 'Password cannot be longer than 30 letters')
        .oneOf([Yup.ref("password")], "Passwords do not match"),
  });
  const formOptions = { mode: "onTouched", resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const { refName, ...restName } = register('name')
  const { refEmail, ...restEmail } = register('email')
  const { refPassword, ...restPassword } = register('password')
  const { refConfirmPassword, ...restConfirmPassword } = register('cpassword')

  const  onSubmit = ({ name, email, password }) => {
    return dispatch(registerUser( { username:name, email, password } ));
  }

  useEffect(() => {

    if (user) history.navigate('/');

  }, [user]);


  return (
    <LoadingWrapper loading={loading} error = {error}>
      <ThemeProvider theme={defaultTheme} >
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
            >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign Up
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1, width:500 }}>
                <FormGroup>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="username"
                      label="User name"
                      name="text"
                      autoComplete="text"
                      autoFocus
                      {...restName}
                      inputRef={ refName }

                  />
                  <AlertMessage>{errors.name?.message}</AlertMessage>
                </FormGroup>
                <FormGroup>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      autoFocus
                      {...restEmail}
                      inputRef={ refEmail }

                  />
                  <AlertMessage severity='error'>{errors.email?.message}</AlertMessage>
                </FormGroup>
                <FormGroup>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      { ...restPassword }
                      inputRef={refPassword}
                  />
                  <AlertMessage>{errors.password?.message}</AlertMessage>
                </FormGroup>
                <FormGroup>
                  <TextField
                      margin="normal"
                      required
                      fullWidth
                      name="cpassword"
                      label="Password"
                      type="password"
                      id="cpassword"
                      autoComplete="current-password"
                      {...restConfirmPassword}
                      inputRef={refConfirmPassword}
                  />
                  <AlertMessage severity='error'>{errors.cpassword?.message}</AlertMessage>
                </FormGroup>
                
                <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Link href="/login" variant="body2" sx={{position: 'relative', left: '30%'}}>
                    {"Do you have an account? Sign In"}
                </Link>
            </Box>
            </Box>
        </Container>
      </ThemeProvider>
    </LoadingWrapper>
  );
}