import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BrowserRouter as Router, Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authenticate,getCurrentUser, host } from '../../../http-routes';

interface ISignIn {
    email: string,
    password: string
}

const SignIn: React.FC = () => {

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
    const navigate = useNavigate();

    const [signIn, setSignIn] = useState<ISignIn>({
        email: "",
        password: ""
      })
    
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        fetch(authenticate(host), {
        method: "POST",
        headers: {
            'Content-type' : 'application/json',
            Accept : 'application/json'
        },
        body: JSON.stringify(signIn)
        })
        .then(response => response.json())
        .then(items => {
            localStorage.setItem('token', items.accessToken);
            navigate('/');
        })
    };

    const handleEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn(prev => ({...prev, email: event.target.value}))
    }
    
    const handlePassword= (event: React.ChangeEvent<HTMLInputElement>) => {
        setSignIn(prev => ({...prev, password: event.target.value}))
    }

    return(
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
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Sign in
                    </Typography>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        value={signIn.email}
                        onChange={handleEmail}
                        autoComplete="email"
                        autoFocus
                        />
                        <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        value={signIn.password}
                        onChange={handlePassword}
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        />
                        <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        >
                        Sign In
                        </Button>
                        <Grid container>
                        <Grid item>
                            <Link to="/signup">"Don't have an account? Sign Up"</Link>
                        </Grid>
                        </Grid>
                    </Box>
                </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
            </Container>
        </ThemeProvider>
    )
}

export default SignIn