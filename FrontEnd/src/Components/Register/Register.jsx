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
import axios from '../../HTTP';
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../Context/Context';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://ceoitbox.com/">
        CEOITBOX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignUp() {
  const { isAdmin, token } = React.useContext(Context)
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let postData = {
      fullName: data.get("firstName") + " " + data.get("lastName"),
      email: data.get('email'),
      password: data.get('password'),
      permissions: { view: false, edit: false }
    }
    const { data: res } = await axios.post(`signup`, postData);
    if (res.error) return alert(res.error);
    alert("Registered Successful")
    navigate("/login")
    // axios.post("sendEmail", {
    //   email: postData.email,
    //   sub: "CEOITBOX",
    //   body: `<!DOCTYPE html>
    //   <html>
    //   <head>
    //       <title>Welcome to Our Website!</title>
    //       <style>
    //           body {
    //               font-family: Arial, sans-serif;
    //               margin: 0;
    //               padding: 0;
    //               background-color: #f4f4f4;
    //           }
    //           .container {
    //               max-width: 600px;
    //               margin: 0 auto;
    //               padding: 20px;
    //               background-color: #ffffff;
    //               border-radius: 5px;
    //               box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
    //           }
    //           h1 {
    //               color: #333333;
    //           }
    //           p {
    //               color: #666666;
    //               line-height: 1.6;
    //           }
    //           ul {
    //               list-style-type: none;
    //               padding-left: 0;
    //           }
    //           li {
    //               margin-bottom: 10px;
    //           }
    //           strong {
    //               color: #333333;
    //           }
    //           .footer {
    //               margin-top: 20px;
    //               text-align: center;
    //               color: #999999;
    //           }
    //       </style>
    //   </head>
    //   <body>
    //       <div class="container">
    //           <h1>Welcome to CEOITBOX!</h1>
    //           <p>Thank you for registering with us. Here are your account details:</p>
    //           <ul>
    //               <li><strong>User ID:</strong> ${postData.email}</li>
    //               <li><strong>Password:</strong> ${postData.password}</li>
    //           </ul>
    //           <p>Please keep your account information secure and do not share it with anyone.</p>
    //           <p>If you have any questions or need assistance, please don't hesitate to contact us.</p>
    //           <div class="footer">
    //               <p>Best regards,<br>Your CEOITBOX Team</p>
    //           </div>
    //       </div>
    //   </body>
    //   </html>
    //   `
    // })
  };

  if (token) return <Navigate to={`${isAdmin ? "/admin" : "/client"}/login`} />
  return (
    <ThemeProvider theme={defaultTheme}>
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
                <NavLink style={{ color: "#1976d2", fontSize: "13px" }} to="/login" variant="body2">
                  Already have an account? Login
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </ThemeProvider>
  );
}