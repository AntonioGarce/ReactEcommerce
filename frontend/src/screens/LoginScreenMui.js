// import mui 
import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';

// import react hook for validation 
import { useEffect } from 'react';
import { useForm } from "react-hook-form";
import { FormGroup } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';

// import helper function
import { history } from '../_helpers'

// import action
import { login } from '../slices';

// import custom components
import LoadingWrapper from '../components/LoadingWrapper';
import AlertMessage from '../components/AlertMessage';

const defaultTheme = createTheme();

export default function LoginScreenMui() {

  const dispatch = useDispatch();

  const authUser = useSelector(x => x.auth.user);
  const authError = useSelector(x => x.auth.error);

  // form validation schema 
  const validationSchema = Yup.object().shape({
      email: Yup.string()
        .email('This is not an email format.')
        .required('email is requried')
        .max(30, 'Email address cannot exceed 30 letters'),
      password: Yup.string()
        .required('Password is required')
        .max(30,'Password cannot exceed 30 letters.')
  });
  const formOptions = { mode: "onTouched", resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook

  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors, isSubmitting } = formState;

  const { refEmail, ...restEmail } = register('email')
  const { refPassword, ...restPassword } = register('password')

  const  onSubmit = ({ email, password }) => {
    return dispatch(login( { email, password } ));
  }

  useEffect(() => {
    if (authUser) history.navigate('/');
  }, [authUser]);


  return (
    <LoadingWrapper loading = {false} error = {authError}>
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
              Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
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
                <AlertMessage>{errors.email?.message}</AlertMessage>
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
                <AlertMessage severity='error'>{errors.password?.message}</AlertMessage>
              </FormGroup>
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </LoadingWrapper>
  );
}