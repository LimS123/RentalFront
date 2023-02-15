import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { host, registration } from '../../../http-routes';
import { FC, useState } from 'react';

function Copyright(props: any) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Realt.by © '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

interface ISignUp {
  email: string,
  password: string,
  firstName: string,
  lastName: string,
  phoneNumber: string
}

const SignUp: FC = () => {

  const navigate = useNavigate();

  const [signUp, setSignUp] = useState<ISignUp>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: ""
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch(registration(host), {
      method: "POST",
      headers: {
          'Content-type' : 'application/json',
          Accept : 'application/json'
      },
      body: JSON.stringify(signUp)
    })
    .then(response => {
      if(response.status == 200){
        navigate('/signin');
      }
    })
        
  };

  const handleFirstName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, firstName: event.target.value}))
  }

  const handleLastName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, lastName: event.target.value}))
  }

  const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, email: event.target.value}))
  }

  const handlePhoneNumber = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, phoneNumber: event.target.value}))
  }

  const handlePassword= (event: React.ChangeEvent<HTMLInputElement>) => {
    setSignUp(prev => ({...prev, password: event.target.value}))
  }

  return (
    <ThemeProvider theme={theme}>
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
            Sign up
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  placeholder='Name'
                  value={signUp?.firstName}
                  onChange={handleFirstName}
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  placeholder='Name'
                  value={signUp?.lastName}
                  onChange={handleLastName}
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder='xxxxxxx@gmail.com'
                  value={signUp?.email}
                  onChange={handleEmail}
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  placeholder='+375 (XX) XXX-XX-XX'
                  value={signUp?.phoneNumber}
                  onChange={handlePhoneNumber}
                  id="email"
                  label="Phone number"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={signUp?.password}
                  onChange={handlePassword}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link to="/signin">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}

export default SignUp
