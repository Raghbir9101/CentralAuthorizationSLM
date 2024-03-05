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
import { Navigate, NavLink, useNavigate } from 'react-router-dom';
import { Context } from '../../Components/Context/Context';
import axios from '../../HTTP';
import req from 'axios';
import Cookies from 'js-cookie';
import { FormControl, FormLabel, Modal, Radio, RadioGroup } from '@mui/material';
import ForgotPassword from '../ForgotPassword/ForgotPassword';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" target="__blank" href="https://ceoitbox.com/">
        CEOITBOX
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'white',
  borderRadius: "20px",
  p: 4,
};
const defaultTheme = createTheme();

export default function Login() {
  const { token, setToken, isAdmin, setIsAdmin,
    setPermissions, setUserName, setUserID, ActivateToast, PostToLogs, setUserEmail } = React.useContext(Context)
  const navigate = useNavigate();
  const [loginAs, setLoginAs] = React.useState("User");
  const [open, setOpen] = React.useState(false);
  const [OTP, setOTP] = React.useState("");
  const [inputOTP, setInputOTP] = React.useState("");
  const formRef = React.useRef(null)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const postData = {
      email: data.get('email'),
      password: data.get('password'),
    }
    if (loginAs === "User") {
      const { data: res } = await axios.post(`signin`, postData);
      if (res.error) return ActivateToast(res.error, "error");
      sessionStorage.setItem('token', res.token)
      sessionStorage.setItem('loggedInAs', "user")
      setToken(res.token)
      setIsAdmin(false)
      setUserName(res.body.fullName)
      setPermissions(res.body.permissions)
      setUserID(res.body._id)
      // PostToLogs({
      //   activity: "Logged In as User",
      //   email: res.body.email,
      //   name: res.body.fullName
      // })
    }
    else {
      let { data: res } = await axios.get(`checkUserExists?email=${postData.email}`);
      if (res.isAdmin != true) return ActivateToast("Not Authorized", "error");
      else {
        let checkDate = new Date(res.OTPRequiredDate);
        let currentDate = new Date();
        checkDate.setDate(checkDate.getDate() + 7);
        if (currentDate < checkDate) {
          const { data: res } = await axios.post(`signin`, postData);
          if (res.error) return ActivateToast(res.error, "error");
          sessionStorage.setItem('token', res.token)
          sessionStorage.setItem('loggedInAs', "admin")
          setUserEmail(res.body.email)
          setToken(res.token)
          setIsAdmin(res.body.isAdmin || false)
          setUserName(res.body.fullName)
          setPermissions(res.body.permissions || {})
          setUserID(res.body._id);
          // PostToLogs({
          //   activity: "Logged In as Admin",
          //   email: res.body.email,
          //   name: res.body.fullName
          // })
          return
        }
      }
      const { data: check } = await axios.post(`signin`, postData);
      if (check.error) return ActivateToast(check.error, "error");
      let { data } = await req.post(`https://auth.ceoitbox.com/sendOtp`, { email: postData.email })
      setOpen(true)
    }
  };
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = React.useState(false)

  if (token) return <Navigate to={`/`} />
  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box display={"flex"} flexDirection={"column"} gap={"10px"}>
              <TextField label="OTP" type='number' value={inputOTP} onChange={({ target }) => {
                if (target.value.length > 6) return;
                setInputOTP(target.value)
              }} />
              <Button variant='contained' onClick={async () => {
                const data = new FormData(formRef.current);
                const postData = {
                  email: data.get('email'),
                  password: data.get('password'),
                }
                const { data: ress } = await req.get(`https://auth.ceoitbox.com/checkIsOTPCorrect?email=${postData.email}&OTP=${inputOTP}&loginAs=${"Admin"}`)
                if (!ress.status) return ActivateToast("Incorrect OTP", "error");
                const { data: res } = await axios.post(`signin`, postData);
                if (res.error) return alert(res.error);
                sessionStorage.setItem('token', res.token)
                sessionStorage.setItem('loggedInAs', "admin")
                setToken(res.token)
                setUserEmail(res.body.email)
                setIsAdmin(res.body.isAdmin || false)
                setUserName(res.body.fullName)
                setPermissions(res.body.permissions || {})
                setUserID(res.body._id);
                // PostToLogs({
                //   activity: "Logged In as Admin",
                //   email: res.body.email,
                //   name: res.body.fullName
                // })
                req.patch(`https://auth.ceoitbox.com/updateOtpRequiredDate?email=${postData.email}`)
              }}
              > Submit</Button>
            </Box>
          </Box>
        </Modal>
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
          <Box component="form" onSubmit={handleSubmit} ref={formRef} noValidate sx={{ mt: 1 }}>
            <FormControl sx={{ textAlign: "center" }}>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={loginAs}
                name="radio-buttons-group"
                onChange={({ target }) => setLoginAs(target.value)}
              >
                <FormControlLabel value="User" control={<Radio />} label="User" />
                <FormControlLabel value="Admin" control={<Radio />} label="Admin" />
              </RadioGroup>
            </FormControl>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
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
              <Grid item xs>
                <Link href="#" onClick={() => setForgotPasswordModalOpen(true)} variant="body2">
                  Forgot password?
                </Link>
                <ForgotPassword open={forgotPasswordModalOpen} setOpen={setForgotPasswordModalOpen} />
              </Grid>
              <Grid item>
                <NavLink style={{ color: "#1976d2", fontSize: "13px" }} to={`/register`} variant="body2">
                  {"Don't have an account? Register"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}